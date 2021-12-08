FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
EXPOSE 80
RUN npm i
CMD ["node", "server.js"]