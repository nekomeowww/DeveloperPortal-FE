# Fanlocker
A universal content locker for blog by using Fan token from Matataki.io
This is a on going working project
<br>

## 创建

前往 [Matataki 开发者中心](https://developer.matataki.io) 创建一个名称为你的博客的 App，在 Oauth2 页面可以获取 ClientId 和 ClientSecret，把他们复制下来。

前往保险库，创建你的密钥，你有两个选项：

1. 如果你的密钥名称和 Markdown 文件名相同，那么名称也相同就好，这样在 Front-matter 里就不需要额外的内容
2. 如果你想要设置一次就使用很多次的话，在 Front-matter 的 matataki 关键字中指定 name (推荐)

如果你还是不清楚，在源代码中，这背后的逻辑是这样的：

```
data.matataki.name || data.source.replace(/^_post\/|^.*\//, '').replace(/\.md$/, '').trim()
```
<br>

## 安装

在你的 Blog Post 模版部分末尾添加以下内容

```
<script src="https://unpkg.com/fanlocker@latest/dist/fanlocker.js"></script>
<script>
  let fl = new FanLocker({
    clientId: '你在开发者中心获取的 Client ID',
    clientSecret: '你在开发者中心获取的 ClientSecret'
  })
</script>
```
<br>

## 使用

在 Hexo 博客中安装 hexo-plugin-matataki，并且在 Front-matter 写下你的

```
matataki:
  token: 0
  password: password
  name: name
  amount: 0
  mode: hold | pay
```

<br>

1. Token ID（Fan 票 ID）
2. 密码（在保险库中也要填写一样的内容）
3. 密码名称（在保险库中填写一样的内容）
4. 数量（多少 Fan 票）
5. 模式（hold 或者 pay，现在仅支持 pay）