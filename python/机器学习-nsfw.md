# nsfw

调研

## 0. https://github.com/yahoo/open_nsfw
python2

训练好的模型 https://github.com/TechnikEmpire/NsfwSqueezenet

python3版本(不可用)  -> https://github.com/rahiel/open_nsfw-

可远程调用版本
版本1 https://github.com/loretoparisi/docker/tree/master/nsfwaas

版本2 https://github.com/nikos-glikis/nsfw-docker


https://github.com/rockyzhengwu/nsfw

## 1. https://github.com/devzwy/open_nsfw_android
离线识别，基于TensorFlow实现。识别只需20ms,可断网测试，成功率99%，调用只要一行代码，从雅虎的开源项目open_nsfw移植，该模型文件可用于iOS、java、C++等平台

python 版本(识别率很低)
https://github.com/devzwy/NSFW-Python


## 2. https://github.com/mdietrichstein/tensorflow-open_nsfw
仅支持jpeg


## 3. https://github.com/yangbisheng2009/nsfw-resnet
要自己训练

## 4. https://github.com/EugenCepoi/nsfw_api
一键docker 带api
可流式读取输出(非常快,目前使用)

```
docker run -it -p 127.0.0.1:5000:5000/tcp --env PORT=5000 eugencepoi/nsfw_api:latest


curl -X GET -H 'Content-Type: application/json' http://localhost:5000\?url\=https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png

{
  "score": 0.00016061133646871895,
  "url": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
}
```
