# [project]项目配置文件

2023-7-11

配置 pre-commit 以及setup.py  setup.cfg, pyproject.toml

>https://pre-commit.com/#python


使用flake8检查python代码格式
问题： 变量名确实长，因此超过了一行120字符限制


解决方案： 在这行后面加上 `# noqa `

>https://github.com/PyCQA/flake8
ines that contain a # noqa comment at the end will not issue warnings.