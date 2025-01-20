FROM node:20

WORKDIR /home/node/app

COPY . .

RUN npm i

RUN npx tsc

EXPOSE 8081

CMD ["node", "./build/index.js"]