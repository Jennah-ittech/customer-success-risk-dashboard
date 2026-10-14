import { getRisk } from '../data/customerData'

const riskLevels = ['All', 'High', 'Medium', 'Low']

export function AccountList({ customers, filter, selectedCustomer, onFilterChange, onSelectCustomer }) {
  return (
    <div className="panel account-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">ACCOUNT SIGNALS</p>
          <h2>Portfolio watchlist</h2>
        </div>

        <div className="filters" aria-label="risk filters">
          {riskLevels.map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? 'active' : ''}
              onClick={() => onFilterChange(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {customers.length === 0 ? (
        <div className="empty-state" aria-live="polite">
          No accounts match this risk filter.
        </div>
      ) : (
        <div className="account-list" role="list">
          {customers.map((customer) => {
            const risk = getRisk(customer)

            return (
              <button
                type="button"
                key={customer.id || customer.name}
                className={`account-row ${selectedCustomer === customer.id ? 'selected' : ''}`}
                onClick={() => onSelectCustomer(customer.id)}
              >
                <div className="customer-copy">
                  <strong>{customer.name}</strong>
                  <small>{customer.owner} · Renews {customer.renewal}</small>
                </div>

                <div className="row-meta">
                  <span className={`badge ${risk.label.toLowerCase()}`}>{risk.label}</span>
                  <span className="sentiment">{customer.sentiment}</span>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
