import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { AccountList } from './components/AccountList'
import { DetailPanel } from './components/DetailPanel'
import { MetricCard } from './components/MetricCard'
import { TrendChart } from './components/TrendChart'
import { getRisk, summarizeCustomers } from './data/customerData'
import { fetchCustomerData } from './services/customerData'

function App() {
  const [customers, setCustomers] = useState([])
  const [portfolioTrend, setPortfolioTrend] = useState([])
  const [filter, setFilter] = useState('All')
  const [selectedCustomerId, setSelectedCustomerId] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    fetchCustomerData()
      .then(({ customers: nextCustomers, portfolioTrend: nextTrend }) => {
        if (!active) return

        setCustomers(nextCustomers)
        setPortfolioTrend(nextTrend)
        setSelectedCustomerId((currentId) => currentId || nextCustomers[0]?.id || '')
      })
      .finally(() => {
        if (active) {
          setIsLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const visibleCustomers = useMemo(
    () =>
      customers.filter(
        (customer) => filter === 'All' || getRisk(customer).label === filter,
      ),
    [customers, filter],
  )

  const selectedCustomer = useMemo(() => {
    if (!visibleCustomers.length) {
      return null
    }

    return customers.find((customer) => customer.id === selectedCustomerId) ?? visibleCustomers[0]
  }, [customers, selectedCustomerId, visibleCustomers])

  const summary = useMemo(() => summarizeCustomers(customers), [customers])

  if (isLoading) {
    return (
      <main className="dashboard-shell">
        <div className="loading-state">Loading portfolio data…</div>
      </main>
    )
  }

  return (
    <main className="dashboard-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">OPERATIONS OVERVIEW</p>
          <h1>Customer Success Risk Dashboard</h1>
          <p className="subtitle">
            Prioritize at-risk accounts and focus interventions where retention signal is strongest.
          </p>
        </div>

        <div className="header-actions">
          <button type="button" className="secondary-button">
            Export
          </button>
          <button type="button" className="primary-button">
            Review risk queue
          </button>
        </div>
      </header>

      <section className="metrics" aria-label="dashboard summary metrics">
        <MetricCard
          label="Accounts monitored"
          value={summary.totalAccounts}
          note="Across major revenue accounts"
        />
        <MetricCard
          label="Average health"
          value={summary.averageHealth}
          note="Composite health score"
        />
        <MetricCard
          label="At-risk accounts"
          value={summary.highRiskCount}
          note="Need immediate action"
        />
        <MetricCard
          label="Open tickets"
          value={summary.openTickets}
          note="Support load this week"
          accent
        />
      </section>

      <TrendChart data={portfolioTrend} />

      <section className="content-grid">
        <AccountList
          customers={visibleCustomers}
          filter={filter}
          selectedCustomer={selectedCustomer?.id ?? ''}
          onFilterChange={setFilter}
          onSelectCustomer={setSelectedCustomerId}
        />

        <DetailPanel customer={selectedCustomer} />
      </section>
    </main>
  )
}

export default App
