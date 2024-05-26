FROM node:20

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app/
RUN npm run build
CMD ["node", "./dist/index.js"]