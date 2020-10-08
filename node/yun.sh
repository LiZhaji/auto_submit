#!/usr/tcl/bin/expect

set timeout 30
set host "TODO服务器ip"
set username "TODO用户名"

spawn ssh $username@$host
expect "Welcome*" 

send "cd hexo_blog\r"
expect "$"
send "git pull\r"
expect "done"
send "hexo g\r"
expect "files generated"
# interact # 不保持登录
