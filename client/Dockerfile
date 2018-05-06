# docker build -t spellbound-react .
# docker run -p 3000:3000 -d spellbound-react

FROM node:carbon

ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install
# If you are building your code for production
RUN npm install --only=production

# EXPOSE 3000
# CMD [ "npm", "start" ]
