FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN apk add --no-cache dumb-init \
    && npm install -g corepack@latest \
    && corepack enable \
    && corepack prepare pnpm@10 --activate


WORKDIR /usr/src/app
# copio tutto dato che con il dockerignore ignoro i file non necessari
COPY . . 

RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]