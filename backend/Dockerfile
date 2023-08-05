# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS development

# Set the NODE_ENV
ENV NODE_ENV development

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json .

# Install dependencies
RUN npm ci

# Copy the rest of the application files to the container
COPY . .

# Generate prisma client
RUN npx prisma generate

EXPOSE 3000

# Set the command to start the server using the $PORT environment variable
CMD ["npm", "run", "start:dev"]

