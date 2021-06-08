<style>
pre {
  overflow-x: scroll;
}
</style>

# Start

If you've already created an App of your own, you can go to the Oauth2 page where you can make your selections.
Tap Copy to copy the link to your clipboard, and link to the content copied to you where you need it to use Matataki for third-party Oauth login. This process does not require the user to enter any username and password on your site, and the account hops the user has tied to Matataki will jump to your desired location accordingly.
![](https://i.loli.net/2020/08/07/z5Co9FYaNcnsweD.png)

When we return the Oauth authorization, we will add the Callback callback link you filled in after the
```
&token=eyJ0eXAiOiJKV1QASUISAUIAUSJuaiqwqih.eyJpc3MiOiJkZ1io2juds908929udubf9qfh898fh92f9h892hf39823hf9283hf9f2h98hftYWlsIiwiaWQiOjEzMzJ9.1BGl1acsiuucohffu1b1u19b
```
Such a link for callback, after the callback content, you can try to use JWT (JSON Web Token) for decryption, if you are not familiar with this part, we can provide help that
```
function disassemble(token) {
  if (!token) return { iss: null, exp: 0, platform: null, id: null };
  let tokenPayload = token.substring(token.indexOf('.') + 1);
  tokenPayload = tokenPayload.substring(0, tokenPayload.indexOf('.'));
  return JSON.parse(atob(tokenPayload));
}
```
If you are using Javascript, i.e. Node.js, you can use this method directly to get the information, and after decoding you can get three parameters, which are the four given in the second line of the code.

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
| user.iss | String | This is the content returned when issuing user credentials, which can usually be interpreted as username, but depending on the user's platform, the value here may vary accordingly |
| user.exp | Integer | This is the expiration time, using the UNIX timestamp, you can use Javascript's native type Date to get the content, such as `new Date(user.exp)` to know the time, but in practice you should only need to compare the size to know whether the expiration |
| user.platform | String | This is the name of the platform used by the user when logging in, different platforms will have different data returned, here we have an example of email |
| user.id | Integer | This is the user's unique identity code, which is self-valued in Matataki's user database, so you should try to use this value as a reference in regular applications, as it is the only one of all four values that will not change. |

This way you get the basic information about the user.
