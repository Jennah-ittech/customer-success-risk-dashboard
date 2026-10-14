import { customerSeedData, portfolioTrend } from '../data/customerData'

function normalizeCustomers(data) {
  if (!Array.isArray(data)) {
    return customerSeedData
  }

  return data.map((customer) => ({
    id: customer.id || customer.name.toLowerCase().replace(/\s+/g, '-'),
    name: customer.name,
    owner: customer.owner,
    health: Number(customer.health) || 0,
    usage: Number(customer.usage) || 0,
    tickets: Number(customer.tickets) || 0,
    renewal: customer.renewal,
    sentiment: customer.sentiment,
    region: customer.region || 'Unknown',
  }))
}

export async function fetchCustomerData() {
  try {
    const response = await fetch('/data/customers.json', { cache: 'no-store' })

    if (!response.ok) {
      throw new Error('Failed to load dashboard data')
    }

    const payload = await response.json()

    return {
      customers: normalizeCustomers(payload.customers || payload),
      portfolioTrend: Array.isArray(payload.portfolioTrend) ? payload.portfolioTrend : portfolioTrend,
    }
  } catch {
    return {
      customers: customerSeedData,
      portfolioTrend,
    }
  }
}
