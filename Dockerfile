FROM ghcr.io/puppeteer/puppeteer:22.10.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./

RUN chown -R pptruser:pptruser /usr/src/app && npm install

RUN chown -R pptruser:pptruser /usr/src/app

RUN npm i
COPY . .
RUN npm run build 
CMD ["node", "src/index.js"]