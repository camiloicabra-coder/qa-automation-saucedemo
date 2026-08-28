FROM cypress/included:15.4.0

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "test:e2e"]