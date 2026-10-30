# spider.jar 使用指南

> 适用目录：`iedo_new/` ｜ 主包：`lib/spider.jar`（1.8 MB，qist/tvbox 官方 2026-10-24 版）
> MD5：`a4638e7ba814dd552472501335ecdc47`（与官方发布一致）

---

## 一、它是什么

`spider.jar` 是 TVBox 的**爬虫引擎包**，里面打包了 110+ 个爬虫类（Android dex 字节码）。配置文件中每个 `"api": "csp_Xxx"` 站点，都会在运行时从这个 jar 里加载名为 `com.github.catvod.spider.Xxx` 的类来抓取视频源。

当前 `api.json` 的全局 `spider` 字段已指向它：

```json
"spider": "./lib/spider.jar"
```

也就是说：**配置里所有 `csp_` 开头的站点都靠这一个 jar 工作**，它挂了所有 csp 站点全挂，它更新了全部站点跟着受益。

### 与旧方案的关系

| | 旧方案（iedo/） | 新方案（iedo_new/） |
|---|---|---|
| jar 数量 | 3 个（kjtw.jar + KG.jar + aw.png） | **1 个**（spider.jar） |
| jar 总体积 | 约 10.6 MB | 1.8 MB |
| csp 数量 | 18 个 | 110+ 个可用 |
| 维护状态 | 旧构建（2026-08-30），无更新 | 持续维护（qist 官方，协议对齐 v6.0.0.1） |

---

## 二、如何使用一个 csp

在 `api.json` 的 `sites` 数组中添加站点，三要素：`api`、`type`、`ext`。

```json
{
  "key": "Czsapp",
  "name": "厂长 • 影视",
  "type": 3,
  "api": "csp_Czsapp",
  "searchable": 1,
  "quickSearch": 1,
  "changeable": 1,
  "ext": "https://cz01.vip"
}
```

- **`api`**：`csp_` + 类名，类名必须与 jar 内一致（区分大小写）
- **`type: 3`**：表示由 spider jar 里的爬虫解析（区别于 type 0/1 的普通网页采集）
- **`ext`**：传给爬虫的参数，**每个 csp 的 ext 格式不同**，写错站点就空。常见三种：
  1. 纯字符串 → 站点域名，如 `"https://cz01.vip"`
  2. JSON 对象 → 复杂参数，如 `{"site": ["https://4kzn.cc"]}`
  3. 留空 → 类内置了默认地址

> ⚠️ 添加新站点时，**最稳妥的方式是照抄官方 jsm.json 的写法**（见文末参考）。

---

## 三、你正在使用的 14 个 csp（重点掌握）

当前 `iedo_new/api.json` 中 19 个 csp 站点共用到 14 个类（Bili 复用了 7 次）：

### Config（配置 • 中心）
TVBox 的「配置中心」入口，在应用内可直接切换/编辑多个在线配置，不需要改本地文件。日常使用建议保留。

### LocalFile（本地 • 视频）
扫描设备本地存储的视频文件播放，配合 U 盘/本地下载的视频使用。

### Douban（豆瓣）
豆瓣片源聚合，支持评分/榜单浏览，内置推荐流。新方案中替代了原 aw.png 的 `csp_DoubanAmns`。

### Duboku（独播 • 影视）
独播库影视站。替代了原 `csp_DubkAmns`。

### Czsapp（厂长 • 影视）
厂长资源站，ext 传站点域名：`"ext": "https://cz01.vip"`。域名失效时只需改 ext 换新域名，**不用动 jar**。替代了原 `csp_CzzyAmns`。

### Gz360（瓜子 • 影视）／ Jpys（金牌 • 影视）
两个换源备用站，ext 可传多个候选域名（逗号分隔），爬虫会自动挑能通的：

```
"ext": "https://y2s52n7.com,https://m.hkybqufgh.com,..."
```

### Wwys（旺旺 • 影视）
农民影视系秒播源，ext 传域名 `https://vip.wwgz.cn:5200`。

### XYQHiker（XYQ 爬虫引擎）
**通用模板引擎**，本身不是站点——它读取 ext 指向的 JSON 规则文件（如 `lib/农民影视.json`）按规则抓取任意网站。你配置里的农民影视站点就由它驱动。想给任何网站自制爬虫，写一份规则 JSON 配合它即可，无需改 jar。

