# USED for Karma Chrome tests only

#  $ docker build -t karma-chrome .
#  $ docker start NUM
#  $ docker run -d -p 0.0.0.0:3000-3005:3000-3005 -p 5858:5858 -v /Users/dfberry/repos/urlmgr:/home/docker karma-chrome tail -f /dev/null
#  $ docker exec -it NUM /bin/bash

FROM markadams/chromium-xvfb-js:7

EXPOSE 3000-3005:3000-3005

RUN useradd -m docker && \
    echo "docker:docker" | chpasswd && \
    adduser docker sudo 

WORKDIR /usr/src/app/

#RUN npm install yarn
#COPY package.json package.json
#COPY yarn.lock yarn.lock
#RUN ./node_modules/.bin/yarn install
#COPY . /usr/src/app