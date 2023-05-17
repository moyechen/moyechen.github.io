# [计算机网络]iptables



-A {INPUT|OUTPUT}：将防火墙规则附加到输入或输出链。
-p icmp：使用 ICMP 协议。
-p icmp --icmp-type {0|8}OR ：icmp 按数字（如“0”）或名称（如“回显回复”）匹配选项。--icmp-type {echo-reply|echo-request}
-j {ACCEPT|REJECT|DROP}：告诉 Linux 如果数据包匹配该怎么做。接受表示让数据包通过。丢弃或拒绝表示将数据包丢弃在地板上。当您希望另一端（客户端或主机或机器人）知道端口无法访问时，请使用 REJECT 并使用 DROP 连接到您不希望人员/机器人/客户端看到的主机。
-m state --state NEW,ESTABLISHED,RELATED：使用 or 选项进行扩展 icmp 数据包匹配。这些值是：--ctstate-m state
INVALID：数据包与未知连接关联。
NEW：数据包已启动新连接或以其他方式与未在两个方向上看到数据包的连接相关联。
ESTABLISHED：数据包与在两个方向上看到数据包的连接相关联。
RELATED：数据包正在启动新连接，但与现有连接相关联，例如 FTP 数据传输或 ICMP 错误。


>https://wooyun.js.org/drops/Iptables%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B.html