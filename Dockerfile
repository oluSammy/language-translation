FROM node:20
WORKDIR /usr/yourapplication-name
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "./dist/index.js"]