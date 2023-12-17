FROM node:18-alpine

#WORKDIR /app
WORKDIR /app/frontend/
#COPY . .
COPY package.json /app/frontend/

RUN npm install
# Copia el resto de la aplicación
# RUN npm i @rollup/rollup-linux-x64-musl --save-optional
# RUN npm i @rollup/rollup-linux-x64-gnu
COPY . .

# Expone el puerto en el que se ejecuta la aplicación React
EXPOSE 5173

# CMD ["rm", "package-lock.json"]
# CMD ["rm", "-rf", "node_modules"]
# CMD ["npm", "i"]
# CMD ["npm", "run", "dev"]

#ENTRYPOINT ["rm", "package-lock.json", "rm", "-rf", "node_modules", "npm", "install"]
ENTRYPOINT ["npm", "run", "dev", "--", "--host"]

# FROM node:16-alpine

# WORKDIR /app/frontend/

# COPY package*.json /app/frontend/
# RUN npm install

# COPY . /app/frontend/

# CMD ["npm", "start"]