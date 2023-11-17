FROM nginx:stable-alpine
COPY dist ./usr/share/nginx/html
EXPOSE 80
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
CMD nginx
