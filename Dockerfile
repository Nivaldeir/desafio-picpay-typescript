FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env /usr/app/.env
RUN npx prisma generate

RUN npm run build
# RUN npx prisma db push

EXPOSE 3000

CMD ["node", "dist/index.js"]