import { GraphQLClient } from "graphql-request"

function stringify(value) {
  if (value !== undefined) {
    return JSON.stringify(value, (_, v) =>
      typeof v === "bigint" ? v.toString() : v
    )
  }
}

const query = async <T>(query: string, variables: object): Promise<T> => {
  /*
    Function to make a call to Hasura.
  */
  const endpoint = process.env.HASURA_GRAPHQL_URL as string
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      "X-Hasura-Admin-Secret": process.env
        .HASURA_GRAPHQL_ADMIN_SECRET as string,
      "Hasura-Client-Name": "hasura-supertokens",
    },
  })
  const result = await graphQLClient.request(query, variables)
  if (result.errors) {
    throw stringify(result.errors)
  }

  return result.data as T
}

export { query }
