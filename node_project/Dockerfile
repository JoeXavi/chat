FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./ /usr/src/app

ENV NODE_ENV=development

EXPOSE 3000
