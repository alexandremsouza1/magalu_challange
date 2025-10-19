# Etapa 1 — Build da aplicação
FROM node:22.18.0 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY package*.json tsconfig*.json ./

# Instala as dependências (sem dev se não for ambiente de dev)
RUN npm install

# Copia o restante do código-fonte
COPY . .

# Compila o TypeScript
RUN npm run build

# Etapa 2 — Imagem final mais leve para rodar o app
FROM node:22.18.0-slim AS runner

WORKDIR /app

# Copia apenas o build e dependências necessárias
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Define a variável de ambiente padrão
ENV NODE_ENV=production
ENV PORT=4000

# Expõe a porta do Fastify
EXPOSE 4000

# Comando de inicialização
CMD ["npm", "start"]
