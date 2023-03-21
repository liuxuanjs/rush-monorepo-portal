Feature 是指不需要发布的包，只在这个Monorepo中重复使用。

另外，这些包不需要构建，只需将package.json中的`main`字段替换为源代码条目，如 "src/index.tsx"。

只需配置主机应用的 webpack 配置来构建我们的features。
