const http = require("http");
const autoSubmit = require("./submit");

http
  .createServer((req, res) => {
    const arr = []
    req.on("data", function (chunk) {
      arr.push(chunk)
    });

    req.on("end", async function () {
      // 解析参数
      const body = Buffer.concat(arr).toString()
      const { title, content } = JSON.parse(body);
      console.log(title, content);
      
      // 允许跨域
      res.setHeader("Access-Control-Allow-Origin", "*");
      try {
        await autoSubmit(title, content);
        // 设置响应头部信息及编码
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf8",
        });
        res.end("success");
      } catch (error) {
        res.writeHead(500, {
          "Content-Type": "application/json; charset=utf8",
        });
        res.end(error);
      }
    });
  })
  .listen(8888);

console.log("已运行在端口8888");
