FROM node:15.13.0-slim
WORKDIR /usr/src/app

#Install node dependencies
COPY package*.json ./
RUN npm install

#Copy over source code
COPY . .

#Compile typescript to JS
RUN npm run build

#Run js server
CMD [ "node", "./dist/index.js" ]