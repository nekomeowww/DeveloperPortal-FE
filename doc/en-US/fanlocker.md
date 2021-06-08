# Fanlocker
A universal content locker for blog by using Fan token from Matataki.io
This is a on going working project
<br>

<style>
pre {
  overflow-x: scroll;
}
</style>

## Create

Go to [Matataki Developer Center](https://developer.matataki.io) and create an App with the name of your blog, on the Oauth2 page you can get the ClientId and ClientSecret, copy them down.

Go to the vault and create your key, you have two options.

1. if your key name is the same as the Markdown file name, then the name should be the same, so that no additional content is needed in the Front-matter
2. specify the name in the matataki keyword of Front-matter if you want to set it once and use it many times (recommended)

If you are still not sure, the logic behind this in the source code is as follows:

```
data.matataki.name || data.source.replace(/^_post\/|^.*\//, '').replace(/\.md$/, '').trim()
```
<br>

## Installation

Add the following to the end of your Blog Post template section


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

## Use

Install hexo-plugin-matataki in your Hexo blog, and write down your

```
matataki:
  token: 0
  password: password
  name: name
  amount: 0
  mode: hold | pay
```

<br>

1. Token ID (Fan ticket ID)
2. password (fill in the same in the vault)
3. password name (the same in the vault)
4. quantity (how many Fan tickets)
5. mode (hold or pay, only hold is supported now)
