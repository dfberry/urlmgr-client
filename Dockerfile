#  $ docker build -t karma-chrome .
#  $ docker run -d -p 0.0.0.0:3000-3005:3000-3005 ng-e2e tail -f /dev/null
#  $ docker exec -it NUM /bin/bash

FROM markadams/chromium-xvfb-js:7

# open ports to host
EXPOSE 3000-3005:3000-3005

#user is docker with password docker, has access to sudo
RUN useradd -m docker && \
    echo "docker:docker" | chpasswd && \
    adduser docker sudo 
    
# set environment variable so protractor can find chrome
ENV CHROME_BIN=/usr/bin/chromium-browser 

# Update is used to resynchronize the package index files from their sources. An update should always be performed before an upgrade.
RUN apt-get update -qqy \
  && apt-get -qqy install \
    apt-utils \
    wget \
    sudo \
    curl \
    default-jre \
    git 

# Font libraries
    #ttf-ubuntu-font-family \
RUN apt-get update -qqy \
  && apt-get -qqy install \
    fonts-ipafont-gothic \
    xfonts-100dpi \
    xfonts-75dpi \
    xfonts-cyrillic \
    xfonts-scalable \
    libfreetype6 \
    libfontconfig

# Clean clears out the local repository of retrieved package files. Run apt-get clean from time to time to free up disk space.
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Angular Cli
RUN npm install --unsafe-perm -g @angular/cli

# Install Protractor
# Jasmine and protractor global install
# 2. Step to fixing the error for Node.js native addon build tool (node-gyp)
# https://github.com/nodejs/node-gyp/issues/454
RUN npm install --unsafe-perm -g protractor && \
# Get the latest Google Chrome driver
  npm update && \
# Get the latest WebDriver Manager
  webdriver-manager update

# Global reporters for protractor
RUN npm install --unsafe-perm -g \
    jasmine \
    jasmine-reporters \
    jasmine-spec-reporter \
    protractor-jasmine2-html-reporter \
    jasmine-allure-reporter \
    protractor-console

WORKDIR /usr/src/app/

# install yarn & webpack ng2 starter (has e2e test inside)
RUN npm install -g yarn && \
    git clone https://github.com/AngularClass/angular2-webpack-starter && \
    cd angular2-webpack-starter && \
    yarn install

ENV CHROME_BIN=/usr/bin/chromium-browser

WORKDIR /usr/src/app/
