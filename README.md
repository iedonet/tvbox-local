# TVBox 配置资源梳理

> 基于当前提供的 JSON 配置整理。判断依据：`spider`、`sites[].jar`、`sites[].api`、`sites[].ext` 等字段中实际引用的路径或 URL。

---

## 一、JAR 包（含伪装扩展名）

### 1.1 明面 `.jar`

| 引用位置 | 路径 | 说明 |
|---|---|---|
| 全局 `spider` | `./lib/kjtw.jar` | 爬虫核心包，提供 `csp_Config`、`csp_LocalFile`、`csp_AppRJ`、`csp_Jpys`、`csp_Gz360`、`csp_Wwys`、`csp_XYQHiker`、`csp_Bili`、`csp_BiliYS`、`csp_App99` 等类 |
| 站点 `csp_Kugou` | `./lib/KG.jar` | 酷狗音乐 |

### 1.2 伪装成 `.png` 的 jar

| 引用路径 | 被哪些站点引用 |
|---|---|
| `./js/aw.png` | `Douban`（依朵科技）、`JinPai`（金牌天微）、`Guazi`（呱子影拭）、`AppV7Fz`（小猪秒播）、`AppV7Xyz`（柚子秒播）、`AppV7Xnm`（牛马秒播）、`NewGrV2`（秋天秒播）、`AppV7Mtq`（自建秒播）、`Dubk`（独播影库）、`AppV7Dsx`（师兄秒播）、`Czzy`（厂长影拭）、`AppV7Xhr`（华人秒播）—— 共 **12 处** |

> 本配置中 **没有** `jp.png`、`fan.txt`、`se.jar`，也没有柠檬站点的 png+md5 远程 jar。

**JAR 小结**：实际 jar 文件 3 个 —— `kjtw.jar`、`KG.jar`、`aw.png`（伪装）。

---

## 二、JSON 配置文件

| 引用位置 | 路径/URL | 用途 |
|---|---|---|
| 站点 `Bili`（🅱️依朵🔹哔哩） | `./js/依朵哔哔.json` | B站频道/筛选配置 |
| 站点 `农民影拭` | `./lib/农民影视.json` | XYQHiker 爬虫配置 |
| 站点 `哔哩哔哩演唱会` | `https://g.blfrp.cn/https://raw.githubusercontent.com/tushen6/Tomorrow/master/json/哔哩哔哩演唱会.json` | 远程 B站频道配置 |
| 站点 `哔哩哔哩听书` | `https://g.blfrp.cn/https://raw.githubusercontent.com/tushen6/Tomorrow/master/json/哔哩哔哩听书.json` | 远程 B站频道配置 |
| 站点 `哔哩哔哩相声` | `https://g.blfrp.cn/https://raw.githubusercontent.com/tushen6/Tomorrow/master/json/哔哩哔哩相声.json` | 远程 B站频道配置 |
| 站点 `哔哩哔哩小品` | `https://g.blfrp.cn/https://raw.githubusercontent.com/tushen6/Tomorrow/master/json/哔哩哔哩小品.json` | 远程 B站频道配置 |
| 站点 `哔哩哔哩戏曲` | `https://g.blfrp.cn/https://raw.githubusercontent.com/tushen6/Tomorrow/master/json/哔哩哔哩戏曲.json` | 远程 B站频道配置 |

---

## 三、JS 脚本

| 引用位置 | 路径 | 说明 |
|---|---|---|
| `cat_荐片app`（☀荐片🔹蓝光） | `./js/cat_荐片app.js` | JS 爬虫 |
| `Cat_荐片`（☀鉴片🔹极速） | `./js/jianpian_open.js` | JS 爬虫 |
| `好好看`（☀好看🔹秒播） | `./js/pack.js` | JS 爬虫（含 appid/host 等 ext） |
| `cat_非凡网`（☀非凡🔹影視） | `./js/非凡.js` | JS 爬虫 |
| `cat_剧迷网`（☀剧迷🔹视频） | `./js/高清剧迷.js` | JS 爬虫 |
| `Cat_聚合短剧`（🎦聚合🔹短剧） | `./js/duanju_juhe.js` | JS 爬虫 |
| `Cat_百度短剧`（🎦百度🔹短剧） | `./js/baidu_dj.js` | JS 爬虫 |

---

## 四、PY 脚本

| 引用位置 | 路径 | 说明 |
|---|---|---|
| `央库云`（🥇央视🔹大全） | `./py/央库云.py` | Python 爬虫 |
| `py_华数`（☀华数🔹视频） | `./py/华数.py` | Python 爬虫 |

---

## 五、其他资源文件

