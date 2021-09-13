import { DocumentNode } from "graphql"
import { GraphQLClient } from "graphql-request"

const stringify = (value: unknown) => {
  if (value !== undefined) {
    return JSON.stringify(value, (_, v) =>
      typeof v === "bigint" ? v.toString() : v
    )
  }
}

/**
 * Performs a GraphQL operation in hasura
 *
 * @param query - The query or mutation to perform
 * @param variables - Any variables needed to pass
 * @return - The result of the operation
 */
const query = async <Type>(
  query: DocumentNode,
  variables: object
): Promise<Type> => {
  try {
    const endpoint = process.env.HASURA_GRAPHQL_URL as string
    const secret = process.env.HASURA_GRAPHQL_ADMIN_SECRET as string
    const client = new GraphQLClient(endpoint, {
      headers: {
        "X-Hasura-Admin-Secret": secret,
        "Hasura-Client-Name": "hasura-supertokens",
      },
    })
    const result = await client.request(query, variables)
    if (result.errors) {
      throw stringify(result.errors)
    }
    return result as Type
  } catch (err) {
    console.error(err)
  }
}

export { query }
