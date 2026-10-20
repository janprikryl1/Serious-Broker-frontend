import type {
  FilterCondition,
  FilterOperator,
  GenericTableQuery,
} from "@/utils/types/genericTable.ts"

const splitTopLevel = (expr: string, op: "AND" | "OR"): string[] => {
  const parts: string[] = []
  let depth = 0
  let tokenStart = 0
  const len = expr.length
  const opLower = op.toLowerCase()

  for (let i = 0; i < len; i++) {
    const ch = expr[i]
    if (ch === "(") depth++
    else if (ch === ")") depth--

    if (
      depth === 0 &&
      i + op.length + 1 < len &&
      /\s/.test(expr[i]) &&
      expr.substring(i + 1, i + 1 + op.length).toLowerCase() === opLower &&
      /\s/.test(expr[i + op.length + 1])
    ) {
      parts.push(expr.substring(tokenStart, i).trim())
      i += op.length
      tokenStart = i + 1
    }
  }
  const tail = expr.substring(tokenStart).trim()
  if (tail) parts.push(tail)
  return parts
}

const parseValue = (v: string): string | number | boolean | null => {
  const trimmed = v.trim()
  if (trimmed.toUpperCase() === "NULL") return null
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return parseFloat(trimmed)
  if (trimmed === "0") return false
  if (trimmed === "1") return true
  if (/^TRUE$/i.test(trimmed)) return true
  if (/^FALSE$/i.test(trimmed)) return false

  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    const unq = trimmed.slice(1, -1)
    if (trimmed.startsWith("'")) return unq.replace(/''/g, "'")
    return unq.replace(/""/g, '"')
  }
  return trimmed
}

const parseCondition = (str: string): FilterCondition | null => {
  const trimmed = str.trim()

  const nullMatch = trimmed.match(/^`([^`]+)`\s+(IS NULL|IS NOT NULL)$/i)
  if (nullMatch) {
    return {
      field: nullMatch[1],
      operator: nullMatch[2].toUpperCase() as FilterOperator,
    }
  }

  const boolMatch = trimmed.match(/^`([^`]+)`\s+(IS TRUE|IS FALSE)$/i)
  if (boolMatch) {
    return {
      field: boolMatch[1],
      operator: boolMatch[2].toUpperCase() as FilterOperator,
    }
  }

  const inOrNot = trimmed.match(/^`([^`]+)`\s+(NOT\s+)?IN\s*\(([^)]+)\)/i)
  if (inOrNot) {
    const field = inOrNot[1]
    const operator: FilterOperator = inOrNot[2] ? "NOT IN" : "IN"
    const list = inOrNot[3]

    const values: (string | number | boolean | null)[] = []
    let token = ""
    let inQuote = false
    let quoteChar = ""
    for (let i = 0; i < list.length; i++) {
      const ch = list[i]
      if ((ch === "'" || ch === '"') && (i === 0 || list[i - 1] !== "\\")) {
        if (!inQuote) {
          inQuote = true
          quoteChar = ch
        } else if (ch === quoteChar) {
          inQuote = false
        } else {
          token += ch
        }
      } else if (ch === "," && !inQuote) {
        if (token.trim()) values.push(parseValue(token.trim()))
        token = ""
      } else {
        token += ch
      }
    }
    if (token.trim()) values.push(parseValue(token.trim()))

    const processed = values
      .map((v) => {
        if (v === null) return "NULL"
        if (typeof v === "boolean") return v ? "1" : "0"
        return String(v)
      })
      .join(",")

    return { field, operator, value: processed }
  }

  const opMatch = trimmed.match(
    /^`([^`]+)`\s+(<>|!=|>=|<=|=|>|<|LIKE\b|NOT\s+LIKE\b)\s+(.+)/i
  )
  if (opMatch) {
    let op = opMatch[2].toUpperCase()
    if (op === "<>") op = "!="
    if (/NOT\s+LIKE/i.test(op)) op = "NOT LIKE"
    return {
      field: opMatch[1],
      operator: op as FilterOperator,
      value: parseValue(opMatch[3].trim()),
    }
  }

  console.warn("Neznámý formát podmínky:", trimmed)
  return null
}

export const parseSQLToTableQuery = (
  sqlQuery: string
): { tableName: string; query: GenericTableQuery } | null => {
  try {
    const cleanQuery = sqlQuery.trim().replace(/;$/, "")
    const result: GenericTableQuery = {}

    if (!/^SELECT\s/i.test(cleanQuery))
      throw new Error("Query must be a SELECT statement")

    const fromMatch = cleanQuery.match(/FROM\s+`([^`]+)`/i)
    if (!fromMatch) throw new Error("Cannot find table name in FROM clause")
    const tableName = fromMatch[1]

    const selectMatch = cleanQuery.match(/SELECT\s+(.+?)\s+FROM/i)
    if (selectMatch) {
      const colsStr = selectMatch[1].trim()
      if (colsStr !== "*") {
        result.columns = colsStr
          .split(",")
          .map((c) => c.trim())
          .map((c) => (c.startsWith("`") ? c.slice(1, -1) : c))
      }
    }

    const whereMatch = cleanQuery.match(
      /WHERE\s+(.+?)(?:\s+ORDER\s+BY|\s+LIMIT|$)/is
    )
    if (whereMatch) {
      const whereClause = whereMatch[1].trim()

      let depth = 0
      let orCnt = 0
      let _andCnt = 0
      for (let i = 0; i < whereClause.length; i++) {
        const rest = whereClause.substring(i)
        if (whereClause[i] === "(") depth++
        else if (whereClause[i] === ")") depth--
        else if (depth === 0) {
          const or = /^\s+OR\s+/i.exec(rest)
          const and = /^\s+AND\s+/i.exec(rest)
          if (or) {
            orCnt++
            i += or[0].length - 1
          } else if (and) {
            _andCnt++
            i += and[0].length - 1
          }
        }
      }
      const globalOp: "AND" | "OR" = orCnt > 0 ? "OR" : "AND"
      result.globalConditionOperator = globalOp

      const groups = splitTopLevel(whereClause, globalOp)
      const conditions: FilterCondition[] = []

      for (const g of groups) {
        const group = g.trim()
        if (group.startsWith("(") && group.endsWith(")")) {
          for (const c of splitTopLevel(group.slice(1, -1).trim(), "AND")) {
            const cond = parseCondition(c.trim())
            if (cond) conditions.push(cond)
          }
        } else {
          const cond = parseCondition(group)
          if (cond) conditions.push(cond)
        }
      }

      if (conditions.length) result.conditions = conditions
    }

    const ob = cleanQuery.match(/ORDER BY\s+`([^`]+)`\s+(ASC|DESC)(?:\s|$)/i)
    if (ob) {
      result.orderBy = {
        field: ob[1],
        direction: ob[2].toUpperCase() as "ASC" | "DESC",
      }
    }

    const lm = cleanQuery.match(/LIMIT\s+(\d+)(?:\s+OFFSET\s+(\d+))?/i)
    if (lm) {
      result.limit = Number.parseInt(lm[1], 10)
      if (lm[2]) result.offset = Number.parseInt(lm[2], 10)
    }

    return { tableName, query: result }
  } catch (err) {
    console.error("Error parsing SQL:", err)
    return null
  }
}
