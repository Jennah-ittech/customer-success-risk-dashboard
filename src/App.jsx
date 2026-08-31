import { useMemo, useState } from 'react'
import './App.css'

const customers = [
  { name: 'Northstar Health', owner: 'Maya Chen', health: 42, usage: 38, tickets: 7, renewal: 'Sep 28' },
  { name: 'BrightPath Retail', owner: 'Andre Lewis', health: 64, usage: 72, tickets: 3, renewal: 'Oct 12' },
  { name: 'Summit Logistics', owner: 'Jordan Patel', health: 86, usage: 91, tickets: 1, renewal: 'Nov 04' },
  { name: 'Willow & Co.', owner: 'Sam Rivera', health: 53, usage: 49, tickets: 5, renewal: 'Oct 03' },
]

function getRisk(customer) {
  if (customer.health < 50 || customer.usage < 45 || customer.tickets >= 6) return 'High'
  if (customer.health < 70 || customer.usage < 70 || customer.tickets >= 4) return 'Medium'
  return 'Low'
}

function App() {
  const [filter, setFilter] = useState('All')
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0].name)

  const visibleCustomers = useMemo(
    () => customers.filter((customer) => filter === 'All' || getRisk(customer) === filter),
    [filter],
  )

  const selected = customers.find((customer) => customer.name === selectedCustomer)
  const risk = getRisk(selected)
  const highRiskCount = customers.filter((customer) => getRisk(customer) === 'High').length

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">AUTOMATION DEMO</p>
          <h1>Customer Success Risk Dashboard</h1>
          <p className="subtitle">Turn account signals into clear, proactive next steps.</p>
        </div>
        <div className="score-card">
          <span>Accounts needing attention</span>
          <strong>{highRiskCount}</strong>
        </div>
      </section>

      <section className="metrics">
        <div><span>Accounts monitored</span><strong>{customers.length}</strong></div>
        <div><span>Average health score</span><strong>61</strong></div>
        <div><span>Open support tickets</span><strong>16</strong></div>
      </section>

      <section className="dashboard">
        <div className="account-list">
          <div className="section-heading">
            <h2>Account signals</h2>
            <div className="filters">
              {['All', 'High', 'Medium', 'Low'].map((item) => (
                <button
                  className={filter === item ? 'active' : ''}
                  key={item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {visibleCustomers.map((customer) => {
            const customerRisk = getRisk(customer)
            return (
              <button
                className={`account-row ${selectedCustomer === customer.name ? 'selected' : ''}`}
                key={customer.name}
                onClick={() => setSelectedCustomer(customer.name)}
              >
                <span>
                  <strong>{customer.name}</strong>
                  <small>{customer.owner} · Renews {customer.renewal}</small>
                </span>
                <span className={`badge ${customerRisk.toLowerCase()}`}>{customerRisk} risk</span>
              </button>
            )
          })}
        </div>

        <aside className="recommendation">
          <p className="eyebrow">RECOMMENDED NEXT STEP</p>
          <h2>{selected.name}</h2>
          <span className={`badge ${risk.toLowerCase()}`}>{risk} risk</span>
          <p>
            Health is {selected.health}% with {selected.usage}% product usage and {selected.tickets} open support tickets.
          </p>
          <div className="action-box">
            <strong>{risk === 'High' ? 'Schedule a recovery call within 48 hours.' : 'Send a proactive check-in and adoption resource.'}</strong>
            <span>Suggested by account-signal automation</span>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default App
