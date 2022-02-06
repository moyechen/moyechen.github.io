# adb

### adb  更换壁纸 2020/4/29

```am start -d file:////data/local/tmp/black_white.png -a android.service.wallpaper.CROP_AND_SET_WALLPAPER -f 0x1 com.android.launcher3/.WallpaperCropActivity```



### adb 授予/撤销 应用权限  2020/4/27


```
# 给微信授予高精度定位权限
adb shell pm grant com.tencent.mm android.permission.ACCESS_FINE_LOCATION

# 撤销
adb shell pm revoke com.tencent.mm android.permission.ACCESS_FINE_LOCATION


```

#### 有用的链接

1. https://www.cnblogs.com/jianxu/p/5380882.html
2. https://ligboy.org/?p=429   AppOps ，设置权限（在一加5, 7.1.1上简单测试未生效）


### adb推送后，图片在相册中不显示 2020/4/26

[解决方案](https://www.zhipanyou.com/help/a.php?t=5a6J5Y2TYWRi5ZG95Luk5Yi35paw5Zu+5bqTIC0gamltaWMwODMx55qE5Y2a5a6iX0NTRE7ljZrlrqI=&u=aHR0cDovL3d3dy5iYWlkdS5jb20vbGluaz91cmw9cG5jVkdXWTdBSWxaajVPblBHNnRaaWlXTEdmLTRkSHVJcUpZMnVHQUtvMXZ4N3JtY2V2WTR6cGxrNmM2YkU1RWpwUFp0cjBoQ2xSU3pDTkVqMEdIU1dWMVlfZnl6MGxxb1lrMUk2eVBEckc=)

[博客1](https://blog.csdn.net/lincyang/article/details/45766479)



命令1刷新图片：adb shell am broadcast -a android.intent.action.MEDIA_SCANNER_SCAN_FILE -d file:///sdcard/Pictures/xx.png



命令2刷新目录：adb shell am broadcast -a android.intent.action.MEDIA_MOUNTED -d file:///sdcard/Pictures
▲ android < 4.4

EXTERNAL_CONTENT_URI

Intent.ACTION_MEDIA_MOUNTED

一般命令2比较有用。但是命令2，需要权限，因此使用命令1


————————————————
版权声明：本文为CSDN博主「jimic0831」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/jimic0831/article/details/78274265


### 清空应用缓存 2020/4/19

`adb shell pm clear <PACKAGE>`
