FROM ghcr.io/puppeteer/puppeteer:16.1.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable


WORKDIR /usr/src/app

COPY package.json ./
RUN npm ci
RUN npm run tsc

COPY . .
CMD ["node", "dist/index.js"]

