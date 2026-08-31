FROM node:24-alpine

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./
COPY packages/shared/package.json ./packages/shared/
COPY api/package.json ./api/

RUN pnpm install --filter api... --filter @shop/shared

COPY packages/shared ./packages/shared
COPY api ./api

EXPOSE 3002

CMD ["pnpm", "--filter", "api", "run", "start:dev"]
