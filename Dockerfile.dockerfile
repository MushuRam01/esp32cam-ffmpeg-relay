FROM debian:bullseye

RUN apt update && apt install -y ffmpeg nodejs npm

WORKDIR /app
COPY . .

ENV NODE_ENV=production

RUN npm install

CMD ["node", "server.js"]
