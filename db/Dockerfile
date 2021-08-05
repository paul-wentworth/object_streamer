# Postgresql image with database initialization
FROM postgres:latest

ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=object_streamer

WORKDIR /docker-entrypoint-initdb.d

COPY ./setup.sql ./

RUN chown postgres:postgres ./setup.sql
