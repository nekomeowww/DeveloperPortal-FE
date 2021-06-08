# User Information

Remember the unique user ID value we got in the previous procedure? Now we can use user.id to get the user's information. This process is fully compliant with the RESTful API specification.
If you want to use the API service used by the Matataki main site directly, the example address is: `https://api.mttk.net`
If you want to call and get image information, the CDN of the Matataki image bed is: `https://ssimg.frontenduse.top`
The interface is as follows.

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

| Fields | Type                           | Description                                               |
| :-------- | :---------------------------------- | :------------------------------------------------ |
| code | Integer | The integer value returned for the information obtained, indicating success or failure, 0 being success |
| data | [UserProfileData](#UserProfileData) | The user information obtained, which will be included in the next form. |
| Message | String | The string value of the success or failure of the returned message, "success" is success |

<br>

### UserProfileData

<br>

| Fields    | Type | Description                                               |
| :----------- | :-------- | :------------------------------------------------ |
| avatar | String | address of avatar, need to add Matataki image bed CDN as prefix |
| banner | String | The address of the background banner, you need to add Matataki bed's CDN as prefix |
| create_time | String | user registration time |
| fans | Integer | number of followers |
| follows | Integer | number of people following |
| introduction | String | self introduction |
| is_follow | Boolean | is the current user following |
| is_recommand | Integer | is the recommended user |
| nickname | String | user nickname |
| status | Integer | The user's status, with two values: 1. seed user, 2. coin user |
| username | String | The user's username |

Reference request:

```
https://api.mttk.net/user/10
```

Reference response:

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

