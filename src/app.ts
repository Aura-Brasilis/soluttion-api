import fastify from 'fastify'
import cors from '@fastify/cors'
import { ZodError } from 'zod'
import { env } from './env'
import { usersRoutes } from './http/controllers/users/routes'
import { billingControlsRoutes } from './http/controllers/billing-controls/routes'
import { energyBillsRoutes } from './http/controllers/energy-bills/routes'
import { billingItemsRoutes } from './http/controllers/billing-items/routes'
import { consumptionHistoriesRoutes } from './http/controllers/consumption-history/routes'
import { billingItems2Routes } from './http/controllers/billing-items-2/routes'
import { tenantsPlantsRoutes } from './http/controllers/tenants-plants/routes'

export const app = fastify()

app.register(cors, {
  origin: '*',
})

app.register(usersRoutes)
app.register(billingControlsRoutes)
app.register(energyBillsRoutes)
app.register(billingItemsRoutes)
app.register(billingItems2Routes)
app.register(consumptionHistoriesRoutes)
app.register(tenantsPlantsRoutes)

app.setErrorHandler((error, _, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ msg: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return res.status(500).send({ msg: 'Internal server error' })
})
