import fastify from 'fastify'
import cors from '@fastify/cors'
import { ZodError } from 'zod'
import { env } from './env'
import { usersRoutes } from './http/controllers/users/routes'
import { billingControlsRoutes } from './http/controllers/billing-controls/routes'

export const app = fastify()

app.register(cors, {
  origin: '*',
})

app.register(usersRoutes)
app.register(billingControlsRoutes)

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
