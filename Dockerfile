FROM maven:3.3.9-jdk-8-alpine as combiner

WORKDIR /app/
COPY ./combiner/ ./
RUN mvn install


FROM node:7.7.1-alpine as web

WORKDIR /app/
COPY --from=combiner /app/target/uniprofile-1.0.jar /app/server/uniprofile-1.0.jar
COPY ./web/ ./
RUN apk add --update --no-cache openjdk8-jre
RUN npm install

EXPOSE 8080
ENTRYPOINT ["npm" ]
CMD ["start"]
