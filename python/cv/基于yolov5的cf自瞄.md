# 基于yolov5的cf自瞄



## 环境配置
1.安装anconda，创建python3.8的环境
`conda create -n py38 python3.8`

2.切换到该环境，并下载pytroch>=1.7，使用conda会自动帮我们维护cuda（需要良好的网络）
这里我们使用pytorch2.0.1  [pytorch官方](https://pytorch.org/get-started/locally/)
```windows
conda activate py38
conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia 
```
3. 安装yolov5相关依赖
访问  https://github.com/ultralytics/yolov5/releases/tag/v7.0   获取yolov5最新源代码，并安装相关依赖
实测python3.11安装失败，确实scipy>=1.4的依赖，因此使用py3.8较好
```
git clone https://github.com/ultralytics/yolov5.git
cd yolov5
pip install -r requirements.txt coremltools onnx onnx-simplifier onnxruntime-gpu openvino-dev tensorflow
```

4. 获取数据集，标注、训练，获得模型

5. 捕获屏幕，可使用mss，或d3dshot截图（mss库，pyseral库）
```
pip install pyserial
pip install mss
pip install d3dshot
```

6. 下载ghub dll

