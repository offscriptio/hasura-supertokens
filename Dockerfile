FROM node:14-alpine3.13
ENV NODE_ENV production

# Env variables
ENV SUPERTOKENS_DOMAIN=https://something-goes-here-us-east-1.aws.supertokens.io:3567
ENV SUPERTOKENS_API_KEY=your-super-secret-supertokens-key
ENV HASURA_GRAPHQL_ADMIN_SECRET=your-super-secret-key
ENV HASURA_GRAPHQL_URL=https://offscript-dev.hasura.app/v1/graphql
ENV SERVICES_ROOT=https://this-service-url.com

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY yarn.lock ./
COPY yarnclean ./.yarnclean
COPY .npmrc ./.npmrc

RUN yarn install --frozen-lockfile && yarn autoclean --force

# Bundle app source
COPY .build ./

EXPOSE 3000
CMD [ "node", "index.js" ]