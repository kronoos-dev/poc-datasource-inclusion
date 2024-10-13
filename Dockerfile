# Use the official Node.js image
# Dockerfile
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

RUN apt-get update -y && apt-get install -y openssl build-essential libpq-dev ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils

# Command to start the app.
CMD ["npm", "run", "start:dev"]