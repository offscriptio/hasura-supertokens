import fetch from "node-fetch"

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
  const headers = {
    "Content-Type": "application/json",
    "Hasura-Client-Name": "hasura-supertokens",
  }
  headers["X-Hasura-Admin-Secret"] = process.env.HASURA_GRAPHQL_ADMIN_SECRET
  const fetchResponse = await fetch(process.env.HASURA_GRAPHQL_URL, {
    method: "POST",
    headers,
    body: stringify({
      query,
      variables,
    }),
  })
  const result = await fetchResponse.json()
  if (result.errors) {
    throw stringify(result.errors)
  }

  return result.data as T
}

export { query }
