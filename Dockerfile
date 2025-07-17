FROM node:alpine as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install
RUN npm run build

# Renombra index.csr.html si existe
RUN if [ -f /usr/local/app/dist/ciclos-de-vida/browser/index.csr.html ]; then mv /usr/local/app/dist/ciclos-de-vida/browser/index.csr.html /usr/local/app/dist/ciclos-de-vida/browser/index.html; fi

FROM nginx:1.24.0

COPY --from=build /usr/local/app/dist/ciclos-de-vida/browser /usr/share/nginx/html
COPY ./nginx/default.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80