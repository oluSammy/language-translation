FROM ghcr.io/puppeteer/puppeteer:22.10.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app
USER root
COPY package*.json ./

RUN chown -R pptruser:pptruser /usr/src/app
USER pptruser
RUN npm install

RUN chown -R pptruser:pptruser /usr/src/app

RUN npm i

USER root
COPY . .

RUN chown -R pptruser:pptruser /usr/src/app
USER pptruser
RUN npm run build
CMD ["node", "src/index.js"]