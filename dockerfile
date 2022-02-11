FROM maven:3.8.4-jdk-8-slim as combiner
WORKDIR /app
COPY ./combiner .
RUN mvn install


FROM node:16.14.0-alpine3.14 as web
RUN apk add openjdk8
WORKDIR /app
COPY ./web .
RUN npm install
COPY --from=combiner /app/target/uniprofile-1.0.jar /app/server
ENTRYPOINT npm start
