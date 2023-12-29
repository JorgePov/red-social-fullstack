FROM node:18.19-alpine

EXPOSE 3000

ARG PROJ_DIR=/usr/src/api
RUN mkdir -p "${PROJ_DIR}"

RUN mkdir -p ${PROJ_DIR}

COPY ./backend ${PROJ_DIR}

WORKDIR ${PROJ_DIR}

RUN ["chmod", "+x", "./entrypoint.sh"]

ENTRYPOINT ["sh", "./entrypoint.sh"]