### Bili / BiliYS（哔哩哔哩）
- `csp_Bili`：B站合集/频道模式，通过 ext 里的 JSON 指定频道（你的 7 个 B站站点用它区分不同 up 主/合集）
- `csp_BiliYS`：B站视频主站模式
- 两者都支持 ext 传 cookie 文件地址以解锁高清/登录内容：
  `"cookie": "http://127.0.0.1:9978/file/TVBox/bili_cookie.txt"`

### AppRJ（热播 • APP）
App 协议站点，ext 传接口：`{"url": "http://v.rbotv.cn"}`。

### App99（半日 • 蓝光）
App 协议站点，ext 需带 host + 版本 + 包名等指纹参数（照抄现有配置即可）。

### Kugou（酷狗 • 音乐）
音乐站点，**无需 ext**（qist 官方写法）。使用酷狗官方移动端 API（排行榜/歌单/歌词/MV）。
> 注：这与旧 KG.jar 里的加密版实现不同（同一功能、不同实现），首次使用请实测搜歌与播放。

---

## 四、spider.jar 内置的其他 csp（按类别）

以下均可在 `api.json` 中直接新增使用，写法参考官方 jsm.json。

### 🎬 影视站点

| csp 类名 | 说明 | ext 用法 |
|---|---|---|
| `SaoHuo` | 骚火影视 | 域名，如 `https://shdy5.us` |
| `FengYe` | 枫叶影视 | 域名，如 `https://www.vip1949.com/` |
| `Ikanbot` | 爱看影视 | 默认 |
| `Web1905` | 1905 电影网 | 默认 |
| `HDmoli` | 茉莉 4K | `{"site": ["https://www.hdmoli.com", ...]}` 多候选域名 |
| `Feiyu` | 飞娱影视 | 默认 |
| `New6v` | New6V 磁力 | 域名，如 `https://www.xb6v.com` |

### 📱 App 协议站（换皮 App 破解）

| csp 类名 | 说明 | ext 特点 |
|---|---|---|
| `App3Q` | 马猴 APP | host + 指纹 finger |
| `AppGet` | 王子 APP | url + dataKey/dataIv（AES 解密） |
| `AppQi` | 蓝鹰 APP | url + dataKey/dataIv + init |
| `AppDrama` | 天堂 APP | appName + RSA 公钥 |
| `AppYQK` | 一起 APP | 默认 |
| `AppYsV2` | YS V2 通用 App 协议 | host 型参数 |
| `Gulu` / `Hxq` / `YunDuo` | 咕噜 / 韩圈 / 布布 | 各自带指纹参数 |
| `AppLY` | 戏曲多多 | 默认 |

> ⚠️ App 协议站依赖第三方服务器存活，ext 参数（尤其 key/指纹）必须照抄官方配置，手写极易出错。

### 🧲 4K / 磁力 / 网盘资源

| csp 类名 | 说明 |
|---|---|
| `4KZhinan` | 4K 指南，`{"site": ["https://4kzn.cc"]}` |
| `Wogg` | 玩偶哥哥（知名 4K 网盘站），ext 为多候选域名 JSON |
| `SeedHub` | 种子 4K，多候选域名 JSON |
| `JianPian` | 荐片磁力 |
| `MeijuMi` | 美剧迷磁力 |
| `Xunlei8` | 迅雷吧磁力，域名 `https://xunlei8.me` |
| `Jike` / `ShuangXing` / `BanYunDao` / `KKPan` / `AiPan` / `Yidong4K` | 各类 4K 资源站 |

### ☁️ 网盘直连

| csp 类名 | 说明 |
|---|---|
| `PanAli` | 阿里云盘 |
| `PanQuark` | 夸克网盘 |
| `PanUC` | UC 网盘 |
| `PanBaidu` | 百度网盘 |
| `PanXunlei` | 迅雷云盘 |
| `PanTianyi` | 天翼云盘 |
| `Pan123` | 123 云盘 |
| `PanGuangya` | 光鸭云盘 |
| `PanWebShare` / `PanWebShareHJ` | 快映/花卷 4K（site 数组型 ext） |

> 网盘类站点通常还需要在 TVBox 设置里登录对应网盘账号（阿里/夸克等），部分需配合 token。

