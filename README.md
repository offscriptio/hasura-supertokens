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

## Contributors

- [gusfune](https://github.com/gusfune)
- [leonardocsantoss](https://github.com/leonardocsantoss)
- [othiagocruz](https://github.com/othiagocruz)
