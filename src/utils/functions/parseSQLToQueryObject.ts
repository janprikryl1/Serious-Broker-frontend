import {FilterOperator, FilterCondition, GenericTableQuery} from "../types/admin/filters";

export const parseSQLToTableQuery = (sqlQuery: string): { tableName: string; query: GenericTableQuery; } | null => {
    try {
        // Clean up the query
        const cleanQuery = sqlQuery.trim().replace(/;$/, '');

        // Initialize the result object
        const result: GenericTableQuery = {};

        // Basic validation that this is a SELECT query
        if (!cleanQuery.toUpperCase().startsWith('SELECT ')) {
            throw new Error('Query must be a SELECT statement');
        }

        // Extract table name
        const fromMatch = cleanQuery.match(/FROM\s+`([^`]+)`/i);
        if (!fromMatch) {
            throw new Error('Cannot find table name in FROM clause');
        }
        const tableName = fromMatch[1];

        // Parse columns
        const selectMatch = cleanQuery.match(/SELECT\s+(.+?)\s+FROM/i);
        if (selectMatch) {
            const columnsStr = selectMatch[1].trim();
            if (columnsStr !== '*') {
                const columns = columnsStr.split(',')
                    .map(col => col.trim())
                    .map(col => {
                        // Extract field name from backticks
                        const match = col.match(/`([^`]+)`/);
                        return match ? match[1] : col;
                    });
                result.columns = columns;
            }
        }

        // Parse WHERE clause
        const whereRegex = /WHERE\s+(.+?)(?:\s+ORDER BY|\s+LIMIT|$)/is;
        const whereMatch = cleanQuery.match(whereRegex);

        if (whereMatch) {
            let whereClause = whereMatch[1].trim();

            // Detect global operator by counting outside parentheses
            let orCount = 0;
            let andCount = 0;
            let depth = 0;
            let pos = 0;

            while (pos < whereClause.length) {
                const substring = whereClause.substring(pos);
                if (whereClause[pos] === '(') {
                    depth++;
                } else if (whereClause[pos] === ')') {
                    depth--;
                } else if (depth === 0) {
                    // Check for OR outside parentheses
                    const orMatch = /^\s+OR\s+/.exec(substring);
                    if (orMatch) {
                        orCount++;
                        pos += orMatch[0].length - 1;
                    }

                    // Check for AND outside parentheses
                    const andMatch = /^\s+AND\s+/.exec(substring);
                    if (andMatch) {
                        andCount++;
                        pos += andMatch[0].length - 1;
                    }
                }
                pos++;
            }

            const globalOperator = orCount > 0 ? 'OR' : 'AND';
            result.globalConditionOperator = globalOperator as "AND" | "OR";

            const conditions: FilterCondition[] = [];

            // Split by the global operator to get main condition groups
            const mainSplitRegex = globalOperator === 'OR'
                ? /\s+OR\s+(?![^(]*\))/g  // Split by OR not inside parentheses
                : /\s+AND\s+(?![^(]*\))/g; // Split by AND not inside parentheses

            const mainGroups = whereClause.split(mainSplitRegex);

            // Process each main group
            mainGroups.forEach(group => {
                group = group.trim();

                // If group is surrounded by parentheses, remove them and process the inside
                if (group.startsWith('(') && group.endsWith(')')) {
                    const innerContent = group.substring(1, group.length - 1).trim();

                    // Split by AND for inner conditions
                    const innerConditions = innerContent.split(/\s+AND\s+/g);
                    innerConditions.forEach(innerCondition => {
                        const condition = parseCondition(innerCondition.trim());
                        if (condition) conditions.push(condition);
                    });
                } else {
                    // Direct condition without parentheses
                    const condition = parseCondition(group);
                    if (condition) conditions.push(condition);
                }
            });

            if (conditions.length > 0) {
                result.conditions = conditions;
            }
        }

        // Parse ORDER BY clause
        const orderByMatch = cleanQuery.match(/ORDER BY\s+`([^`]+)`\s+(ASC|DESC)(?:\s+LIMIT|$)/i);
        if (orderByMatch) {
            result.orderBy = {
                field: orderByMatch[1],
                direction: orderByMatch[2].toUpperCase() as 'ASC' | 'DESC'
            };
        }

        // Parse LIMIT and OFFSET
        const limitMatch = cleanQuery.match(/LIMIT\s+(\d+)(?:\s+OFFSET\s+(\d+))?/i);
        if (limitMatch) {
            result.limit = parseInt(limitMatch[1]);
            if (limitMatch[2]) {
                result.offset = parseInt(limitMatch[2]);
            }
        }

        return { tableName, query: result };
    } catch (error) {
        console.error('Error parsing SQL query:', error);
        return null;
    }
};

/**
 * Parse a single condition string into a FilterCondition object
 * @param conditionStr The condition string to parse
 * @returns A FilterCondition object or null if parsing fails
 */
const parseCondition = (conditionStr: string): FilterCondition | null => {
    try {
        conditionStr = conditionStr.trim();

        // Handle IS NULL and IS NOT NULL
        const nullMatch = conditionStr.match(/`([^`]+)`\s+(IS NULL|IS NOT NULL)/i);
        if (nullMatch) {
            return {
                field: nullMatch[1],
                operator: nullMatch[2].toUpperCase() as FilterOperator
            };
        }

        // Handle IS TRUE and IS FALSE
        const boolMatch = conditionStr.match(/`([^`]+)`\s+(IS TRUE|IS FALSE)/i);
        if (boolMatch) {
            return {
                field: boolMatch[1],
                operator: boolMatch[2].toUpperCase() as FilterOperator
            };
        }

        // Handle IN operator with proper value extraction
        const inRegex = /`([^`]+)`\s+IN\s+\(([^)]+)\)/i;
        const inMatch = conditionStr.match(inRegex);
        if (inMatch) {
            const field = inMatch[1];
            const valueStr = inMatch[2].trim();

            // Parse values inside the IN clause
            // We need to properly handle quoted values with commas
            const values: (string | number | boolean | null)[] = [];
            let currentValue = '';
            let inQuote = false;
            let quoteChar = '';

            for (let i = 0; i < valueStr.length; i++) {
                const char = valueStr[i];

                if ((char === "'" || char === '"') && (i === 0 || valueStr[i-1] !== '\\')) {
                    if (!inQuote) {
                        inQuote = true;
                        quoteChar = char;
                    } else if (char === quoteChar) {
                        inQuote = false;
                    } else {
                        currentValue += char;
                    }
                } else if (char === ',' && !inQuote) {
                    // End of value
                    values.push(parseValue(currentValue.trim()));
                    currentValue = '';
                } else {
                    currentValue += char;
                }
            }

            // Add the last value
            if (currentValue.trim()) {
                values.push(parseValue(currentValue.trim()));
            }

            // Convert values to string representation for storage
            const processedValues = values
                .map(v => {
                    if (v === null) return 'NULL';
                    if (typeof v === 'string') return `'${v}'`;
                    return String(v);
                })
                .join(',');

            return {
                field,
                operator: 'IN',
                value: processedValues
            };
        }

        // Handle all other operators, ensuring we don't capture trailing parentheses
        const operatorPattern = /`([^`]+)`\s+(=|!=|>|<|>=|<=|LIKE|NOT LIKE)\s+(.+)/i;
        const opMatch = conditionStr.match(operatorPattern);

        if (opMatch) {
            const field = opMatch[1];
            const operator = opMatch[2].toUpperCase() as FilterOperator;
            let valueStr = opMatch[3].trim();

            return {
                field,
                operator,
                value: parseValue(valueStr)
            };
        }

        return null;
    } catch (error) {
        console.error('Error parsing condition:', conditionStr, error);
        return null;
    }
};

/**
 * Parse a single condition string into a FilterCondition object
 * @param conditionStr The condition string to parse
 * @returns A FilterCondition object or null if parsing fails
 */
const parseValue = (valueStr: string): string | number | boolean | null => {
    valueStr = valueStr.trim();

    // Remove trailing parentheses if present
    if (valueStr.endsWith(')')) {
        valueStr = valueStr.replace(/\)+$/, '');
    }

    // Handle NULL
    if (valueStr === 'NULL') {
        return null;
    }

    // Handle numbers
    if (/^-?\d+(\.\d+)?$/.test(valueStr)) {
        return parseFloat(valueStr);
    }

    // Handle boolean (0 and 1)
    if (valueStr === '0') return false;
    if (valueStr === '1') return true;

    // Handle quoted strings
    if ((valueStr.startsWith("'") && valueStr.endsWith("'")) ||
        (valueStr.startsWith('"') && valueStr.endsWith('"'))) {
        // Remove quotes and unescape single quotes
        return valueStr.substring(1, valueStr.length - 1).replace(/''/g, "'");
    }

    return valueStr;
};