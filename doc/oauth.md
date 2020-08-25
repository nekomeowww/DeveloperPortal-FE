# Oauth

我们可以重新临时指定一个 redirect_uri 作为 Oauth 验证的参数，这样服务器进行回调处理的时候就能进行动态处理。这样的应用可以出现在不同的场景中，比如你的登录界面不是固定的，是一个动态登录框的话，跳转就需要一个自动化的过程，而 Oauth 的 callback 回调链接不是恒定不变的，我们可以使用 POST 方法提前告知服务器我们需要的 redirect_uri，在那之后进行 Oauth 便可以回跳到你指定的页面。

接口如下：

## POST /app/oauth

<style>
pre {
  overflow-x: scroll;
}
</style>

<style>
table th:first-of-type {
    width: 15%;
}
table th:nth-of-type(2) {
    width: 15%;
}
table th:nth-of-type(3) {
    width: 80%;
}
th{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding-bottom: 10px;
}
td {
    font-weight: 400;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>

参数：

| 域 Fields    | 类型 Type | 说明 Description                                             |
| :----------- | :-------- | :----------------------------------------------------------- |
| clientId     | 字符串    | 在开发者中心 App 基本信息处获取的 Client ID，你的客户端唯一标识 |
| clientSecret | 字符串    | 在开发者中心 App 基本信息处获取的 Client Secret，访问你的客户端需要的密钥 |
| redirect_uri | 字符串    | 你指定的回调链接，这个链接只会生效一次，当 Oauth 被触发之后，就会恢复为原本的链接地址 |

参考请求：

```
https://developer.matataki.io/api/app/oauth
```

参考响应：

```
{
    "code": 0,
    "message": "success"
}
```

