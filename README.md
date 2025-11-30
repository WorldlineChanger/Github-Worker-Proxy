# Github-Worker-Proxy
# GitHub 代理服务

## 项目概述

这是一个基于Cloudflare Workers的GitHub代理服务，允许通过替代域名访问GitHub资源，解决某些网络环境下GitHub访问受限的问题。代理服务通过域名映射和资源转发，提供无缝的GitHub浏览体验。

本项目基于 [GithubSiteProxyForCloudflareWorker](https://github.com/afoim/GithubSiteProxyForCloudflareWorker) 二改，修复了前端嵌套及稳定性等问题。

This project is based on [GithubSiteProxyForCloudflareWorker](https://github.com/afoim/GithubSiteProxyForCloudflareWorker)
and is licensed under the GNU Affero General Public License v3.0.

## 特性

- **添加敏感接口重定向**：添加 403 提示作为敏感接口（登录/注册）的重定向页面，避免风险扫描
- **修复页面嵌套等问题**：修复了前端部分页面嵌套及HTML头部不完善等问题

- **子域名匹配系统**：使用 `gh.` 前缀作为GitHub的代理入口，支持任何域名后缀
- **完整的资源映射**：支持GitHub相关的所有主要域名，包括API、静态资源、用户内容等
- **内容替换**：自动替换响应中的所有域名引用，确保链接正常工作
- **路径修复**：解决嵌套URL路径问题，特别针对仓库提交信息等特殊路径
- **安全重定向**：对敏感路径（如登录页面）进行安全重定向
- **HTTPS强制**：自动将HTTP请求升级为HTTPS

## 支持的域名映射

服务支持以下 GitHub 相关域名的代理访问：

- github.com → gh.[您的域名]
- avatars.githubusercontent.com → avatars-githubusercontent-com.[您的域名]
- github.githubassets.com → github-githubassets-com.[您的域名]
- api.github.com → api-github-com.[您的域名]
- raw.githubusercontent.com → raw-githubusercontent-com.[您的域名]

- 以及更多 GitHub 相关服务域名：
  - collector.github.com → collector-github-com.[您的域名]
  - gist.githubusercontent.com → gist-githubusercontent-com.[您的域名]
  - github.io → github-io.[您的域名]
  - assets-cdn.github.com → assets-cdn-github-com.[您的域名]
  - cdn.jsdelivr.net → cdn.jsdelivr-net.[您的域名]
  - securitylab.github.com → securitylab-github-com.[您的域名]
  - www.githubstatus.com → www-githubstatus-com.[您的域名]
  - npmjs.com → npmjs-com.[您的域名]
  - git-lfs.github.com → git-lfs-github-com.[您的域名]
  - githubusercontent.com → githubusercontent-com.[您的域名]
  - github.global.ssl.fastly.net → github-global-ssl-fastly-net.[您的域名]
  - api.npms.io → api-npms-io.[您的域名]
  - github.community → github-community.[您的域名]


## 建议
建议在CF中添加对英国IP的阻止规则，防止自动化欺诈风险扫描。


## 部署指南

### 前提条件

- Cloudflare账户
- 已配置的域名（托管在Cloudflare上）
- 基本的DNS配置知识

### 部署步骤

1. **登录Cloudflare控制台**
   - 进入Workers部分

2. **创建新的Worker**
   - 点击"创建Worker"
   - 将提供的代码粘贴到代码编辑器中
   - 给Worker命名并保存

3. **配置DNS**
   - 为每个代理域名前缀创建CNAME记录，指向您的Worker（添加自定义域后会自动创建）
   - 例如：创建 `gh.您的域名` 的CNAME记录，指向您的Worker路由

4. **配置Worker自定义域**
   - 在Worker中添加自定义域如 `gh.您的域名`
   - 对其他代理子域重复此操作（目前主要域名+其他域名：共18个）

### 配置自定义域名

如果您想使用不同的域名前缀，请修改代码中的`domain_mappings`对象，将默认的`gh.`等前缀替换为您喜欢的前缀。

## 使用方法

部署成功后，只需将原始GitHub URL中的域名部分替换为对应的代理域名：

```
# 原始URL
https://github.com/用户名/仓库名

# 代理URL
https://gh.您的域名/用户名/仓库名
```

其他GitHub资源的访问方式类似，系统会自动处理域名映射和内容替换。

## 技术说明

### 工作原理

1. 接收对代理域名的请求
2. 识别目标GitHub域名
3. 转发请求到GitHub服务器
4. 接收GitHub的响应
5. 替换响应内容中的域名引用
6. 返回修改后的响应给用户

### 特殊路径处理

代码包含专门的逻辑来处理特殊路径，特别是用于仓库提交信息的路径，解决了嵌套URL问题：

```
/用户名/仓库名/latest-commit/分支名/https://gh.域名/...
```

这类路径会被正确截断并转发到GitHub。

## 安全考虑

- 代理服务不存储或处理用户凭据
- 敏感路径（如登录页面）会被重定向到其他网站
- 所有流量都通过HTTPS加密

## 限制

- 不支持GitHub的登录和注册功能
- 某些高级GitHub功能可能不完全兼容
- 不能代替GitHub CLI或Git等工具的直接连接

## 故障排除

如果遇到问题：

1. 确认DNS记录配置正确
2. 检查Worker是否正常运行
3. 尝试清除浏览器缓存
4. 检查请求和响应日志以获取详细错误信息

## 贡献指南

欢迎提交Pull Request或Issue来改进此项目。特别欢迎以下方面的贡献：

- 增加对更多GitHub相关域名的支持
- 改进内容替换逻辑
- 增强错误处理机制
- 添加性能优化

## 免责声明

此代理服务仅用于教育和研究目的。使用者应确保遵守GitHub的服务条款和当地法律法规。
