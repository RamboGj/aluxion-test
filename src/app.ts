import fastify from "fastify"
import cors from '@fastify/cors'
import { BalanceRoutes } from "./routes/balance"

export const app = fastify()

app.register(cors)

app.register(BalanceRoutes, {
  prefix: "/balance"
})