| 类型 | 引用位置 | 路径/说明 |
|---|---|---|
| Cookie 文件 | `哔哩视频`、演唱会/听书/相声/小品/戏曲 | `http://127.0.0.1:9978/file/TVBox/bili_cookie.txt` |
| 直播源 | `lives` 线路1~5 | 远程 txt/m3u/php 地址（`migu.txt`、`iptv.txt`、`tv.txt`、`iptv.php`、`FYTV.m3u`） |
| 壁纸 | 全局 `wallpaper` | `https://uapis.cn/api/v1/random/image?category=landscape` |
| 解析接口 | `parses` | 远程解析 URL（`jx.abplayer.top`、`yparse.ik9.cc`、`json2.hgyx.vip`、`okjx.cc`） |

---

## 六、按 `api` 类型归类

| `api` 值 | 来源 | 站点 |
|---|---|---|
| `csp_DoubanAmns` | `aw.png` | Douban |
| `csp_Config` | `kjtw.jar` | 配置中心 |
| `csp_LocalFile` | `kjtw.jar` | 本地 |
| `csp_Kugou` | `KG.jar` | 某狗音乐 |
| `csp_AppRJ` | `kjtw.jar` | 热播影视 |
| `csp_JinPaiAmns` | `aw.png` | 金牌天微 |
| `csp_Jpys` | `kjtw.jar` | 金牌备用 |
| `csp_GuaziAmns` | `aw.png` | 呱子影拭 |
| `csp_Gz360` | `kjtw.jar` | 瓜子备用 |
| `csp_AppV7Amns` | `aw.png` | 小猪/柚子/牛马/自建/师兄/华人 |
| `csp_NewGrV2Amns` | `aw.png` | 秋天秒播 |
| `csp_DubkAmns` | `aw.png` | 独播影库 |
| `csp_CzzyAmns` | `aw.png` | 厂长影拭 |
| `csp_Wwys` | `kjtw.jar` | 农民影视 |
| `csp_XYQHiker` | `kjtw.jar` | 农民影拭 |
| `csp_BiliYS` | `kjtw.jar` | 哔里影视 |
| `csp_App99` | `kjtw.jar` | 半日蓝光 |
| `csp_Bili` | `kjtw.jar` | 依朵哔哩 + 演唱会/听书/相声/小品/戏曲 |

> `csp_Nmvod` 在本配置中无对应站点（柠檬站点已移除）。

---

## 七、总览清单

| 类型 | 文件/资源 | 数量 |
|---|---|---|
| JAR（明面） | `kjtw.jar`、`KG.jar` | 2 |
| JAR（伪装） | `aw.png`（12 处引用） | 1 |
| JSON（本地） | `依朵哔哔.json`、`农民影视.json` | 2 |
| JSON（远程） | 演唱会/听书/相声/小品/戏曲 共 5 个 | 5 |
| JS | `cat_荐片app.js`、`jianpian_open.js`、`pack.js`、`非凡.js`、`高清剧迷.js`、`duanju_juhe.js`、`baidu_dj.js` | 7 |
| PY | `央库云.py`、`华数.py` | 2 |
| Cookie | `bili_cookie.txt` | 1 |
| 直播源 | 5 条线路 | 5 |
| 解析 | 4 个解析接口 | 4 |

---

## 核心结论

- 真正被当作 jar 加载的文件只有 **3 个**：`kjtw.jar`、`KG.jar`、`aw.png`（伪装成 png 的 jar）。
- `aw.png` 被 **12 个站点**共用，是复用最多的 jar 包。
- 其余为 JSON/JS/PY 脚本和远程资源（直播源、解析、壁纸、Cookie）。
- 本配置中 **没有** `jp.png`、`fan.txt`、`se.jar`，也没有柠檬站点。

---

## 八、冗余清理记录（2026-10-30）

已将 32 个未被 api.json 引用的文件移入 macOS 废纸篓（可随时恢复）。清理后目录仅保留 14 个在用文件 + api.json：

- `js/`（9 个）：aw.png、依朵哔哔.json、cat_荐片app.js、jianpian_open.js、pack.js、非凡.js、高清剧迷.js、duanju_juhe.js、baidu_dj.js
- `lib/`（3 个）：kjtw.jar、KG.jar、农民影视.json
- `py/`（2 个）：央库云.py、华数.py

清理的文件包括：js/ 下 11 个旧爬虫脚本、3 个旧 JSON（douban/wogg/jianpian）、drpy 引擎 2 个、js.jpg；lib/ 下 aw.jar（与 js/aw.png 重复）、jp.png、星辰影院.js、文才.json；py/ 下 8 个旧 PY 站点脚本及错放的 优夏.js、drpy2.min.js。

完整备份：`spider/iedo_backup_20261030/`（清理前全量，8.7M）。
