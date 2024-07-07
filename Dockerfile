# frontend/Dockerfile

# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json into the container
COPY package.json package-lock.json ./

# Install any dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Serve the React app using serve
RUN npm install -g serve

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run the application
CMD ["serve", "-s", "build"]
