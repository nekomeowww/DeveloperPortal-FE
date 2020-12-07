# 用户信息

还记得我们在之前的过程中获取的唯一用户 ID 值吗？现在我们使用 user.id 就可以获取用户的信息了。这个过程是完全依照 RESTful API 规范的。
如果你要直接使用 Matataki 主站使用的 API 服务，实例地址是：`https://api.smartsignature.io`
如果要调用和获取图像信息，Matataki 图床的 CDN 是：`https://ssimg.frontenduse.top`
接口如下：

## GET /user/:id

<style>
pre {
  overflow-x: scroll;
}
</style>

<br>

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

| 域 Fields | 类型 Type                           | 说明 Description                                  |
| :-------- | :---------------------------------- | :------------------------------------------------ |
| code      | 整型                                | 获取信息返回的整数值，表示成功与否，0 即为成功    |
| data      | [UserProfileData](#UserProfileData) | 获取到的用户信息，会在下一个表格中包含这个内容    |
| Message   | 字符串                              | 获取信息返回的成功与否的字符串值，"成功" 即为成功 |

<br>

### UserProfileData

<br>

| 域 Fields    | 类型 Type | 说明 Description                                  |
| :----------- | :-------- | :------------------------------------------------ |
| avatar       | 字符串    | 头像地址，需要添加 Matataki 图床的 CDN 为前缀     |
| banner       | 字符串    | 背景横幅地址，需要添加 Matataki 图床的 CDN 为前缀 |
| create_time  | 字符串    | 用户注册时间                                      |
| fans         | 整型      | 关注者数量                                        |
| follows      | 整型      | 正在关注人数                                      |
| introduction | 字符串    | 自我介绍                                          |
| is_follow    | 布尔值    | 是否是当前用户关注的对象                          |
| Is_recommand | 整型      | 是否是被推荐的用户                                |
| nickname     | 字符串    | 用户昵称                                          |
| status       | 整型      | 用户状态，有两个值：1.种子用户，2.发币用户        |
| username     | 字符串    | 用户的用户名                                      |

参考请求：

```
https://api.smartsignature.io/user/10
```

参考响应：

```
{
  "code":0,
  "message":"成功",
  "data":{
      "username":"lychees",
      "nickname":"xiaodao",
      "create_time": "2020-06-28T06:54:37.000Z"
      "avatar":"/avatar/2019/07/12/d0c1f59b794f1dd9437c84af8cc57b6e.png",
      "introduction":"一個弱菜。",
      "banner":"/banner/2019/12/06/cb68b9c2f06b5390cdbc8d32db0d1e57.jpeg",
      "follows":143,
      "fans":220,
      "is_follow":false,
      "status":3,
      "is_recommand": 0
  }
}
```

