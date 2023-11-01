# Stage 1: Build the application
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Create a smaller production image
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy only package.json to install dependencies
COPY --from=build /usr/src/app/package*.json ./

# Copy node_modules from the build stage
COPY --from=build /usr/src/app/node_modules ./node_modules

# Copy the production build
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3001

CMD [ "node", "dist/main.js" ]
