const exec = require("child_process").exec;
const fs = require("fs");

const inquirer = require("inquirer");

const Spinner = require("./spinner");
const spinner = new Spinner();

/**
 * 1. 本地更新文章
 * 2. 提交
 * 3. 云服务器
 */

const blogPath = "TODO你的博客路径";
let title = ''

const autoSubmit = (initTitle, content) => {
  // 交互输入
  // const { title } = await inquirer.prompt([
  //   { name: "title", type: "input", message: "请输入文件名：" },
  //   { name: "blogPath", type: "input", message: "请输入博客目录路径：" },
  // ]);

  // 标题的空格换成下划线_
  title = initTitle.replace(/\s/g, '_') 
  
  return new Promise(async (resolve, reject) => {
    try {
      // await myExec(`git pull`);
      
      // 1. create file
      await myExec(`npx hexo new ${title}`);
      await appendContent(title, content);
      await myExec(`npx hexo g`);
      await myExec(`npx hexo d`);

      // 2. push
      await myExec(`git add .`);
      await myExec(`git commit -m "「auto」${title} ${new Date().toLocaleString()}"`);
      await myExec(`git push`);

      // 3. 云服务器
      await myExec(`expect yun.sh`, `.`);

      console.log(`\x1B[32m自动上传成功！\x1B[0m`);
      resolve();
    } catch (err) {
      log(err);
      reject(err);
    }
  });
};

// 统一命令
const myExec = (cmd, path = blogPath) => {
  spinner.start(cmd);
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd: path }, (error, stdout, stderr) => {
      log(error, stdout, stderr);
      if (cmd.includes('hexo new')) {
        title = stdout.split('/').pop().slice(0,-4)
      }
      spinner.stop();
      if (error) {
        reject(error);
      } else {
        console.log(`「\x1B[34m${cmd}\x1B[0m」执行完毕...`);
        resolve(stdout);
      }
    });
  });
};

// 输出
const log = (error, stdout, stderr) => {
  error && console.log("\n\x1B[31mERROR\x1B[0m\n \x1B[31m%s\x1B[0m", error);
  stdout && console.log("\n\x1B[32mINFO\x1B[0m\n \x1B[35m%s\x1B[0m", stdout);
  stderr && console.log("\n\x1B[33mSTDERR\x1B[0m\n \x1B[33m%s\x1B[0m", stderr);
};

// 将内容追加到生成的md文章中
const appendContent = (title, content) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(`${blogPath}/source/_posts/${title}.md`, content, (err) => {
      log(err);
      if (err) {
        reject(err);
      } else {
        resolve("success");
      }
    });
  });
};

module.exports = autoSubmit;
