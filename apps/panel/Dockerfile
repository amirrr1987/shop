# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@11.25.0 --activate
WORKDIR /app

FROM base AS pruner
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm exec turbo prune @shop/panel --docker

FROM base AS builder
ARG VITE_API_BASE=/api
ENV VITE_API_BASE=$VITE_API_BASE
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
RUN pnpm exec turbo run build --filter=@shop/panel

FROM nginx:1.27-alpine AS runner
COPY apps/panel/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/panel/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
