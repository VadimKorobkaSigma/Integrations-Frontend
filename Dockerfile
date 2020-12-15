# nginx state for serving content
FROM nginx:stable-alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets
COPY build .
COPY cert.crt cert.key /usr/share/certificates/
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 3000
EXPOSE 3000
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
