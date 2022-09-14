# 简述

- 实现了登录、注册，权限校验、授权，用户管理(全局 jwt\角色校验)

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

# TODO

- [ ] logger 日志系统

- [ ] 使用 Redis 完成登录挤出功能

- [ ] 超时设置、安全处理

- [ ] 登录时记录用户 IP（首次，最近一次，登录历史）

- [ ] 角色管理

- [ ] 抽离公共部分以及对 mongoose 和 typeorm 的特殊处理组成核心库
