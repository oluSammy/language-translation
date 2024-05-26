FROM node:18-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json .

RUN npm install
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY src /app/src

# check files list
RUN ls -a

RUN npm install
RUN npm run build

CMD [ "node", "./dist/index.js" ]