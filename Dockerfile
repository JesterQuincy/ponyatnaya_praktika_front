# Этап сборки
FROM node:21.6 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Этап выполнения
FROM node:21.6-alpine
WORKDIR /app
COPY --from=build /app ./
EXPOSE 3330

CMD ["npm", "start -p 3300"]
