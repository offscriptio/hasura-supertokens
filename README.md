# hasura-supertokens

Open source implementation of [Supertokens](https://supertokens.io/) with [Hasura](https://hasura.io/).

This is an ongoing project and implementation used by [Off Script](https://offscript.io).

## How to use

You can run this either compiling and running locally or you can just use our [public docker image](https://hub.docker.com/r/offscript/hasura-supertokens).
Make sure you have the correct environment variables in place.

## How to set up on Hasura

- Make sure you have a public table for users that has at least the rows ID (uuid), email (text) and role.
- Add the following environment variables:
  - `HASURA_GRAPHQL_AUTH_HOOK` pointing to this service URL.
  - `HASURA_GRAPHQL_AUTH_HOOK_MODE` and set it to `POST`.
  - `AUTH_URL` and point it to your hasura-supertokens service.
- Check the directory `/hasura` to see how to structure the database for the tables `user` and `roles`.
- Make sure you add an action to create user that will be called by the service.

## How to set up the environment

You will need to setup environment variables to run docker or locally hasura-supertokens. Those are:

- SUPERTOKENS_DOMAIN
- SUPERTOKENS_API_KEY
- HASURA_GRAPHQL_ADMIN_SECRET
- HASURA_GRAPHQL_URL
- SERVICES_ROOT

⚠️ Because hasura-supertokens needs to use your ADMIN_SECRET to create user and assign the role, it's recommended that you only run the service not exposed to the web. ⚠️

## How to test it

Running from the `docker-compose.yaml` located in the hasura demo folder, you can run the following command to test:

```curl
curl --location --request POST 'http://localhost:3000/users/create' \
--header 'x-hasura-user-id: 123' \
--header 'Content-Type: application/json' \
--data-raw '{
    "input": {
        "id": "gus@offscript.io",
        "email": "gus@offscript.io"
    }
}'
```

## Contributors

- [gusfune](https://github.com/gusfune)
- [leonardocsantoss](https://github.com/leonardocsantoss)
- [othiagocruz](https://github.com/othiagocruz)
