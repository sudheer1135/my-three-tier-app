FROM gradle:7.6.4-jdk17-alpine AS BUILD

WORKDIR /app

COPY . .

RUN gradle clean bootJar --no-daemon -x test

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

ENV PORT=8080
ENV DATABASE_HOST=mysql-db
ENV DATABASE_PORT=3306
ENV DATABASE_NAME=bookDatabase

COPY --from=BUILD /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD java -Dserver.port=$PORT -jar app.jar --spring.datasource.url=jdbc:mysql://$DATABASE_HOST:$DATABASE_PORT/$DATABASE_NAME
