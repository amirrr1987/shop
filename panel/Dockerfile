FROM node:24-alpine

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./
COPY packages/shared/package.json ./packages/shared/
COPY panel/package.json ./panel/

RUN pnpm install --filter panel... --filter @shop/shared

COPY packages/shared ./packages/shared
COPY panel ./panel

EXPOSE 3001

CMD ["pnpm", "--filter", "panel", "run", "dev"]
