# 简述

- 实现了登录、注册
- 统一接口返回值
- 统一错误处理
- 使用 swagger
- 用户管理
- 权限校验(全局 jwt\角色校验)
- 授权

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

## 使用

### 修改数据库连接 app.module.ts

> mongodb://admin:123456@localhost:27017/soft?authSource=admin

### 装饰器

- @UseGuards(LocalAuthGuard) (使用 local 一般用于登录接口)
- @Roles(Role.Admin) 角色
- @AllowAnonymous() 允许接口不校验 token
- @ApiPaginatedResponse(User) swagger 分页装饰器

### Config

- 配置，在 src/config 目录 ，auth: EXPIRES_INtoke 时效、SECRET_KEY

### 工具

- 不习惯使用 mongodb 默认的\_id，使用 setVirtualKey 可以自定义虚拟字段 id

  > example: setVirtualKey(UserSchema)

- buildQuery 暂且这么称呼，有待完善

  > 使用查询函数的传参构建 mongoose 的查询条件

  ```
   const query = new QueryBuilder(params);

    return this.userModel.find(query.$and(), { password: 0, salt: 0 });
  ```

# TODO

- [ ] logger 日志系统

- [ ] 使用 Redis 完成登录挤出功能

- [ ] 超时设置、安全处理

- [ ] 登录时记录用户 IP（首次，最近一次，登录历史）

- [ ] 角色管理

- [ ] 抽离公共部分以及对 mongoose 和 typeorm 的特殊处理组成核心库
