# Glytics - Analytics for Games

![image](https://github.com/HarshDeswal/glytics-frontend/assets/94471009/24aa458b-7fc7-49fe-84fc-457dcb657b19)


## Prerequisites:

1. Node.js and npm (or yarn) installed on your system.
2. Docker installed on your system. You can find installation instructions at https://docs.docker.com/engine/install/.

## Getting Started:

Clone the repository:

Bash

`git clone https://github.com/HarshDeswal/glytics-frontend.git`

`cd glytics-frontend`

## Install dependencies:

Bash

`npm install`

## Build the React application:

Bash

`npm run build`

## (Optional) Run the application locally:

Bash

`npm start`

This will start a development server for your React application at http://localhost:3000 by default.

Using Docker:

## Build the Docker image:

Bash

`docker build -t your-username/your-app-name` .

## Run the Docker container:

Bash

`docker run -p 5000:5000 your-username/your-app-name`

This will run a Docker container with your React application exposed on port 5000 of the host machine.

