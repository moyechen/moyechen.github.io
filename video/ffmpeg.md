# ffmpeg



接入监控系统后， 就需要对这些视频做一定的处理，水星安防app提供的云服务有事件录像、人形识别等功能，大概一年90元，
我们肯定是不会掏这个钱的，所以就需要自己处理



## 第一个应用 制作延时摄像


1. 从每日的太阳升起到日落，将越12小时的视频，快进到10分钟左右



```
ffmpeg  -hwaccel auto -i /Users/teletraan/Downloads/2023-10-10T11-15-01.mp4 -c:v libx265  -vf "setpts=0.02*PTS,scale=640:-1,fps=15" -b:v 500K -an -ss 00:00:00 -t 00:01:00 output.mp4
```


由于我们录像机设置的最大是15分钟，所以还需要拼接一下




15分钟要102秒，那么12小时就是4×102s×12 = 

> 
> 
> 优化，直接用copy，就不用重新编码了
> ```
> ffmpeg  -hwaccel auto -i /Users/teletraan/Downloads/2023-10-10T11-15-01.mp4 -c:v copy  -vf "setpts=0.02*PTS,scale=640:-1,fps=15" -b:v 500K -an -ss 00:00:00 -t 00:01:00 output.mp4
> ```


错误的，改了码率，不能这么搞




windows 将一个目录下的所有图片剪辑为视频

```
@echo off
setlocal enabledelayedexpansion

set "input_folder=%~dp0"
set "output_file=output.mp4"
set "framerate=30"
set "codec=hevc_qsv"
set "pix_fmt=yuv420p"
set "filelist=filelist.txt"
set "input_files="
(for %%i in ("*.jpg") do (
  echo file '%%i'
)) > "%filelist%"



e:/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe -f concat -safe 0 -i  "%filelist%"  -framerate %framerate% -c:v %codec% -pix_fmt %pix_fmt% "%output_file%"

pause

```