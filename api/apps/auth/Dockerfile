FROM node:18-bullseye-slim

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

CMD npm run start auth
