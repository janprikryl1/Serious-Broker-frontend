import {FilterOperator, FilterCondition, GenericTableQuery} from "../types/admin/filters";

const splitTopLevel = (expr: string, op: "AND" | "OR"): string[] => {
    const parts: string[] = [];
    let depth = 0;
    let tokenStart = 0;
    const len = expr.length;
    const opLower = op.toLowerCase();

    for (let i = 0; i < len; i++) {
        const ch = expr[i];
        if (ch === "(") depth++;
        else if (ch === ")") depth--;

        if (
            depth === 0 &&
            i + op.length + 1 < len &&
            /\s/.test(expr[i]) &&
            expr.substr(i + 1, op.length).toLowerCase() === opLower &&
            /\s/.test(expr[i + op.length + 1])
        ) {
            parts.push(expr.substring(tokenStart, i).trim());
            i += op.length;
            tokenStart = i + 1;
        }
    }
    const tail = expr.substring(tokenStart).trim();
    if (tail) parts.push(tail);
    return parts;
};
export const parseSQLToTableQuery = (sqlQuery: string): { tableName: string; query: GenericTableQuery } | null => {
    try {
        const cleanQuery = sqlQuery.trim().replace(/;$/, "");
        const result: GenericTableQuery = {};

        if (!/^SELECT\s/i.test(cleanQuery))
            throw new Error("Query must be a SELECT statement");

        /* --- FROM ------------------------------------------------------------------ */
        const fromMatch = cleanQuery.match(/FROM\s+`([^`]+)`/i);
        if (!fromMatch) throw new Error("Cannot find table name in FROM clause");
        const tableName = fromMatch[1];

        /* --- SELECT columns --------------------------------------------------------- */
        const selectMatch = cleanQuery.match(/SELECT\s+(.+?)\s+FROM/i);
        if (selectMatch) {
            const colsStr = selectMatch[1].trim();
            if (colsStr !== "*") {
                result.columns = colsStr
                    .split(",")
                    .map((c) => c.trim())
                    .map((c) => (c.startsWith("`") ? c.slice(1, -1) : c));
            }
        }

        /* --- WHERE ------------------------------------------------------------------ */
        const whereMatch = cleanQuery.match(
            /WHERE\s+(.+?)(?:\s+ORDER\s+BY|\s+LIMIT|$)/is
        );
        if (whereMatch) {
            const whereClause = whereMatch[1].trim();

            // 1) detekce globálního operátoru (na top-level)
            let depth = 0, orCnt = 0, andCnt = 0;
            for (let i = 0; i < whereClause.length; i++) {
                const rest = whereClause.substring(i);
                if (whereClause[i] === "(") depth++;
                else if (whereClause[i] === ")") depth--;
                else if (depth === 0) {
                    const or = /^\s+OR\s+/i.exec(rest);
                    const and = /^\s+AND\s+/i.exec(rest);
                    if (or) { orCnt++; i += or[0].length - 1; }
                    else if (and) { andCnt++; i += and[0].length - 1; }
                }
            }
            const globalOp: "AND" | "OR" = orCnt > 0 ? "OR" : "AND";
            result.globalConditionOperator = globalOp;

            // 2) rozdělení na hlavní bloky
            const groups = splitTopLevel(whereClause, globalOp);
            const conditions: FilterCondition[] = [];

            groups.forEach((g) => {
                const group = g.trim();
                if (group.startsWith("(") && group.endsWith(")")) {
                    splitTopLevel(group.slice(1, -1).trim(), "AND").forEach((c) => {
                        const cond = parseCondition(c.trim());
                        if (cond) conditions.push(cond);
                    });
                } else {
                    const cond = parseCondition(group);
                    if (cond) conditions.push(cond);
                }
            });

            if (conditions.length) result.conditions = conditions;
        }

        /* --- ORDER BY ---------------------------------------------------------------- */
        const ob = cleanQuery.match(
            /ORDER BY\s+`([^`]+)`\s+(ASC|DESC)(?:\s|$)/i
        );
        if (ob) {
            result.orderBy = {
                field: ob[1],
                direction: ob[2].toUpperCase() as "ASC" | "DESC"
            };
        }

        /* --- LIMIT / OFFSET ---------------------------------------------------------- */
        const lm = cleanQuery.match(/LIMIT\s+(\d+)(?:\s+OFFSET\s+(\d+))?/i);
        if (lm) {
            result.limit = parseInt(lm[1], 10);
            if (lm[2]) result.offset = parseInt(lm[2], 10);
        }

        return { tableName, query: result };
    } catch (err) {
        console.error("Error parsing SQL:", err);
        return null;
    }
};

const parseCondition = (str: string): FilterCondition | null => {
    str = str.trim();

    /* IS NULL / NOT NULL */
    const nullMatch = str.match(/^`([^`]+)`\s+(IS NULL|IS NOT NULL)$/i);
    if (nullMatch) {
        return { field: nullMatch[1], operator: nullMatch[2].toUpperCase() as FilterOperator };
    }

    /* IS TRUE / IS FALSE */
    const boolMatch = str.match(/^`([^`]+)`\s+(IS TRUE|IS FALSE)$/i);
    if (boolMatch) {
        return { field: boolMatch[1], operator: boolMatch[2].toUpperCase() as FilterOperator };
    }

    /* IN / NOT IN */
    const inOrNot = str.match(/^`([^`]+)`\s+(NOT\s+)?IN\s*\(([^)]+)\)/i);
    if (inOrNot) {
        const field = inOrNot[1];
        const operator: FilterOperator = inOrNot[2] ? "NOT IN" : "IN";
        const list = inOrNot[3];

        // tokenizace obsahu závorky (ignoruje čárky v uvozovkách)
        const values: (string | number | boolean | null)[] = [];
        let token = "", inQuote = false, quoteChar = "";
        for (let i = 0; i < list.length; i++) {
            const ch = list[i];
            if ((ch === "'" || ch === '"') && (i === 0 || list[i - 1] !== "\\")) {
                if (!inQuote) { inQuote = true; quoteChar = ch; }
                else if (ch === quoteChar) { inQuote = false; }
                else { token += ch; }
            } else if (ch === "," && !inQuote) {
                if (token.trim()) values.push(parseValue(token.trim()));
                token = "";
            } else token += ch;
        }
        if (token.trim()) values.push(parseValue(token.trim()));

        const processed = values
            .map(v =>
                v === null ? "NULL" :
                    typeof v === "boolean" ? (v ? "1" : "0") :
                        String(v)
            )
            .join(",");

        return { field, operator, value: processed };
    }

    /* binární operátory (=, !=, >=, LIKE, NOT LIKE …) */
    const opMatch = str.match(
        /^`([^`]+)`\s+(<>|!=|>=|<=|=|>|<|LIKE\b|NOT\s+LIKE\b)\s+(.+)/i
    );
    if (opMatch) {
        let op = opMatch[2].toUpperCase();
        if (op === "<>") op = "!=";
        if (/NOT\s+LIKE/i.test(op)) op = "NOT LIKE";
        return {
            field: opMatch[1],
            operator: op as FilterOperator,
            value: parseValue(opMatch[3].trim())
        };
    }

    console.warn("Neznámý formát podmínky:", str);
    return null;
};

const parseValue = (
    v: string
): string | number | boolean | null => {
    v = v.trim();
    if (v.toUpperCase() === "NULL") return null;
    if (/^-?\d+(\.\d+)?$/.test(v)) return parseFloat(v);
    if (v === "0") return false;
    if (v === "1") return true;
    if (/^TRUE$/i.test(v)) return true;
    if (/^FALSE$/i.test(v)) return false;

    // odstraň uvozovky a ošetři escapované apostrofy
    if ((v.startsWith("'") && v.endsWith("'")) || (v.startsWith('"') && v.endsWith('"'))) {
        const unq = v.slice(1, -1);
        if (v.startsWith("'")) return unq.replace(/''/g, "'");
        return unq.replace(/""/g, '"');
    }
    return v;
};
