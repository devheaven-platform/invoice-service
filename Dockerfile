FROM node:9.6.1-alpine

# Set working directory
WORKDIR /app

# Set env
ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json /app/package.json
RUN npm config set unsafe-perm true
RUN npm install --silent --production

# Copy source
COPY . /app

# Expose port
EXPOSE 8080

# Start server
CMD [ "npm", "start" ]
