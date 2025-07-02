import React from "react";
import { Bubble, Sender, useXAgent, useXChat, XRequest } from "@ant-design/x";
import { Card, ConfigProvider, theme } from "antd";
import "./App.css";

const API_CONFIG = {
  baseURL:
    process.env.REACT_APP_API_BASE_URL ||
    "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",

  apiKey:
    process.env.REACT_APP_API_KEY || "sk-b1b8c5d4b426430bb9f4c834c8147dde",

  model: process.env.REACT_APP_MODEL_NAME || "qwen-plus",

  // 可选参数
  maxTokens: parseInt(process.env.REACT_APP_MAX_TOKENS || "2000"),
  temperature: parseFloat(process.env.REACT_APP_TEMPERATURE || "0.7"),
  topP: parseFloat(process.env.REACT_APP_TOP_P || "1"),
};

const xRequestClient = XRequest({
  baseURL: API_CONFIG.baseURL,
  dangerouslyApiKey: API_CONFIG.apiKey,
  model: API_CONFIG.model,
});

function App() {
  const [agent] = useXAgent({
    request: async (info, callbacks) => {
      const { message } = info;
      const { onUpdate, onSuccess, onError } = callbacks;

      // 确保message存在
      if (!message) {
        return;
      }

      let content = "";
      xRequestClient.create(
        {
          messages: [{ role: "user", content: message }],
          stream: true,
          max_tokens: API_CONFIG.maxTokens,
          temperature: API_CONFIG.temperature,
          top_p: API_CONFIG.topP,
        },
        {
          onUpdate: (chunk: any) => {
            console.log("chunk：", chunk.data);
            // 检查是否是结束标记
            if (chunk.data.includes("[DONE]")) {
              return;
            }

            const data = JSON.parse(chunk.data);
            const deltaContent = data?.choices?.[0]?.delta?.content || "";
            if (deltaContent) {
              content += deltaContent;
              (onUpdate as any)(content);
            }
          },
          onSuccess: (chunks: any) => {
            console.log("请求完成，接收到的数据块:", chunks);
            (onSuccess as any)(content);
          },
          onError: (error: any) => {
            console.error("API调用失败:", error);
            onError(error);
          },
        }
      );
    },
  });

  const { onRequest, messages } = useXChat({ agent });

  const items = messages.map(({ id, message, status }) => ({
    key: id,
    content: message,
    placement: (status === "local" ? "end" : "start") as "end" | "start",
    avatar:
      status === "local"
        ? { style: { backgroundColor: "#1890ff" }, children: "我" }
        : { style: { backgroundColor: "#52c41a" }, children: "AI" },
    styles: {
      content: {
        backgroundColor: status === "local" ? "#1890ff" : "#f6f6f6",
        color: status === "local" ? "white" : "black",
      },
    },
  }));

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1890ff",
        },
      }}
    >
      <div
        className="App"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f0f2f5",
          padding: "20px",
        }}
      >
        <Card
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          styles={{
            body: {
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "16px",
            },
          }}
        >
          <div style={{ flex: 1, marginBottom: "16px", overflow: "auto" }}>
            {messages.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#999",
                  marginTop: "50px",
                  fontSize: "16px",
                }}
              >
                开始与AI对话吧！在下方输入您的问题...
              </div>
            ) : (
              <Bubble.List items={items} />
            )}
          </div>

          <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "16px" }}>
            <Sender
              onSubmit={onRequest}
              placeholder="请输入您的问题..."
              style={{ backgroundColor: "white" }}
            />
          </div>
        </Card>
      </div>
    </ConfigProvider>
  );
}

export default App;
