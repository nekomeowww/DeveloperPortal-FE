# hexo-plugin-matataki
Hexo Plugin for Matataki Fan Token
This is a on going working project
<br>

<style>
pre {
  overflow-x: scroll;
}
</style>

## Preview Demo

After installation, the encrypted article will look like this.

<img src="https://i.loli.net/2020/08/22/pvniyPHh5R7t8Xr.png" style="height: 300px;" />

## Installation

This plugin requires two systems to work together to get the job done, one for [FanLocker](https://github.com/nekomeowww/fanlocker) and one for this plugin. Also you need a [Matataki Developer Center](https://developer.matataki.io) account to get the ClientId and ClientSecret needed for FanLocker

To use npm, use the `npm install` command, or if you are using yarn, you can just copy the following paragraph and add it to the dependencies in the root of your blog

```
yarn add hexo-plugin-matataki
```
<br>

## Configuration

The configuration of hexo-plugin-matataki is simple. At the beginning of each of your posts, which is called Front-matter, add the following

```
matataki:
  token: 0
  password: password
  name: name
  amount: 0
  mode: hold | pay
  abstract: This article uses Fan ticket encryption, hold a specific Fan ticket to unlock the article
  message: Hold a Fan ticket to unlock the article
  wrongPassMessage: The unlock failed. If you are a blogger who encountered this problem, see if the key-value pairs in the safe are set correctly
  wrongHashMessage: It seems that a few pages were missed when the article was encrypted, but the rest of the content can still be read!
```

These parameters are.

1. Token ID (Fan ticket ID)
2. Password (fill in the same in the vault)
3. password name (fill in the same content in the vault)
4. quantity (how many Fan tickets)
5. mode (hold or pay, only hold is supported now)
6. oauth (optional, Oauth address, get in the developer center)

In your blog root configuration file or theme configuration file fill in.
```
fanlocker: oauth address (can be found in the Oauth2 interface in the Developer Center)
```

If you are familiar with the code, you should be able to understand it by looking at the part of the source code that deals with reading.
```
data.matataki.oauth || hexo.theme.config.fanlocker || hexo.config.fanlocker
```

If you want to specify that different articles use different Oauth addresses, write in the Front-matter
```
matataki:
  oauth: Address
```
Just fine

## Optional (global modification)
```
matataki:
  abstract: This article is encrypted with Fan tickets, and a specific Fan ticket is held to unlock the article
  message: unlock the article with a Fan ticket
  tags:
  - {name: encryptAsDiary, password: passwordA}
  - {name: encryptAsTips, password: passwordB}
  template: <div id="hexo-plugin-matataki" data-wpm="{{hpmWrongPassMessage}}" data-whm="{{hpmWrongHashMessage}}"><div class="hpm-input-container"><div class="symbol-line"><img src="{{hpmSymbolAvatar}}" class="hpm-avatar" /><div class="message">{{hpmMessage}}</div></div><div style="display: flex;justify-content: flex-end;width: 100%;"><a href="{{hpmHref}}"><div id="login-btn">解锁</div></a><div id="unlock-btn">解锁</div></div></div><script id="hpmToken" type="hpmToken">{{hpmToken}}</script><script id="hpmAmount" type="hpmAmount">{{hpmAmount}}</script><script id="hpmName" type="hpmName">{{hpmEncrypName}}</script><script id="hpmData" type="hpmData" data-hmacdigest="{{hpmHmacDigest}}">{{hpmEncryptedData}}</script></div>
  wrongPassMessage: The unlock failed. If you are a blogger who encountered this problem, see if the key-value pairs in the safe are set correctly
  wrongHashMessage: It seems that a few pages were missed when the article was encrypted, but the rest of the content can still be read!
```
