# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS development

RUN apk add --update --no-cache openssl1.1-compat

# Set the NODE_ENV
ENV NODE_ENV development

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy the rest of the application files to the container
COPY . .

# Generate prisma client
RUN npx prisma generate

RUN ["npx", "nest", "build"]

FROM node:18-alpine

COPY --from=development /app/dist/ /app/

CMD ["node", "/app/main.js"]