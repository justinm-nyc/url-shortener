FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
EXPOSE 3000
ENV HTTP_PROXY="http://express-mongo-api:80"
RUN npm i
CMD ["npm", "run", "start-for-docker"]