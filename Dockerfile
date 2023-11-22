# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --ignore-scripts

COPY . .

RUN npm run build


RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser

EXPOSE 3001

CMD [ "node", "dist/main.js" ]
