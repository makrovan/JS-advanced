FROM node:current-alpine

WORKDIR /home/

RUN npm i -g serve

COPY . /home/

EXPOSE 3001

CMD serve -p 3001
