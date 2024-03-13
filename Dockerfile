#  development
FROM node:18-alpine AS development
WORKDIR /app
COPY --chown=node:node package.json ./
RUN yarn install
COPY --chown=node:node . .
RUN yarn account:generate
RUN yarn member:generate
USER node

# production builder
FROM node:18-alpine AS build
WORKDIR /app
COPY --chown=node:node package.json ./
RUN yarn install
COPY --chown=node:node . .
## build account
RUN yarn account:generate
RUN yarn account:build 
## build member
RUN yarn member:generate
RUN yarn member:build
## build gateway
RUN yarn gateway:build
ENV NODE_ENV=production
RUN yarn install --production && yarn cache clean

# production
FROM build AS production
WORKDIR /app
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/package.json ./
ENV NODE_ENV=production