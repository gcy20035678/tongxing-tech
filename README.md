# 砼行（宁波）智能科技有限公司 · 企业官网

无人机外立面清洗企业官网，纯静态站点（HTML / CSS / JS），无需构建、无需依赖，可直接部署到任意静态托管平台或服务器。

## 线上地址

- GitHub 仓库：https://github.com/gcy20035678/tongxing-tech
- 网站首页：https://gcy20035678.github.io/tongxing-tech/

## 技术栈

- 原生 HTML5 + CSS3 + JavaScript（无框架、无构建工具）
- 响应式设计，适配桌面端与移动端
- 科技蓝 `#2563EB` + 混凝土灰 设计系统

## 目录结构

```
tongxing-website/
├── index.html          首页
├── services.html       产品与服务
├── solutions.html      解决方案
├── cases.html          案例展示
├── contact.html        联系我们
├── css/style.css       统一样式
├── js/main.js          交互脚本
├── favicon.svg         站点图标
├── robots.txt          搜索引擎爬取规则
├── sitemap.xml         站点地图（SEO）
├── nginx.conf          Nginx 配置示例
├── Dockerfile          Docker 镜像构建
├── netlify.toml        Netlify 部署配置
└── vercel.json         Vercel 部署配置
```

## 本地预览

直接双击 `index.html` 即可在浏览器打开。

如需本地起一个 HTTP 服务（推荐，可完整测试相对路径与资源加载）：

```bash
# 使用 Python
python -m http.server 8000
# 或使用 Node
npx serve .
```

然后访问 http://localhost:8000 。

## 部署方式

### 方式一：云服务器（Nginx，国内常用）

1. 将站点文件上传至服务器（如 `/usr/share/nginx/html` 或 `/var/www/tongxing`）。
2. 编辑 `nginx.conf`，将 `your-domain.com` 替换为真实域名，并确保 `root` 指向站点目录。
3. 复制到 Nginx 配置目录并重载：

```bash
sudo cp nginx.conf /etc/nginx/conf.d/tongxing.conf
sudo nginx -t
sudo systemctl reload nginx
```

4. 域名解析到服务器 IP，并按需申请 HTTPS 证书（如使用 `certbot`）。

> 国内服务器需先完成 **ICP 备案**，请将页脚 `浙ICP备00000000号` 替换为真实备案号。

### 方式二：Docker 容器

```bash
docker build -t tongxing-website .
docker run -d -p 80:80 --name tongxing tongxing-website
```

### 方式三：静态托管平台（零成本、免运维）

| 平台 | 操作 |
| --- | --- |
| **GitHub Pages** | 将目录推送到 GitHub 仓库，在 Settings → Pages 选择分支即可 |
| **Netlify** | 拖拽目录到 Netlify 控制台，或用 `netlify.toml` 连接仓库自动部署 |
| **Vercel** | 连接 Git 仓库导入，自动识别静态站点 |
| **腾讯云 COS / 阿里云 OSS** | 开启「静态网站托管」，上传文件并绑定域名 |

## 部署前必改清单

上线前请替换以下占位信息（全局搜索关键词即可定位）：

- [ ] ICP 备案号 `浙ICP备00000000号`
- [ ] `sitemap.xml` / `robots.txt` 中的域名 `www.tongxing-tech.com`

> 电话（18989390904，手机微信同号）、邮箱（1751157014@qq.com）、地址（浙江省宁波市鄞州区恒创上谷b527室）已配置完成。
- [ ] 案例等示例文案

## 自定义

- **配色**：修改 `css/style.css` 顶部 `:root` 中的 CSS 变量即可全局换色。
- **文案/内容**：直接编辑各 HTML 页面。
- **新增页面**：复制任一页面，修改标题与正文，并在各页面的导航栏 `.nav` 和移动端 `.mobile-menu` 中加入对应链接。

---

© 2026 砼行（宁波）智能科技有限公司
