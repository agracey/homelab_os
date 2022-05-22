FROM registry.suse.com/bci/nodejs

RUN zypper -n in make gcc python39 iputils wol

COPY . .

RUN npm install
CMD npm start