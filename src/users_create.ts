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
  const eventObject = request.body as Body
  const {
    input: { email, id },
  } = eventObject
  const [InsertUser] = await loadFiles("lib/graphql/insert.graphql")
  const { insert_users_one } = await query<InsertUserMutation>(InsertUser, {
    email,
    id,
  })
  const response = { id: insert_users_one.id }
  reply.send(response)
}

export default index
