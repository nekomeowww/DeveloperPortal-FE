# OAuth

We can re-specify a redirect_uri as a temporary parameter for Oauth authentication, so that the server can handle the callback dynamically. This can be used in different scenarios, for example, if your login screen is not fixed, but a dynamic login box, the jump needs an automated process, and the Oauth callback link is not constant, we can use the POST method to tell the server the redirect_uri we need in advance, and after that After that, Oauth can jump back to the page you specified.

The interface is as follows.

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

Parameters:

| Fields    | Type | Description                                                          |
| :----------- | :-------- | :----------------------------------------------------------- |
| clientId | String | Client ID obtained from Developer Center App Basic Information, your client's unique identifier |
| clientSecret | String | Client Secret obtained from Developer Center App Basic Information, the key required to access your client |
| clientSecret | String | The Client Secret retrieved from the Developer Center App Basic Information, the key required to access your client. |
| redirect_uri | String | The callback link you specify, this link will only work once and must be the same domain name or host name as the callback link you set, when Oauth is triggered, it will revert to the original link address |

Reference request:

```
https://developer.matataki.io/api/app/oauth
```

Reference response:

```
{
    "code": 0,
    "message": "success"
}
```

