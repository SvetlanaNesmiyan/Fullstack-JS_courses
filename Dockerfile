# Використовуємо Alpine версію Node.js 20
FROM node:20-alpine

# Встановлюємо nodemon для hot-reload
RUN npm install -g nodemon

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо файли залежностей
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо решту файлів проекту
COPY . .

# Вказуємо, що додаток слухає порт 3000
EXPOSE 3000

# Команда для запуску додатка з nodemon для hot-reload
CMD ["nodemon", "src/server.js"]
