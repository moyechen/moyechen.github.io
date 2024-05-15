import{_ as e,o as i,c as n,d}from"./app-CFIaTHNp.js";const l={},c=d(`<h1 id="部署paddle框架之ocr" tabindex="-1"><a class="header-anchor" href="#部署paddle框架之ocr" aria-hidden="true">#</a> 部署paddle框架之ocr</h1><h2 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤" aria-hidden="true">#</a> 步骤</h2><p>1.下载安装anconda 2. 创建一个环境先</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>conda create -n paddle_env
conda activate paddle_env
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 安装FastDpeloy python包（详细文档请参考\`部署环境准备\`）

# 约1.2g
pip install fastdeploy-gpu-python -f https://www.paddlepaddle.org.cn/whl/fastdeploy.html

# 约 3g
conda config --add channels conda-forge &amp;&amp; conda install cudatoolkit=11.2 cudnn=8.2

# 下载部署示例代码
git clone https://github.com/PaddlePaddle/FastDeploy.git
cd  FastDeploy/examples/vision/ocr/PP-OCR/cpu-gpu/python

# 如果您希望从PaddleOCR下载示例代码，请运行
git clone https://github.com/PaddlePaddle/PaddleOCR.git
# 注意：如果当前分支找不到下面的fastdeploy测试代码，请切换到dygraph分支
git checkout dygraph
cd PaddleOCR/deploy/fastdeploy/cpu-gpu/python

# 下载PP-OCRv3文字检测模型
wget https://paddleocr.bj.bcebos.com/PP-OCRv3/chinese/ch_PP-OCRv3_det_infer.tar
tar -xvf ch_PP-OCRv3_det_infer.tar
# 下载文字方向分类器模型
wget https://paddleocr.bj.bcebos.com/dygraph_v2.0/ch/ch_ppocr_mobile_v2.0_cls_infer.tar
tar -xvf ch_ppocr_mobile_v2.0_cls_infer.tar
# 下载PP-OCRv3文字识别模型
wget https://paddleocr.bj.bcebos.com/PP-OCRv3/chinese/ch_PP-OCRv3_rec_infer.tar
tar -xvf ch_PP-OCRv3_rec_infer.tar

# 下载预测图片与字典文件
wget https://gitee.com/paddlepaddle/PaddleOCR/raw/release/2.6/doc/imgs/12.jpg
wget https://gitee.com/paddlepaddle/PaddleOCR/raw/release/2.6/ppocr/utils/ppocr_keys_v1.txt

# 运行部署示例
# 在CPU上使用Paddle Inference推理
python infer.py --det_model ch_PP-OCRv3_det_infer --cls_model ch_ppocr_mobile_v2.0_cls_infer --rec_model ch_PP-OCRv3_rec_infer --rec_label_file ppocr_keys_v1.txt --image 12.jpg --device cpu --backend paddle
# 在CPU上使用OenVINO推理
python infer.py --det_model ch_PP-OCRv3_det_infer --cls_model ch_ppocr_mobile_v2.0_cls_infer --rec_model ch_PP-OCRv3_rec_infer --rec_label_file ppocr_keys_v1.txt --image 12.jpg --device cpu --backend openvino
# 在CPU上使用ONNX Runtime推理
python infer.py --det_model ch_PP-OCRv3_det_infer --cls_model ch_ppocr_mobile_v2.0_cls_infer --rec_model ch_PP-OCRv3_rec_infer --rec_label_file ppocr_keys_v1.txt --image 12.jpg --device cpu --backend ort
# 在CPU上使用Paddle Lite推理
python infer.py --det_model ch_PP-OCRv3_det_infer --cls_model ch_ppocr_mobile_v2.0_cls_infer --rec_model ch_PP-OCRv3_rec_infer --rec_label_file ppocr_keys_v1.txt --image 12.jpg --device cpu --backend pplite
# 在GPU上使用Paddle Inference推理
python infer.py --det_model ch_PP-OCRv3_det_infer --cls_model ch_ppocr_mobile_v2.0_cls_infer --rec_model ch_PP-OCRv3_rec_infer --rec_label_file ppocr_keys_v1.txt --image 12.jpg --device gpu --backend paddle
# 在GPU上使用Paddle TensorRT推理
python infer.py --det_model ch_PP-OCRv3_det_infer --cls_model ch_ppocr_mobile_v2.0_cls_infer --rec_model ch_PP-OCRv3_rec_infer --rec_label_file ppocr_keys_v1.txt --image 12.jpg --device gpu --backend pptrt
# 在GPU上使用ONNX Runtime推理
python infer.py --det_model ch_PP-OCRv3_det_infer --cls_model ch_ppocr_mobile_v2.0_cls_infer --rec_model ch_PP-OCRv3_rec_infer --rec_label_file ppocr_keys_v1.txt --image 12.jpg --device gpu --backend ort
# 在GPU上使用Nvidia TensorRT推理
python infer.py --det_model ch_PP-OCRv3_det_infer --cls_model ch_ppocr_mobile_v2.0_cls_infer --rec_model ch_PP-OCRv3_rec_infer --rec_label_file ppocr_keys_v1.txt --image 12.jpg --device gpu --backend trt

# 同时, FastDeploy提供文字检测,文字分类,文字识别三个模型的单独推理,
# 有需要的用户, 请准备合适的图片, 同时根据自己的需求, 参考infer.py来配置自定义硬件与推理后端.

# 在CPU上,单独使用文字检测模型部署
python infer_det.py --det_model ch_PP-OCRv3_det_infer  --image 12.jpg --device cpu

# 在CPU上,单独使用文字方向分类模型部署
python infer_cls.py --cls_model ch_ppocr_mobile_v2.0_cls_infer --image 12.jpg --device cpu

# 在CPU上,单独使用文字识别模型部署
python infer_rec.py  --rec_model ch_PP-OCRv3_rec_infer --rec_label_file ppocr_keys_v1.txt --image 12.jpg --device cpu

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),r=[c];function s(a,_){return i(),n("div",null,r)}const t=e(l,[["render",s],["__file","部署paddle框架之ocr.html.vue"]]);export{t as default};
