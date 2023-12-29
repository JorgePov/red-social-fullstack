FROM node:18.19-alpine

EXPOSE 4200

ARG PROJ_DIR=/usr/src/app

RUN mkdir -p ${PROJ_DIR}

COPY ./frontend ${PROJ_DIR}

WORKDIR ${PROJ_DIR}

RUN ["chmod", "+x", "./entrypoint.sh"]

ENTRYPOINT ["sh", "./entrypoint.sh"]
