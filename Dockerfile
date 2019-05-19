FROM node:10-slim

# Set working directory
WORKDIR /app

# Set env
ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH

# Install chrome puppeteer
RUN  apt-get update \
     && apt-get install -y wget --no-install-recommends \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     && apt-get install -y google-chrome-unstable --no-install-recommends \
     && rm -rf /var/lib/apt/lists/* \
     && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
     && chmod +x /usr/sbin/wait-for-it.sh

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
