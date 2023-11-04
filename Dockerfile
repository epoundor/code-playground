# build stage
FROM node:18-alpine as build-stage
RUN npm install -g pnpm
WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY . .
# RUN cd apps/frontend 
RUN pnpm install
RUN pnpm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY /default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage app/dist /usr/share/nginx/html
EXPOSE 80