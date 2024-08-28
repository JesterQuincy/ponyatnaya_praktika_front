FROM node:21.6 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build