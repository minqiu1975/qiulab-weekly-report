# ============================================================
# QLab-WID Frontend - Next.js 应用 Docker 镜像
# 多阶段构建：编译阶段 + 运行阶段
# ============================================================

# --- 构建阶段 ---
FROM node:20-alpine AS builder

WORKDIR /app

# 安装依赖（利用 Docker 缓存）
COPY package*.json ./
RUN npm ci --only=production

# 复制源码并构建
COPY . .
RUN npm run build

# --- 运行阶段 ---
FROM nginx:alpine

# 安装安全更新
RUN apk update && apk upgrade && apk add --no-cache curl

# 复制构建产物到 Nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制自定义 Nginx 配置
COPY nginx-frontend.conf /etc/nginx/conf.d/default.conf

# 创建自定义错误页面目录
RUN mkdir -p /usr/share/nginx/html/errors

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
