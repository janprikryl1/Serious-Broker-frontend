/** Barevné rozlišení stavu v tabulkách diagnostiky. */
export type CheckStatus = "ok" | "warn" | "neutral"

/** Severita jednoho záznamu v error logu. */
export type LogLevel = "fatal" | "warning" | "deprecated" | "notice" | "info"

export type LogLevelCounts = Record<LogLevel, number>

export type ErrorLogEntry = {
  id: number
  /** Čas zapsaný PHP do logu, tj. v časové zóně serveru. */
  time: string | null
  /** ISO varianta `time`, pokud se podařilo rozparsovat. */
  timestamp: string | null
  level: LogLevel
  /** Původní popis typu, např. "Fatal error" nebo "Warning". */
  type: string
  message: string
  file: string | null
  line: number | null
  /** Navazující řádky záznamu (stack trace). */
  trace: string[]
}

export type ErrorLogResponse = {
  path: string
  exists: boolean
  sizeBytes: number
  size: string | null
  modified: string | null
  writable: boolean
  /** true = log je větší než načtené okno, starší záznamy nejsou vidět. */
  truncated: boolean
  totalInWindow: number
  matched: number
  counts: LogLevelCounts
  entries: ErrorLogEntry[]
}

export type ErrorLogParams = {
  limit?: number
  level?: LogLevel | "all"
  search?: string
  order?: "asc" | "desc"
}

export type OpcacheInfo = {
  enabled: boolean
  usedMemory: string | null
  freeMemory: string | null
  cachedScripts: number
  hitRate: number | null
}

export type PhpInfo = {
  version: string
  versionId: number
  sapi: string
  zendVersion: string
  architecture: number
  os: string
  extensionCount: number
  iniFile: string | null
  scannedIniFiles: string | null
  processUser: string | null
  opcache: OpcacheInfo | null
}

export type ServerContextInfo = {
  software: string | null
  protocol: string | null
  hostname: string | null
  https: boolean
  serverAddress: string | null
  serverPort: string | null
  documentRoot: string | null
  apiRoot: string
  serverTime: string
  timezone: string
  loadAverage: number[] | null
}

export type IniEntry = {
  key: string
  label: string
  value: string | null
  recommended: string | null
  status: CheckStatus
}

export type ExtensionEntry = {
  name: string
  loaded: boolean
  required: boolean
  version: string | null
}

export type DatabaseInfo = {
  connected: boolean
  host: string
  name: string
  user: string
  version?: string
  latencyMs?: number
  serverTime?: string
  clientVersion?: string
  tables?: number
  sizeBytes?: number
  size?: string | null
  rowsEstimate?: number
  threadsConnected?: number | null
  uptimeSeconds?: number | null
  maxConnections?: number | null
  error?: string
}

export type DataFreshnessInfo = {
  lastTableLog: string | null
  lastTableLogTable: string | null
  lastTableLogAction: string | null
  error?: string
}

export type DiskInfo = {
  totalBytes: number | null
  freeBytes: number | null
  total: string | null
  free: string | null
  used: string | null
  usedPercent: number | null
}

export type PathEntry = {
  label: string
  path: string
  exists: boolean
  isDir: boolean
  readable: boolean
  writable: boolean
  expectWritable: boolean
  size: string | null
  status: CheckStatus
}

export type ErrorLogSummary = {
  path: string
  exists: boolean
  sizeBytes: number
  size: string | null
  modified: string | null
  writable: boolean
  counts: LogLevelCounts
  recentEntries: number
  windowTruncated: boolean
  lastEntry: {
    time: string | null
    level: LogLevel
    type: string
    message: string
  } | null
}

export type ServerInfoResponse = {
  generatedAt: string
  php: PhpInfo
  server: ServerContextInfo
  ini: IniEntry[]
  extensions: ExtensionEntry[]
  database: DatabaseInfo
  dataFreshness: DataFreshnessInfo
  disk: DiskInfo
  paths: PathEntry[]
  errorLog: ErrorLogSummary
}

/** Druh kontroly ve validaci dat (viz server/data_validation_config.php). */
export type DataValidationCheckType =
  "sync_log" | "freshness" | "daily_coverage" | "min_rows" | "connection"

export type DataValidationCheck = {
  type: DataValidationCheckType
  name: string
  ok: boolean
  message: string
}

export type DataValidationRun = {
  id: number
  /** Čas v časové zóně serveru. */
  checkedAt: string
  ageHours: number
  status: "ok" | "error"
  failed: number
  total: number
  /** null = e-mail nebyl potřeba, false = odeslání selhalo. */
  emailSent: boolean | null
  testEmail: boolean
  source: "cli" | "http"
  durationMs: number | null
  checks: DataValidationCheck[]
}

export type DataValidationCheckStat = {
  name: string
  type: DataValidationCheckType
  runs: number
  failed: number
  lastFailedAt: string | null
}

export type DataValidationResponse = {
  generatedAt: string
  /** false = migrace tabulek z docs/migrations ještě neproběhla. */
  tableExists: boolean
  days: number
  latest: DataValidationRun | null
  latestAgeHours: number | null
  /** Validace sama neběžela déle než staleAfterHours. */
  stale: boolean
  staleAfterHours: number
  summary: {
    runs: number
    ok: number
    error: number
    emailsSent: number
    emailsFailed: number
  }
  checkNames: string[]
  checkStats: DataValidationCheckStat[]
  runs: DataValidationRun[]
}

export type DataValidationParams = {
  days?: number
  status?: "all" | "ok" | "error"
}
