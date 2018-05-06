# docker build -t spellbound-react .
# docker run -p 3000:3000 -d spellbound-react

FROM node:alpine

ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory
WORKDIR /app

# Bundle app source
COPY . /app
COPY package.json /app
COPY yarn.lock /app
COPY .env.example /app/.env

RUN yarn now-build

EXPOSE 443
CMD yarn now-start
