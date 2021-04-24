export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  bigint: number
  date: string
  inet: any
  json: object
  jsonb: object
  numeric: number
  oid: any
  timestamp: string
  timestamptz: string
  uuid: string
}

export type GetUserQueryVariables = Exact<{
  id: Scalars["String"]
}>

export type GetUserQuery = {
  users: Array<Pick<Users, "role">>
}

export type InsertUserMutationVariables = Exact<{
  email: Scalars["String"]
  id: Scalars["String"]
}>

export type InsertUserMutation = {
  insert_users_one?: Maybe<Pick<Users, "email" | "id">>
}
