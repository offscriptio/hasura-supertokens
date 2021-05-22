import { FastifyRequest, FastifyReply } from "fastify"
import { loadFiles } from "@graphql-tools/load-files"
import { InsertUserMutation } from "lib/@types/graphql"
import { query } from "./query"

interface Body {
  input: {
    email: string
    id: string
  }
}

const index = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const eventObject = request.body as Body
    const {
      input: { email, id },
    } = eventObject
    const [InsertUser] = await loadFiles("lib/graphql/insert.graphql")
    const response = await query<InsertUserMutation>(InsertUser, {
      email,
      id,
    })
    if (!response || !response.insert_users_one.id)
      throw new Error("Something went wrong")
    reply.send(response.insert_users_one.id)
  } catch (err) {
    console.error(err)
    reply.statusCode = 500
    reply.send("Error")
  }
}

export default index