### 🔍 聚合搜索

`Baiku`（百酷）、`KuLe`（酷乐）、`MiPan`（觅盘）、`PanSou`（盘搜）、`QuPanSo`（趣盘）——搜索型站点，一般 ext 留空或按官方配置。

### 📺 短剧

`ShortHaokan`（好看）、`ShortHema`（河马）、`ShortQimao`（七猫）、`ShortWeiguan`（围观）、`ShortXingya`（星芽）——五个短剧源，ext 默认。

### 🎌 动漫

`AnimeBashi`（巴士）、`AnimeGiri`（吉里）、`AnimeHuazi`（花子）、`AmuBiliV2`（阿木 B站 V2）。

### 👶 儿童 / 教育

`BeiLeHu`（贝乐虎）、`TongQu`（童趣）、`TuXiaoBei`（兔小贝）、`FirstAid`（急救教学）、`YST`（养生知识）。

### 🎧 听书 / 电台 / 音乐

`TingBokan`（博看听书）、`TingJinxia`（堇夏听书，域名型 ext）、`TingTingyou`（听友听书）、`QingtingFM`（蜻蜓 FM）、`Djuu`（呦呦 DJ）、`Kuwo`（酷我音乐）。

### ⚽ 体育直播

`SportQiutong`（球通）、`Sports88`（88 看球）、`SportsFeiqiu`（飞球）、`SportsGuazi`（瓜子体育）、`SportsKafei`（咖啡体育）、`ALLLive`（全 Sports 直播聚合）。

### 🛠️ 通用模板引擎（XBPQ 家族）

- `XBPQ`：XPath 通用爬虫，ext 是一整段「分类url + 解析规则」JSON（类似 XYQHiker 但规则语法不同），官方配置中有 4 个站点在用（如飞宇影院）
- `XBPQa` / `XBPQb` / `XBPQc` / `XBPQPlay`：同族变体（不同解析细节）

### 🧩 内置但官方配置未使用的类

以下类存在于 jar 中但 qist 官方 jsm.json 未配站点，属备用/实验性，使用前请自行摸索 ext 格式或等待官方配置更新：

`Pan`、`PanOrder`、`QuarkPan`、`XunleiPan`、`UCPan`、`Sou4K`、`SP360`、`GuiGui`、`RenRen`、`QiShui`、`Market`、`Wallpaper`（壁纸）、`Danmu`（弹幕）、`Push`（手机推送）

### ⚙️ 基础设施类（不可作为站点使用）

`Init`（远程加载引导）、`Proxy`（本地代理 127.0.0.1:9978）、`Config`/`LocalFile`（见上文）等，由 TVBox 框架自动调用，**不要**写进 sites。

---

## 五、实用技巧与注意事项

1. **域名失效是最常见的"站点挂了"**：影视类 csp 大多支持 ext 传域名，换新域名即可复活，jar 不用动。新域名可在对应站点官网或 qist 仓库 issue 区找。
2. **多候选域名容灾**：`Jpys`、`Wogg`、`HDmoli` 等支持数组/逗号分隔多个域名，爬虫自动挑活的。
3. **B站看高清需 cookie**：配置 cookie 文件路径后画质可到 1080P+，无 cookie 也能看但受限。
4. **App 协议站风险**：`AppXxx` 家族依赖第三方 App 服务器，随时可能失效，不要作为主力源。
5. **jar 更新**：关注 qist/tvbox 仓库 `jar/` 目录，更新时替换 `lib/spider.jar` 文件即可（建议核对 md5）。仓库地址：`https://github.com/qist/tvbox`
6. **某个 csp 报错不影响其他站点**：TVBox 按需加载类，单站故障不会拖垮整个配置。
7. **移动端弹幕/推送**：`Danmu`、`Push` 类需配合 TVBox 版本支持，老版本可能无效。

---

## 六、官方配置参考

qist 仓库的 `jsm.json` 是与这个 jar **配套调校**的站点配置（154 站、80 种 csp 用法），遇到不会写的 ext，去这里找同类 csp 照抄：

```
https://github.com/qist/tvbox/blob/master/jsm.json
```

本地留档：`spider/jarwork/jsm.json`

---

*生成于 2026-10-30，基于 spider.jar（2026-10-24 构建静态分析 + jsm.json 官方用法整理）*
