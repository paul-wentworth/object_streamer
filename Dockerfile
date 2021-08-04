FROM node:14-alpine as react
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM node:14-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
RUN mkdir -p ./build
COPY --from=react /app/build/ ./build
CMD ["npm", "start"]