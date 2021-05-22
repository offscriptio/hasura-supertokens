import * as supertokens from "supertokens-node"
import * as Session from "supertokens-node/recipe/session"
import { FastifyRequest, FastifyReply } from "fastify"
import { GetUserQuery } from "lib/@types/graphql"
import { query } from "./query"

import { loadFiles } from "@graphql-tools/load-files"

interface User {
  "x-hasura-role": string
  "x-hasura-user-id"?: string
}

interface Body {
  headers: {
    "x-hasura-user-id": string
    "x-hasura-session-handle"?: string
    "x-hasura-role"?: string
  }
}

const index = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const eventObject = request.body as Body
  const [GetUser] = await loadFiles("lib/graphql/get.graphql")
  // Init supertokens
  supertokens.init({
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_DOMAIN,
      apiKey: process.env.SUPERTOKENS_API_KEY,
    },
    appInfo: {
      appName: "Hasura Supertokens",
      apiDomain: process.env.SERVICES_ROOT,
      websiteDomain: process.env.SERVICES_ROOT,
      apiBasePath: "/",
    },
    isInServerlessEnv: true,
    recipeList: [Session.init()],
  })
  let response: User = {
    "x-hasura-role": "anonymous",
  }
  const id = eventObject.headers
    ? eventObject.headers["x-hasura-user-id"]
    : null
  try {
    // Checks for if, in none, it's anonymous
    if (id) {
      const handle = eventObject.headers["x-hasura-session-handle"]
      const request_role = eventObject.headers["x-hasura-role"]
      const { users } = await query<GetUserQuery>(GetUser, { id })
      // Check if user is found, is none, it's anonymous
      if (users[0]) {
        const role = users[0].role
        const session = await Session.getAllSessionHandlesForUser(id)
        // Check if there is an existing session
        if (session.length > 0 || session.indexOf(handle) !== -1) {
          const hasuraVariables = {
            "x-hasura-role":
              request_role !== "user" && request_role === role ? role : "user",
            "x-hasura-user-id": id,
          }
          response = hasuraVariables
        }
      }
    }
  } catch (error) {
    console.log(error)
  } finally {
    reply.send(response)
  }
}

export default index
