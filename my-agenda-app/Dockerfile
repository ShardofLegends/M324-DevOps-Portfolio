# Wählen Sie das Basisimage
FROM node:14

# Arbeitsverzeichnis im Container setzen
WORKDIR /app

# Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# App-Quellcode in den Container kopieren
COPY . .

# Die Anwendung bauen
RUN npm run build

# Startkommando definieren
CMD ["node", "build"]
