export const customerSeedData = [
  {
    id: 'northstar-health',
    name: 'Northstar Health',
    owner: 'Maya Chen',
    health: 42,
    usage: 38,
    tickets: 7,
    renewal: 'Sep 28',
    sentiment: 'Escalating',
    region: 'North America',
  },
  {
    id: 'brightpath-retail',
    name: 'BrightPath Retail',
    owner: 'Andre Lewis',
    health: 64,
    usage: 72,
    tickets: 3,
    renewal: 'Oct 12',
    sentiment: 'Monitor',
    region: 'EMEA',
  },
  {
    id: 'summit-logistics',
    name: 'Summit Logistics',
    owner: 'Jordan Patel',
    health: 86,
    usage: 91,
    tickets: 1,
    renewal: 'Nov 04',
    sentiment: 'Healthy',
    region: 'APAC',
  },
  {
    id: 'willow-co',
    name: 'Willow & Co.',
    owner: 'Sam Rivera',
    health: 53,
    usage: 49,
    tickets: 5,
    renewal: 'Oct 03',
    sentiment: 'Watchlist',
    region: 'North America',
  },
  {
    id: 'atlas-financial',
    name: 'Atlas Financial',
    owner: 'Priya Nair',
    health: 77,
    usage: 82,
    tickets: 2,
    renewal: 'Dec 15',
    sentiment: 'Stable',
    region: 'North America',
  },
]

export const portfolioTrend = [
  { month: 'Jan', health: 62, usage: 58 },
  { month: 'Feb', health: 59, usage: 61 },
  { month: 'Mar', health: 65, usage: 67 },
  { month: 'Apr', health: 63, usage: 69 },
  { month: 'May', health: 68, usage: 74 },
  { month: 'Jun', health: 71, usage: 79 },
]

export function getRisk(customer) {
  const riskScore = Math.round(
    (100 - customer.health) * 0.45 +
      (100 - customer.usage) * 0.35 +
      customer.tickets * 8,
  )

  if (riskScore >= 55 || customer.health < 50 || customer.usage < 45 || customer.tickets >= 6) {
    return { label: 'High', score: riskScore }
  }

  if (riskScore >= 28 || customer.health < 70 || customer.usage < 70 || customer.tickets >= 4) {
    return { label: 'Medium', score: riskScore }
  }

  return { label: 'Low', score: riskScore }
}

export function summarizeCustomers(customers) {
  const totalAccounts = customers.length
  const averageHealth = Math.round(
    customers.reduce((total, customer) => total + customer.health, 0) / totalAccounts,
  )
  const highRiskCount = customers.filter((customer) => getRisk(customer).label === 'High').length
  const openTickets = customers.reduce((total, customer) => total + customer.tickets, 0)

  return {
    totalAccounts,
    averageHealth,
    highRiskCount,
    openTickets,
  }
}
