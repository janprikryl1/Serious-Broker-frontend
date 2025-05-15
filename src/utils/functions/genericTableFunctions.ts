export const isNumericType = (dbType: string): boolean =>
    /^(int|tinyint|smallint|mediumint|bigint|float|double|decimal)/i.test(dbType) && dbType.toLowerCase() !== 'tinyint(1)';

export const isStringType = (dbType: string): boolean =>
    /^(varchar|char|text|mediumtext|longtext|enum)/i.test(dbType);

export const isDateType = (dbType: string): boolean =>
    /^(date|datetime|timestamp|year)/i.test(dbType);

export const isBooleanType = (dbType: string): boolean =>
    dbType.toLowerCase() === 'tinyint(1)' || dbType.toLowerCase() === 'tinyint(4)';