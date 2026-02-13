import { Hono } from 'hono'
import {
    convert,
    format,
    getExchangeRate,
    invalidateCache,
    type CurrencyCode,
} from './currency-service'

const app = new Hono()

// ============================================
// GET CURRENT RATE
// ============================================
app.get('/rate', async (c) => {
  const rate = await getExchangeRate()
  return c.json(rate)
})

// ============================================
// CONVERT AMOUNT
// ============================================
app.get('/convert', async (c) => {
  const amount = parseFloat(c.req.query('amount') || '0')
  const from = (c.req.query('from') || 'USD') as CurrencyCode
  const to = (c.req.query('to') || 'ZIG') as CurrencyCode

  const { rate } = await getExchangeRate()
  const converted = convert(amount, from, to, rate)

  return c.json({
    from: format(amount, from),
    to: format(converted, to),
    rate,
    amount: converted,
  })
})

// ============================================
// REFRESH (INVALIDATE CACHE)
// ============================================
app.post('/refresh', async (c) => {
  invalidateCache()
  const rate = await getExchangeRate()
  return c.json(rate)
})

export default app
