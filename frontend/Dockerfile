# Etapa 1 — Build do app React/Vite
FROM node:22.18.0 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas arquivos de dependências primeiro (para cache eficiente)
COPY package*.json tsconfig*.json vite.config.* ./

# Instala dependências sem dev
RUN npm install --omit=dev

# Copia o restante do projeto
COPY . .

# Build de produção (gera /dist)
RUN npm run build

# Etapa 2 — Servindo via Nginx
FROM nginx:1.27.2-alpine AS runner

# Remove configuração padrão e copia a customizada
RUN rm /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos da build do Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta
EXPOSE 80

# Comando padrão
CMD ["nginx", "-g", "daemon off;"]
