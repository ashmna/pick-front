FROM nginx:latest

COPY build /usr/share/nginx/html/
RUN mv /usr/share/nginx/html/config-production.js /usr/share/nginx/html/config.js
