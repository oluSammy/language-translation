FROM node:20

COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build 
CMD ["node", "src/index.js"]