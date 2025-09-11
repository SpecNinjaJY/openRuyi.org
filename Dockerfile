FROM node
WORKDIR /opt/app
COPY . .
RUN npm install pnpm -g
RUN pnpm install
EXPOSE 801
CMD ["node", "server/app.js"]
