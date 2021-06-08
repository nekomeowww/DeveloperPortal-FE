# User's wallet
If you want to get the user's wallet, you must include a cookie in the request as permission in the request header to get the data, otherwise it will return `"unauthorized"` as message value, we will now describe how to get the user's wallet information. This process is fully compliant with the RESTful API specification.
If you want to use the API service used by the Matataki main site directly, the example address is: `https://api.mttk.net`
If you want to call and get image information, the CDN of the Matataki image bed is: `https://ssimg.frontenduse.top`
The interface is as follows.

## GET /token/tokenlist

<style>
pre {
  overflow-x: scroll;
}
</style>

<br>

Here we use the widely used Axios as the HTTPS client as a demonstration, and the code works perfectly in Javascript.

We add three query parameters to the back of the interface, pagesize, order, and number of pages (here we write 1), so we request an array of wallets with a maximum of 999

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

| Fields | Type                           | Description                                  |
| :-------- | :---------------------------------- | :------------------------------------------------ |
| code | Integer | The integer value returned by the fetch message, indicating success or failure, 0 is success |
| data | [UserWallet](#UserWallet) | The user wallet information obtained, which will be included in the next form. |
| Message | String | The string value of the success or failure of the returned message, "success" means success |

<br>

### UserWallet

<br>

| Fields | Type                 | Description                                             |
| :-------- | :------------------------ | :----------------------------------------------------------- |
| count | Integer | The number of Fan tickets in the user's wallet, which is the length of the list |
| list | [WalletList](#WalletList) | The list of Fan tickets in the user's wallet, the contents of which will be included in the next table |

<br>

### WalletList

Each list item contains the following.

<br>

| Fields        | Type | Description                                        |
| :--------------- | :-------- | :------------------------------------------------------ |
| token_id | Integer | unique id identifier for token |
| amount | Integer | current holding amount |
| symbol | String | short letter identifier of the Fan ticket, e.g. BTC, ETH
| name | String | the official name of the Fan ticket
| decimals | Integer | precision of calculation, in this case the 10^4 precision standard |
| logo | String | The logo address of the Fan ticket, prefixed with the CDN of the Matataki bed.
| uid | Integer | unique id of the user
| username | String | username
| nickname | String | the nickname the user has chosen for themselves
| avatar | String | The user's avatar address, prefixed with the CDN of the Matataki bed
| member | String | whether the user is a member |
| current_price | The current value in CNY, no need to convert to precision |
| price_change_24h | Floating point number | An indicator of the increase in 24 hours, which is a percentage value and should be converted to a percentage display
| hold_percentage | Integer | Hold percentage, is a percentage value |

<br>

Reference request:

```
https://api.smartsignature.io/token/tokenlist?pagesize=999&order=0&page=1
```

Reference response:
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
