# 使用onedrive在win10和linux之间同步

我们在写代码的时候,经常有这样的场景:
在Windows下开发,然后放在服务器上跑

刚开始开发,整个项目只有一个文件(.py) ,这时候我使用xshell链接到服务器,使用rz命令上传文件, 就解决了问题

之后, 使用PyCharm 远程调试, 链接服务器进行同步, 也解决一定的问题,  

最近跟风上了一年的OneDrive 365 (家庭版,6人240,一人40), onedrive 空间从免费的5g提升到了1tb,

同时也看到了大佬的github [skilion](https://github.com/skilion/onedrive), 

!!!! 在ubuntu16上有些许问题， 因为大佬不在维护， 因此使用另外一个同学的产品
`https://github.com/abraunegg/onedrive.git`


本人环境: win10 , centos7(1g 1h 1m)

## 上手:

### 事前准备: Fedora/CentOS
```sh
sudo yum install libcurl-devel
sudo yum install sqlite-devel
curl -fsS https://dlang.org/install.sh | bash -s dmd
```

### 安装
```sh
git clone https://github.com/skilion/onedrive.git
cd onedrive
make
sudo make install
```

### 卸载
```sh
sudo make uninstall
# delete the application state
rm -rf .config/onedrive
```

<span id="pz"></span>

### 进行配置
如果不配置, 你Onedrive中的文件默认会下载到 `~/OneDrive`这个目录,并且隐藏的文件会跳过
如果你想改变位置等等, 做以下操作

```sh
mkdir -p ~/.config/onedrive
cp ./config ~/.config/onedrive/config
vim ~/.config/onedrive/config
```


可用选项:
* `sync_dir`:  本地的onedrive文件夹路径,onedrive中的文件会保存在本地的这个目录
* `skip_file`: 设置跳过的文件

__demo:__

```
# Directory where the files will be synced
sync_dir = "~/OneDrive"
# Skip files and directories that match this pattern
skip_file = ".*|~*"
```

Patterns are case insensitive. `*` and `?` [wildcards characters](https://technet.microsoft.com/en-us/library/bb490639.aspx) are supported. Use `|` to separate multiple patterns.

Note: 改变配置文件后, 应该执行 `onedrive --resync` 以获得同步

### 选择性同步
选择性同步允许你只同步一个文件夹,或者是一个文件
方法:
- 首先,确保你做了上面的配置文件,如果没有,[点击跳转](#pz)
- 然后, 在~/.config/onedrive/  目录下创建文件 `sync_list` 

`sync_list`:的一个例子
```text
Backup
Documents/latest_report.docx
Work/ProjectX
notes.txt
```
Note: 改变配置文件后, 应该执行 `onedrive --resync` 以获得同步



## 本人的使用方法

本人使用 [vnote](https://github.com/tamlok/vnote) 来编写笔记, 同时使用 [viki](https://github.com/tamlok/viki) 来作为web服务

具体操作:
- 在onedrive 根目录下新建文件夹`blog`
- 打开vnote, 新建一个笔记本,并设置根目录为 `onedrive/blog`
- 下载最新版的viki源文件,               [下载链接](https://github.com/tamlok/viki/archive/v2.0.1.zip),解压缩

