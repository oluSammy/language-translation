FROM node:18-alpine 

# Install dependency
COPY package*.json .
RUN npm install

COPY . .

RUN ls -a

RUN npm run build

CMD ["node", "dist/index.js"]