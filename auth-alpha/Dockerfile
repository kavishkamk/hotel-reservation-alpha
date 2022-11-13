FROM node:16.18.1-bullseye-slim

WORKDIR /app

COPY ./package.json ./
RUN yarn install --production
COPY ./ ./

CMD ["yarn", "start"]