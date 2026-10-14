import { getRisk } from '../data/customerData'

export function DetailPanel({ customer }) {
  if (!customer) {
    return null
  }

  const risk = getRisk(customer)

  return (
    <aside className="panel detail-panel" aria-live="polite">
      <p className="eyebrow">RECOMMENDED ACTION</p>
      <div className="account-inline">
        <h2>{customer.name}</h2>
        <span className={`badge ${risk.label.toLowerCase()}`}>{risk.label} risk</span>
      </div>

      <div className="detail-meta">
        <span>{customer.owner}</span>
        <span>Renewal: {customer.renewal}</span>
      </div>

      <div className="score-block">
        <span className="score-label">Risk score</span>
        <strong>{risk.score}</strong>
      </div>

      <div className="signal-grid">
        <div className="signal-card">
          <span>Health</span>
          <strong>{customer.health}%</strong>
        </div>
        <div className="signal-card">
          <span>Usage</span>
          <strong>{customer.usage}%</strong>
        </div>
        <div className="signal-card">
          <span>Tickets</span>
          <strong>{customer.tickets}</strong>
        </div>
        <div className="signal-card">
          <span>Sentiment</span>
          <strong>{customer.sentiment}</strong>
        </div>
      </div>

      <div className="action-box">
        <h3>Suggested next step</h3>
        <p>
          {risk.label === 'High'
            ? 'Launch a recovery plan and align on executive sponsorship within 48 hours.'
            : risk.label === 'Medium'
              ? 'Run a proactive adoption review and share a tailored success plan.'
              : 'Keep the account on a healthy cadence with a quarterly value review.'}
        </p>
      </div>
    </aside>
  )
}
