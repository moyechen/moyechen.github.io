# k8s




## alias k8s


为了方便查看日志，编写了一个alias

alias klmes="kubectl  logs -f  `kubectl get pods | grep '^mes-be' | grep 'Running' -m 1 |  awk '{print $1}'`"

但是在断网环境下打开新终端，发现zsh会尝试运行该命令, 
在网络不通环境下打开新终端，则会导致终端卡死


### 问题定位
经过多次尝试，我编写了一个二进制程序echo222， 放在`/usr/local/bin/`下，
并编写了如下的alias

alias ee="echo222"

经测试，没有执行该语句


再次编写为

alias ee="echo `echo222`"
经测试，执行了双引情况下号下，``（反引号）包裹的语句，

再测试下单引号
alias ee='echo `echo222`'
经测试，问题解决

### 解决方案1
使用函数

klmes () {
kubectl  logs -f  `kubectl get pods | grep '^mes-be' | grep 'Running' -m 1 |  awk '{print $1}'`
}


### 解决方案2


>https://stackoverflow.com/questions/1250079/how-to-escape-single-quotes-within-single-quoted-strings

使用单引号包住
alias klmes='kubectl  logs -f  $(kubectl get pods | grep "^mes-be" | grep "Running" -m 1 |  awk  '"'"'{print $1}'"'"')'