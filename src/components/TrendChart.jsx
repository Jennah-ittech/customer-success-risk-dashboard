export function TrendChart({ data }) {
  if (!data || !data.length) {
    return null
  }

  const width = 520
  const height = 220
  const padding = 22

  const maxValue = Math.max(...data.flatMap((point) => [point.health, point.usage]), 100)
  const minValue = Math.min(...data.flatMap((point) => [point.health, point.usage]), 0)

  const toX = (index) =>
    padding + (index * (width - padding * 2)) / (Math.max(data.length - 1, 1))

  const toY = (value) =>
    height - padding - ((value - minValue) / Math.max(maxValue - minValue, 1)) * (height - padding * 2)

  const healthPath = data
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${toX(index)} ${toY(point.health)}`)
    .join(' ')

  const usagePath = data
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${toX(index)} ${toY(point.usage)}`)
    .join(' ')

  return (
    <div className="panel trend-panel">
      <div className="panel-header chart-header">
        <div>
          <p className="eyebrow">RETENTION TREND</p>
          <h2>Portfolio momentum</h2>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="trend-chart" role="img" aria-label="Portfolio health trend over time">
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = toY(tick)
          return (
            <g key={tick}>
              <line x1={padding} x2={width - padding} y1={y} y2={y} className="grid-line" />
              <text x={8} y={y + 4} className="axis-label">{tick}</text>
            </g>
          )
        })}

        <path d={healthPath} className="trend-line trend-health" />
        <path d={usagePath} className="trend-line trend-usage" />

        {data.map((point, index) => (
          <g key={point.month}>
            <text x={toX(index)} y={height - 4} textAnchor="middle" className="axis-label month-label">
              {point.month}
            </text>
          </g>
        ))}
      </svg>

      <div className="legend">
        <span><i className="legend-dot health" />Health</span>
        <span><i className="legend-dot usage" />Usage</span>
      </div>
    </div>
  )
}
