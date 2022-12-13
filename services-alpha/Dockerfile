FROM node:16.18.1-bullseye-slim

WORKDIR /app

COPY ./package.json ./
RUN yarn install
COPY ./ ./

CMD ["yarn", "start"]