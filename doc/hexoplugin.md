# hexo-plugin-matataki
Hexo Plugin for Matataki Fan Token
This is a on going working project
<br>

<style>
pre {
  overflow-x: scroll;
}
</style>

## 预览 Demo

安装后加密的文章就会变成这样：

<img src="https://i.loli.net/2020/08/22/pvniyPHh5R7t8Xr.png" style="height: 300px;" />

## 安装

这个插件需要两个系统合作完成工作，一个是 [FanLocker](https://github.com/nekomeowww/fanlocker) 一个是本插件。同时你需要一个 [Matataki 开发者中心](https://developer.matataki.io) 的账号来获取 FanLocker  所需要的 ClientId 和 ClientSecret

使用 npm 请使用 `npm install` 命令，使用 yarn 的话可以直接复制下面这段添加到博客根目录的依赖项内

```
yarn add hexo-plugin-matataki
```
<br>

## 配置

hexo-plugin-matataki 的配置很简单，在你的每一篇文章的开头，也就是被称之为 Front-matter 的地方，添加以下内容，

```
matataki:
  token: 0
  password: password
  name: name
  amount: 0
  mode: hold | pay
  abstract: 这篇文章使用了 Fan 票加密，持有特定 Fan 票来解锁文章
  message: 持有 Fan 票来解锁文章
  wrongPassMessage: 解锁失败了呢。如果你是博客作者遇到这个问题，看看保险箱的键值对是否设置正确呢
  wrongHashMessage: 好像文章加密的时候的时候遗漏了几页呢，不过这些剩下的内容还是可以看看啦
```

这些参数分别是：

1. Token ID（Fan 票 ID）
2. 密码（在保险库中也要填写一样的内容）
3. 密码名称（在保险库中填写一样的内容）
4. 数量（多少 Fan 票）
5. 模式（hold 或者 pay，现在仅支持 hold）
6. oauth（可选，Oauth 地址，在开发者中心获取）

在你的博客根目录配置文件或者主题配置文件填入：
```
fanlocker: oauth 地址（可以在开发者中心的 Oauth2 界面找到）
```

如果你熟悉代码，可以看看源代码中关于读取的部分应该就能理解：
```
data.matataki.oauth || hexo.theme.config.fanlocker || hexo.config.fanlocker
```

如果你要指定不同的文章使用不同的 Oauth 地址，在 Front-matter 中写入
```
matataki:
  oauth: 地址
```
就好了

## 可选（全局修改）
```
matataki:
  abstract: 这篇文章使用了 Fan 票加密，持有特定 Fan 票来解锁文章
  message: 持有 Fan 票解锁文章
  tags:
  - {name: encryptAsDiary, password: passwordA}
  - {name: encryptAsTips, password: passwordB}
  template: <div id="hexo-plugin-matataki" data-wpm="{{hpmWrongPassMessage}}" data-whm="{{hpmWrongHashMessage}}"><div class="hpm-input-container"><div class="symbol-line"><img src="{{hpmSymbolAvatar}}" class="hpm-avatar" /><div class="message">{{hpmMessage}}</div></div><div style="display: flex;justify-content: flex-end;width: 100%;"><a href="{{hpmHref}}"><div id="login-btn">解锁</div></a><div id="unlock-btn">解锁</div></div></div><script id="hpmToken" type="hpmToken">{{hpmToken}}</script><script id="hpmAmount" type="hpmAmount">{{hpmAmount}}</script><script id="hpmName" type="hpmName">{{hpmEncrypName}}</script><script id="hpmData" type="hpmData" data-hmacdigest="{{hpmHmacDigest}}">{{hpmEncryptedData}}</script></div>
  wrongPassMessage: 解锁失败了呢。如果你是博客作者遇到这个问题，看看保险箱的键值对是否设置正确呢
  wrongHashMessage: 好像文章加密的时候的时候遗漏了几页呢，不过这些剩下的内容还是可以看看啦
```