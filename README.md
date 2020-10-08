
## 简介
该项目实现了hexo博客通过页面一键发布文章的功能

- `front_end/` 页面实现，发送post请求实现数据传送
- `node/` 后端服务，接受body参数
  - `index.js` 启动http服务
  - `submit.js` 自动执行命令*
  - `spinner.js` 命令行加载提示
  - `test.js` 
  - `yun.sh` 登录云服务器并自动执行命令

## 用法

**启动服务**

`git clone https://github.com/LiZhaji/auto_submit.git`

`cd node`

`npm i`

进入`submit.js line15` 替换为本地博客目录

进入`yun.sh line4、5` 替换为你的服务器ip和用户名

`node index.js`

**启动页面**

`cd ../front_end`

`serve .`
