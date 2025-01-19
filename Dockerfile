FROM node:latest

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i -g pnpm && pnpm i

COPY . .

EXPOSE 8081

CMD ["pnpm", "dev"]