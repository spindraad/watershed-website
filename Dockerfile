FROM node:20-bullseye-slim

ENV NODE_ENV=production

WORKDIR /watershed-website-app

ADD public /watershed-website-app/public
ADD build /watershed-website-app/build
ADD prisma /watershed-website-app/prisma
ADD node_modules /watershed-website-app/node_modules
ADD package.json /watershed-website-app/package.json

# Generate Prisma Client in the container environment
RUN npx prisma generate

CMD ["npm", "start"]
