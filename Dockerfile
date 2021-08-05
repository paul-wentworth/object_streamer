# "Production" (static hosting of React app) image

# Build React app for production
FROM node:14-alpine as react
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Setup Node.js image and pull in React app static files
FROM node:14-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
RUN mkdir -p ./build
COPY --from=react /app/build/ ./build
CMD ["npm", "start"]