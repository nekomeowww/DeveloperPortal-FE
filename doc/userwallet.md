# 用户钱包
如果你想要获取用户的钱包，必须要在请求中包含一个 cookie 作为请求头的许可才可以获取数据，否则会返回 `"未授权"` 为 message 值，我们现在来介绍如何获取用户的钱包信息。这个过程是完全依照 RESTful API 规范的。
如果你要直接使用 Matataki 主站使用的 API 服务，实例地址是：`https://api.mttk.net`
如果要调用和获取图像信息，Matataki 图床的 CDN 是：`https://ssimg.frontenduse.top`
接口如下：

## GET /token/tokenlist

<style>
pre {
  overflow-x: scroll;
}
</style>

<br>

这里我们使用普遍广泛使用的 Axios 作为 HTTPS 客户端作为示范，这段代码在 Javascript 中也是可以完美运行的。

在接口的后面我们添加了三个 query 参数，分别是 pagesize（分页大小），order（是否排序），分页页数（这里写 1），这样我们就请求了一个数组数量最大为 999 的钱包信息

```
axios({
    url: 'https://api.mttk.net/token/tokenlist?pagesize=999&order=0&page=1',
    method: 'GET',
    headers: { 'x-access-token': token }
})
```
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
| data      | [UserWallet](#UserWallet)           | 获取到的用户钱包信息，会在下一个表格中包含这个内容    |
| Message   | 字符串                              | 获取信息返回的成功与否的字符串值，"成功" 即为成功 |

<br>

### UserWallet

<br>

| 域 Fields | 类型 Type                 | 说明 Description                                             |
| :-------- | :------------------------ | :----------------------------------------------------------- |
| count     | 整型                      | 用户钱包内 Fan 票的数量，也就是 list 的 length               |
| list      | [WalletList](#WalletList) | 用户钱包内 Fan 票的列表，该项目内容会在下一个表格中包含这个内容 |

<br>

### WalletList

每一个列表项目包含以下内容：

<br>

| 域 Fields        | 类型 Type | 说明 Description                                        |
| :--------------- | :-------- | :------------------------------------------------------ |
| token_id         | 整型      | token 的唯一 id 标识                                    |
| amount           | 整型      | 当前持有数量                                            |
| symbol           | 字符串    | Fan 票的短字母标识，比如 BTC， ETH 这样                 |
| name             | 字符串    | Fan 票的正式名称                                        |
| decimals         | 整型      | 计算精度，这里指的是 10^4 的精度计算标准                |
| logo             | 字符串    | Fan 票的 logo 地址，需要添加 Matataki 图床的 CDN 为前缀 |
| uid              | 整型      | 用户的唯一 id 标识                                      |
| username         | 字符串    | 用户名                                                  |
| nickname         | 字符串    | 用户给自己选择的昵称                                    |
| avatar           | 字符串    | 用户的头像地址，需要添加 Matataki 图床的 CDN 为前缀     |
| member           | 字符串    | 是否是成员                                              |
| current_price    | 浮点数    | 当前的价值，其按照 CNY（人民币）为标准，不需要换算精度  |
| price_change_24h | 浮点数    | 24 小时内涨幅指标，是百分比数值，应当换算为百分比显示   |
| hold_percentage  | 整型      | 持有占比，是百分比数值                                  |

<br>

参考请求：

```
https://api.smartsignature.io/token/tokenlist?pagesize=999&order=0&page=1
```

参考响应：
```
{
    "code":0,
    "message":"成功",
    "data":{
        "count":9,
        "list":[
            {
                "token_id":73,
                "amount":992399999,
                "symbol":"ANC",
                "name":"猫猫币",
                "decimals":4,
                "logo":"/image/2020/07/15/8eaf65e03fcd9d49a6a528909fc6e9c0.png",
                "uid":2476,
                "username":"nekomeowww",
                "nickname":"Ayaka",
                "avatar":"/avatar/2020/06/22/bff4b845d113cc833b7b3ca3b82033e6.jpg",
                "member":"0",
                "current_price":3.5749,
                "price_change_24h":0,
                "hold_percentage":100
            },
            {
                "token_id":70,
                "amount":300000,
                "symbol":"IDC",
                "name":"IDOLCOIN",
                "decimals":4,
                "logo":"/image/2020/07/07/500829dfa343043b9aa55874cdaf35f2.png",
                "uid":2603,
                "username":"li****ol@andoromeda.io",
                "nickname":"币娘",
                "avatar":"/avatar/2020/07/07/0bb698275843acc8e98c81ebbc2154b4.png",
                "member":"0",
                "current_price":2.5314,
                "price_change_24h":-0.006561419674022096,
                "hold_percentage":0
            }
        ]
    }
}
```
