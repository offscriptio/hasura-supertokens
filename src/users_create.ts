import { FastifyRequest, FastifyReply } from "fastify"
import { InsertUserDocument, InsertUserMutation } from "lib/@types/graphql"
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
    const response = await query<InsertUserMutation>(InsertUserDocument, {
      email,
      id,
    })
    if (!response || !response.insert_users_one.id)
      throw new Error("Something went wrong")
    const res_id = response.insert_users_one.id
    reply.send({ id: res_id })
  } catch (err) {
    console.error(err)
    reply.statusCode = 500
    reply.send("Error")
  }
}

export default index
