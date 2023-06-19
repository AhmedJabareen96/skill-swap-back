FROM node:16.20.0-alpine3.18
WORKDIR /skill-swap-from
RUN apk update && apk add git
RUN git clone https://github.com/AhmedJabareen96/skill-swap-back.git .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]