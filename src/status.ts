import { FastifyRequest, FastifyReply } from "fastify"

const index = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  reply.send({ status: true })
}

export default index
