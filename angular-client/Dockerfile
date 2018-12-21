# Create image based on the official Node 8 image from dockerhub
FROM node:latest

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Copy dependency definitions
RUN npm install -g npm
COPY package.json /usr/src/app

# Get all the code needed to run the app
COPY . /usr/src/app

# Install dependecies
RUN npm --unsafe-perm=true install

# Expose the port the app runs in
EXPOSE 4200

# Serve the app
CMD ["npm", "start"]