FROM node:24-alpine

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./
COPY packages/shared/package.json ./packages/shared/
COPY web/package.json ./web/

RUN pnpm install --filter web... --filter @shop/shared

COPY packages/shared ./packages/shared
COPY web ./web

EXPOSE 3000

CMD ["pnpm", "--filter", "web", "run", "dev"]
