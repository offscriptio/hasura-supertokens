import dotenv from "dotenv"
import Fastify, { FastifyInstance } from "fastify"

import webhook from "./webhook"
import status from "./status"
import users_create from "./users_create"

// Configs
dotenv.config()

const fastify: FastifyInstance = Fastify()

// Status
fastify.get("/", status)

// Webhook
fastify.post("/webhook", webhook)

// Users Create
fastify.post("/users/create", users_create)
;(async () => {
  try {
    const port = 3000
    console.info(`Starting server on port ${port}`)
    // Start server
    await fastify.listen(port, "0.0.0.0")
  } catch (err) {
    console.error(err)
    fastify.log.error(err)
    process.exit(1)
  }
})()
