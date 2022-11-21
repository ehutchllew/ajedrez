FROM node:alpine

WORKDIR "/app"

COPY package.json ./

RUN yarn install
RUN yarn build

COPY ./dist ./dist

CMD ["yarn", "start"]