FROM node:current-alpine
WORKDIR /home/
RUN npm i -g serve
COPY index.html.js /home/
COPY card.js /home/
COPY index.html /home/
EXPOSE 3000
CMD serve
