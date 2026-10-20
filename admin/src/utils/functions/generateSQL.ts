import type {
  FilterCondition,
  GenericTableQuery,
  GenericTableSchema,
} from "@/utils/types/genericTable.ts"

const escapeSqlValue = (
  val: unknown,
  isNumericColumn = false
): string | number => {
  if (isNumericColumn) {
    const num = parseFloat(String(val))
    return Number.isNaN(num) ? "NULL" : num
  }
  if (typeof val === "string") return `'${val.replace(/'/g, "''")}'`
  if (typeof val === "number") return val
  if (typeof val === "boolean") return val ? 1 : 0
  if (val === null || val === undefined) return "NULL"
  return `'${String(val).replace(/'/g, "''")}'`
}

const isColumnNumericUtil = (
  fieldName: string,
  schema: GenericTableSchema[] | undefined
): boolean => {
  if (!schema) return false
  const columnSchema = schema.find((col) => col.Field === fieldName)
  if (!columnSchema) return false
  return (
    /^(int|tinyint|smallint|mediumint|bigint|float|double|decimal)/i.test(
      columnSchema.Type
    ) && columnSchema.Type.toLowerCase() !== "tinyint(1)"
  )
}

export const generateSQLQuery = (
  currentQuery: Partial<GenericTableQuery> | undefined,
  currentTable: string
): string => {
  if (!currentTable) return "-- Název tabulky není specifikován."
  if (
    !currentQuery ||
    Object.keys(currentQuery).length === 0 ||
    (!currentQuery.columns &&
      !currentQuery.conditions &&
      !currentQuery.orderBy &&
      currentQuery.limit === undefined)
  ) {
    return `SELECT *\nFROM \`${currentTable}\`;\n-- Objekt dotazu (query) je prázdný nebo neobsahuje specifická nastavení.`
  }

  let selectClause = "SELECT "
  selectClause +=
    currentQuery.columns && currentQuery.columns.length > 0
      ? currentQuery.columns.map((col) => `\`${col}\``).join(", ")
      : "*"

  const fromClause = `FROM \`${currentTable}\``
  let whereClause = ""

  if (currentQuery.conditions && currentQuery.conditions.length > 0) {
    const conditionsByField: Record<string, FilterCondition[]> = {}
    for (const cond of currentQuery.conditions) {
      if (!cond.field || !cond.operator) continue
      if (!conditionsByField[cond.field]) conditionsByField[cond.field] = []
      conditionsByField[cond.field].push(cond)
    }

    const fieldConditionStrings: string[] = []
    for (const fieldNameInGroup of Object.keys(conditionsByField)) {
      const fieldSpecificConditions = conditionsByField[fieldNameInGroup]
      const isNumericCol = isColumnNumericUtil(fieldNameInGroup, undefined)

      const fieldSpecificConditionParts = fieldSpecificConditions
        .map((cond) => {
          const fieldSql = `\`${cond.field}\``
          if (cond.operator === "IS NULL" || cond.operator === "IS NOT NULL") {
            return `${fieldSql} ${cond.operator}`
          }
          if (cond.operator === "IN" || cond.operator === "NOT IN") {
            if (
              cond.value === undefined ||
              cond.value === null ||
              String(cond.value).trim() === ""
            )
              return null
            const valuesArray = String(cond.value)
              .split(",")
              .map((v) => v.trim())
              .filter((v) => v !== "")
            if (valuesArray.length === 0) return null
            const escapedValues = valuesArray.map((v) =>
              escapeSqlValue(v, isNumericCol)
            )
            return `${fieldSql} ${cond.operator} (${escapedValues.join(", ")})`
          }
          if (
            cond.value === undefined &&
            !["=", "!=", "<>", "LIKE", "NOT LIKE"].includes(cond.operator)
          )
            return null
          const valueStr = escapeSqlValue(
            cond.value,
            isNumericCol &&
              ["=", "!=", "<>", ">", "<", ">=", "<="].includes(cond.operator)
          )
          return `${fieldSql} ${cond.operator} ${valueStr}`
        })
        .filter((part): part is string => part !== null)

      if (fieldSpecificConditionParts.length > 0) {
        const joinedByAnd = fieldSpecificConditionParts.join(" AND ")
        fieldConditionStrings.push(
          fieldSpecificConditionParts.length > 1
            ? `(${joinedByAnd})`
            : joinedByAnd
        )
      }
    }

    if (fieldConditionStrings.length > 0) {
      const globalOperator =
        currentQuery.globalConditionOperator === "OR" ? " OR " : " AND "
      whereClause = `WHERE ${fieldConditionStrings.join(globalOperator)}`
    }
  }

  let orderByClause = ""
  if (currentQuery.orderBy?.field) {
    const direction =
      currentQuery.orderBy.direction?.toUpperCase() === "DESC" ? "DESC" : "ASC"
    orderByClause = `ORDER BY \`${currentQuery.orderBy.field}\` ${direction}`
  }

  let limitClause = ""
  if (
    currentQuery.limit !== undefined &&
    typeof currentQuery.limit === "number" &&
    currentQuery.limit > 0
  ) {
    limitClause = `LIMIT ${currentQuery.limit}`
    if (
      currentQuery.offset !== undefined &&
      typeof currentQuery.offset === "number" &&
      currentQuery.offset >= 0
    ) {
      limitClause += ` OFFSET ${currentQuery.offset}`
    }
  }

  const sqlParts = [
    selectClause,
    fromClause,
    whereClause,
    orderByClause,
    limitClause,
  ]
  return `${sqlParts.filter((part) => part && part.trim() !== "").join("\n")};`
}
