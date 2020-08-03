FROM node:12 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
FROM nginx:alpine
RUN echo $BFF
COPY --from=node /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
