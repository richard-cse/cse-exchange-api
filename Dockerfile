FROM node:10

WORKDIR "/app"

COPY package.json /app

RUN npm install

COPY . /app

ENV MONGO_URL=""
ENV NODE_ENV=""

CMD npm run prod:start

EXPOSE 8545
