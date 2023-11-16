FROM node:current-alpine
WORKDIR /home/
RUN npm i -g serve
COPY index.html /home/
COPY *.js /home/
EXPOSE 3000
CMD serve
