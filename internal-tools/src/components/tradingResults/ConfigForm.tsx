import type { FC } from "react"
import type { AlgoConfig, AlgoConfigType } from "@/utils/types/AlgoConfig.ts"
import { Section } from "@/components/tradingResults/fields/Section.tsx"
import { NumField } from "@/components/tradingResults/fields/NumField.tsx"
import { SelectField } from "@/components/tradingResults/fields/SelectField.tsx"
import { StrField } from "@/components/tradingResults/fields/StrField.tsx"

type ConfigFormProps = {
  config: AlgoConfig
  type: AlgoConfigType
  onChange: (c: AlgoConfig) => void
}

const LOG_LEVELS = ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"].map(
  (l) => ({
    value: l,
    label: l,
  })
)

function deepClone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v))
}

export const ConfigForm: FC<ConfigFormProps> = ({ config, type, onChange }) => {
  const upd = <K extends keyof AlgoConfig>(
    section: K,
    field: keyof AlgoConfig[K],
    value: unknown
  ) => {
    const next = deepClone(config)
    ;(next[section] as Record<string, unknown>)[field as string] = value
    onChange(next)
  }

  return (
    <div className="space-y-5">
      <Section title="Trading">
        <NumField
          label="hours_back"
          value={config.trading.hours_back}
          onChange={(v) => upd("trading", "hours_back", v)}
          min={1}
        />
        <NumField
          label="interval_seconds"
          value={config.trading.interval_seconds}
          onChange={(v) => upd("trading", "interval_seconds", v)}
          min={60}
        />
        <NumField
          label="quantity_precision"
          value={config.trading.quantity_precision}
          onChange={(v) => upd("trading", "quantity_precision", v)}
          min={0}
          max={10}
        />
        <SelectField
          label="dry_run"
          value={config.trading.dry_run ? "true" : "false"}
          options={[
            { value: "false", label: "false" },
            { value: "true", label: "true" },
          ]}
          onChange={(v) => upd("trading", "dry_run", v === "true")}
        />
      </Section>

      <Section title="Indikátor">
        {type === "sma" ? (
          <NumField
            label="sma_period"
            value={config.indicators.sma_period ?? 14}
            onChange={(v) => upd("indicators", "sma_period", v)}
            min={1}
          />
        ) : (
          <NumField
            label="ema_period"
            value={config.indicators.ema_period ?? 21}
            onChange={(v) => upd("indicators", "ema_period", v)}
            min={1}
          />
        )}
      </Section>

      <Section title="Strategie (Fear thresholds)">
        <NumField
          label="fear_buy_threshold"
          value={config.strategy.fear_buy_threshold}
          onChange={(v) => upd("strategy", "fear_buy_threshold", v)}
          min={0}
          max={100}
        />
        <NumField
          label="fear_sell_threshold"
          value={config.strategy.fear_sell_threshold}
          onChange={(v) => upd("strategy", "fear_sell_threshold", v)}
          min={0}
          max={100}
        />
      </Section>

      <Section title="Risk management">
        <NumField
          label="buy_strong_fear_thr."
          value={config.risk_management.buy_strong_fear_threshold}
          onChange={(v) =>
            upd("risk_management", "buy_strong_fear_threshold", v)
          }
          min={0}
          max={100}
        />
        <NumField
          label="buy_normal_fear_thr."
          value={config.risk_management.buy_normal_fear_threshold}
          onChange={(v) =>
            upd("risk_management", "buy_normal_fear_threshold", v)
          }
          min={0}
          max={100}
        />
        <NumField
          label="sell_normal_fear_thr."
          value={config.risk_management.sell_normal_fear_threshold}
          onChange={(v) =>
            upd("risk_management", "sell_normal_fear_threshold", v)
          }
          min={0}
          max={100}
        />
        <NumField
          label="sell_strong_fear_thr."
          value={config.risk_management.sell_strong_fear_threshold}
          onChange={(v) =>
            upd("risk_management", "sell_strong_fear_threshold", v)
          }
          min={0}
          max={100}
        />
        <NumField
          label="buy_strong"
          value={config.risk_management.buy_strong}
          onChange={(v) => upd("risk_management", "buy_strong", v)}
          step={0.01}
          min={0}
          max={1}
        />
        <NumField
          label="buy_normal"
          value={config.risk_management.buy_normal}
          onChange={(v) => upd("risk_management", "buy_normal", v)}
          step={0.01}
          min={0}
          max={1}
        />
        <NumField
          label="sell_strong"
          value={config.risk_management.sell_strong}
          onChange={(v) => upd("risk_management", "sell_strong", v)}
          step={0.01}
          min={0}
          max={1}
        />
        <NumField
          label="sell_normal"
          value={config.risk_management.sell_normal}
          onChange={(v) => upd("risk_management", "sell_normal", v)}
          step={0.01}
          min={0}
          max={1}
        />
      </Section>

      <Section title="Limity">
        <NumField
          label="min_quote_balance"
          value={config.limits.min_quote_balance}
          onChange={(v) => upd("limits", "min_quote_balance", v)}
          step={0.0001}
          min={0}
        />
        <NumField
          label="min_base_balance"
          value={config.limits.min_base_balance}
          onChange={(v) => upd("limits", "min_base_balance", v)}
          step={0.0001}
          min={0}
        />
        {config.limits.min_balance !== undefined && (
          <NumField
            label="min_balance"
            value={config.limits.min_balance}
            onChange={(v) => upd("limits", "min_balance", v)}
            step={0.0001}
            min={0}
          />
        )}
      </Section>

      <Section title="Logging">
        <StrField
          label="log_dir"
          value={config.logging.log_dir}
          onChange={(v) => upd("logging", "log_dir", v)}
        />
        <StrField
          label="combined_log_file"
          value={config.logging.combined_log_file}
          onChange={(v) => upd("logging", "combined_log_file", v)}
        />
        <StrField
          label="session_log_template"
          value={config.logging.session_log_template}
          onChange={(v) => upd("logging", "session_log_template", v)}
        />
        <NumField
          label="backup_count"
          value={config.logging.backup_count}
          onChange={(v) => upd("logging", "backup_count", v)}
          min={0}
        />
        <SelectField
          label="level"
          value={config.logging.level}
          options={LOG_LEVELS}
          onChange={(v) => upd("logging", "level", v)}
        />
      </Section>

      <Section title="Databáze">
        <StrField
          label="db_file"
          value={config.database.db_file}
          onChange={(v) => upd("database", "db_file", v)}
        />
      </Section>
    </div>
  )
}