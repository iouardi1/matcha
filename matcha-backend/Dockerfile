FROM node:20-bullseye

RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    apt-get clean

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY .env .

RUN pip3 install psycopg2-binary Faker requests python-dotenv

COPY . .

EXPOSE 3005

CMD ["npm", "run", "start"]