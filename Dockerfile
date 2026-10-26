# 砼行智能 — Docker 镜像（nginx:alpine 托管静态站点）
FROM nginx:alpine

# 拷贝站点源码到 Nginx 默认站点目录
COPY . /usr/share/nginx/html

# 使用自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# 构建与运行：
#   docker build -t tongxing-website .
#   docker run -d -p 80:80 --name tongxing tongxing-website
