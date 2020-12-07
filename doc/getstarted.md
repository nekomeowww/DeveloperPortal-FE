<style>
pre {
  overflow-x: scroll;
}
</style>

# 开始

如果你已经创建了一个你自己的 App，可以前往 Oauth2 页面，在那里，你可以进行你的选择。
点选复制就可以把链接复制到你的剪贴板，在你需要的地方链接到复制给你的内容就可以使用 Matataki 进行第三方 Oauth 登录，这个过程并不会要求用户在你的网站上输入任何用户名和密码，用户在 Matataki 上所绑定的账号跳转也会相应的跳转到你需要的位置。
![](https://i.loli.net/2020/08/07/z5Co9FYaNcnsweD.png)

在我们返回 Oauth 授权的时候，会在你填写的 Callback 回调链接后面增加
```
&token=eyJ0eXAiOiJKV1QASUISAUIAUSJuaiqwqih.eyJpc3MiOiJkZ1io2juds908929udubf9qfh898fh92f9h892hf39823hf9283hf9f2h98hftYWlsIiwiaWQiOjEzMzJ9.1BGl1acsiuucohffu1b1u19b
```
这样的链接进行回调，在回调内容之后，你可以尝试使用 JWT（JSON Web Token）来进行解密，如果你不熟悉这部分的内容，我们可以提供帮助，
```
function disassemble(token) {
  if (!token) return { iss: null, exp: 0, platform: null, id: null };
  let tokenPayload = token.substring(token.indexOf('.') + 1);
  tokenPayload = tokenPayload.substring(0, tokenPayload.indexOf('.'));
  return JSON.parse(atob(tokenPayload));
}
```
如果你使用 Javascript，也就是 Node.js 的话，可以直接使用这个方法来获得信息，解码之后你可以获得三个参数，也就是在代码第二行给出来的四个参数。

<style>
table th:first-of-type {
    width: 10%;
}
table th:nth-of-type(2) {
    width: 10%;
}
table th:nth-of-type(3) {
    width: 80%;
}
</style>

| 域 Fields | 类型 Type | 说明 Description                               |
| :------------ | :------------ | :----------------------------------------------------------- |
| user.iss      | 字符串 | 这是签发用户凭证的时候返回的内容，通常可以直接理解为 username，但取决于用户平台不同，这里的值也会相应的有差距 |
| user.exp      | 整型  | 这是过期时间，使用的是 UNIX 时间戳，你可以用 Javascript 的原生类型 Date 来获取内容，比如 `new Date(user.exp)` 就可以知道时间了，但是实际应用中你应该只需要比大小就可以知道是否过期 |
| user.platform | 字符串 | 这是用户登录的时候使用的平台名称，不同的平台会有不同的数据返回，这里我们举例 email |
| user.id       | 整型 | 这是用户的唯一身份编码，在 Matataki 的用户数据库中，这个是自增值，所以在常规的应用中，你都应该尽量使用这个值来作为参考内容，因为这个值在全部四个值中是唯一不会改变的 |

这样你就获得了用户的基本信息。