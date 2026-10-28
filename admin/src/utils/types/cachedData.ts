export type CachedDataType = {
  name: string
  created_at: string
  modified_at: string
  /** Bajty — formátuje se až v UI, ať se dají sčítat. */
  size_bytes: number
}

export type CachedDataResponse = {
  data: CachedDataType[]
  fileCount: number
  totalBytes: number
}

/** Skupina sledovaných míst na disku — log, cache, data, média. */
export type StorageGroup = {
  key: string
  label: string
  sizeBytes: number
  size: string | null
  fileCount: number
  /** Podíl na celkové obsazenosti v procentech. */
  share: number
}

export type StorageEntry = {
  key: string
  group: string
  groupLabel: string
  label: string
  path: string
  type: "dir" | "file" | "glob"
  exists: boolean
  fileCount: number
  sizeBytes: number
  size: string | null
  modified: string | null
  writable: boolean
  /** `false`, pokud se složku nepodařilo projít celou. */
  complete: boolean
}

export type StorageUsageResponse = {
  generatedAt: string
  totalBytes: number
  total: string | null
  totalFiles: number
  groups: StorageGroup[]
  entries: StorageEntry[]
  disk: {
    totalBytes: number | null
    freeBytes: number | null
    total: string | null
    free: string | null
  }
}
