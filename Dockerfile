# Dockerfile
# Use the official Node.js image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Install `tsx` globally to enable watch mode
RUN npm install -g tsx

# Copy the rest of the application code.
COPY . .

# Expose port 3333 for the app
EXPOSE 3333

# Expose port 5432 for the db
EXPOSE 5432

RUN apt-get update -y && apt-get install -y openssl build-essential libpq-dev

# Command to start the app.
CMD ["npm", "run", "start:dev"]