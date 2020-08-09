FROM node:12.6.0-slim

# See https://crbug.com/795759
# RUN apt-get update && apt-get install -yq libgconf-2-4
RUN npm install -g nodemon
RUN npm install -g jest
RUN useradd  --user-group --create-home --shell /bin/false --groups audio,video nodejs
RUN mkdir -p /home/nodejs/Downloads \
    && chown -R nodejs:nodejs /home/nodejs

ENV HOME=/home/nodejs
ENV NODE_ENV=production


COPY package.json package-lock.json $HOME/app/
RUN chown -R nodejs:nodejs $HOME/*
USER nodejs
WORKDIR $HOME/app
RUN npm install
