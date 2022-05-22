FROM registry.suse.com/bci/nodejs

RUN zypper in make gcc python39

COPY . .

RUN npm install
CMD npm start