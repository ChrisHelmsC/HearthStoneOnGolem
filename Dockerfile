FROM node:15.13.0-slim
WORKDIR /usr/src/app

# Define required volumes
VOLUME /golem/input /golem/output

#Install node dependencies
COPY package*.json ./
RUN npm install

#Copy over source code
COPY . .

#Compile typescript to JS
RUN npm run build

#Temporary file copy to in volume
COPY ./in.file.json /golem/input