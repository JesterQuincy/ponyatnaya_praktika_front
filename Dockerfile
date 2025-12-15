# Этап сборки
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN ls -la
RUN test -f .prettierrc && echo "prettierrc OK" || (echo "NO .prettierrc" && exit 1)
RUN npx prettier -v
RUN npx prettier --find-config-path src/components/ui/button.tsx
RUN npm run build

# Этап выполнения
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app ./
EXPOSE 3330

CMD ["npm", "start -p 3300"]
