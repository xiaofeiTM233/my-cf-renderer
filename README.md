# my-cf-renderer | Cloudflare Browser Rendering Example

一个基于 [Cloudflare Workers](https://workers.cloudflare.com/) 的高性能图片渲染服务，支持 HTML 模板 + JSON 数据渲染为 PNG/Base64 格式。

该项目利用了 Cloudflare 的边缘网络，支持无服务器部署，具有高可用性和可扩展性，为不便自部署 [Browserless](https://github.com/browserless/browserless) 的 [Puppeteer](https://github.com/puppeteer/puppeteer) 用户提供了一个简单、高效的解决方案。

## ✨ 功能特性

- **动态图片生成**: 支持 HTML/CSS/JS 模板 + JSON 数据动态生成图片。
- **无服务器架构**: 部署在 Cloudflare Workers 边缘网络，无需管理服务器，按需付费~~或白嫖~~。
- **高性能渲染**: 利用 Cloudflare 优化的浏览器渲染服务（基于 Puppeteer），确保渲染结果准确可靠。
- **多输出格式**: API 支持返回原始的 PNG 图片二进制流 (`buffer`) ，或返回一个包含 Base64 编码图片数据的 JSON 对象。
- **简单的 API**: 单 POST 请求完成渲染，易于集成。

## 🛠️ 技术栈

- **运行时**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **浏览器渲染**: [Cloudflare Browser Rendering](https://developers.cloudflare.com/browser-rendering/)、[Puppeteer](https://github.com/puppeteer/puppeteer)
- **模板引擎**: [Mustache](https://github.com/janl/mustache.js)
- **部署工具**: [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **测试**: [Apifox](https://www.apifox.cn/)

## 📚 说明

本 README 文档由 AI 辅助生成。如有技术细节需要补充，请提交 Issue 或[与我联系](https://github.com/xiaofeiTM233)！
