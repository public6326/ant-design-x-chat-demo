# 🤖 Ant Design X Chat Demo

基于 Ant Design X 的 AI 聊天界面演示项目

## ✨ 项目特性

- 🎨 **现代化 UI**: 基于 Ant Design X 的聊天组件
- 🌊 **流式响应**: 支持实时显示 AI 回复内容
- 🔗 **API 集成**: 支持多种 AI 服务（阿里云通义千问、OpenAI 等）
- 📱 **响应式设计**: 适配不同屏幕尺寸
- 🛠️ **TypeScript**: 完整的类型支持
- 📚 **完整文档**: 包含配置指南和接入文档

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 配置 API

1. 复制 `.env.example` 到 `.env`
2. 填入您的 API 配置：

```bash
REACT_APP_API_BASE_URL=你的API地址
REACT_APP_API_KEY=你的API密钥
REACT_APP_MODEL_NAME=模型名称
```

### 启动项目

```bash
npm start
```

项目将在 [http://localhost:3001](http://localhost:3001) 运行

## 📖 文档

- [API 配置说明](./docs/API配置说明.md)
- [真实 API 接入指南](./docs/真实API接入指南.md)
- [需求文档目录](./docs/需求文档目录.md)

## 🏗️ 技术栈

- **React 18** - 用户界面框架
- **TypeScript** - 类型安全
- **Ant Design X** - 聊天组件库
- **Create React App** - 项目脚手架

## 📦 核心组件

- `useXAgent` - 处理请求逻辑
- `useXChat` - 管理聊天状态
- `XRequest` - API 客户端
- `Sender` - 消息输入组件
- `Bubble.List` - 消息显示组件

## 🔧 可用脚本

- `npm start` - 启动开发服务器
- `npm test` - 运行测试
- `npm run build` - 构建生产版本
- `npm run eject` - 弹出配置文件

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
