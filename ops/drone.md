# drone


下面的例子中，项目名假定为citest


| 缓存类型	 |                   优点                   |                            	缺点                            |
| ---------- | --------------------------------------- | ----------------------------------------------------------- |
| docker缓存  | 	"1. 可以缓存全过程,2. 不限于某个runner节点" | 	需要构建并推送额外的docker镜像                                 |
| 本地缓存	    | 简单                                     | 	"1. 无法缓存构建过程（如yarn build）2. 只生效在单一runner节点" |

## docker缓存（优先使用）
不限制构建的类型，原理是基于docker cache加速执行过的构建。下面的例子中，会将所有的依赖文件打包成一个docker镜像进行加速：
.drone.yml
```
kind: pipeline
type: ssh
name: ci 
trigger:
  ref:
    include:
      - refs/heads/v[0-9]*
      - refs/tags/v[0-9]*
server:
  host:
    from_secret: be_runner
  user:
    from_secret: runner_user
  ssh_key:
    from_secret: runner_key
steps:
  - name: build
    commands:
      - echo $DOCKER_PASSWORD | docker login dcr.xxx.com -u $DOCKER_USERNAME --password-stdin
      - IMAGE_TAG=${DRONE_TAG##*/} make docker-build
    environment:
      DOCKER_USERNAME:
        from_secret: docker_username
      DOCKER_PASSWORD:
        from_secret: docker_password
```


先构建依赖库的镜像，再构建最终使用的镜像
Makefile
```
REGISTRY ?= dcr.xxx.com
IMAGE_NAME ?= xxx/citest
IMAGE_TAG ?= latest

docker-build:
        DOCKER_BUILDKIT=1 docker build . \
                --file Dockerfile.base \
                --tag ${REGISTRY}/${IMAGE_NAME}:deps \
                --cache-from ${REGISTRY}/${IMAGE_NAME}:deps \
                --build-arg BUILDKIT_INLINE_CACHE=1

        DOCKER_BUILDKIT=1 docker build . \
                --file Dockerfile \
                --tag ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} \
                --cache-from ${REGISTRY}/${IMAGE_NAME}:deps \
                --build-arg BUILDKIT_INLINE_CACHE=1
```          

依赖库镜像的Dockerfile
Dockerfile.base
```
FROM node:lts-bullseye as build
WORKDIR /app
COPY ./package.json ./yarn.lock /app/
COPY ./src /app/src
COPY ./public /app/public
RUN yarn --registry=https://registry.npm.taobao.org
RUN yarn build
```
最终业务用镜像的Dockerfile
Dockerfile
```
FROM node:lts-bullseye as build
WORKDIR /app
COPY ./package.json ./yarn.lock /app/
COPY ./src /app/src
COPY ./public /app/public
RUN yarn --registry=https://registry.npm.taobao.org
RUN yarn build

FROM nginx:stable-alpine-slim
COPY --from=build /app/dist/ /usr/share/nginx/html/
EXPOSE 80
```
## 本地缓存
可以用于缓存npm/yarn的依赖库文件，原理是将每次构建时使用的依赖库文件同步到主机的指定目录，然后下一次构建时先同步回来。该方案只能加速下载依赖文件的流程，每次都要重新build，因此如果build时间太久，建议尝试使用上面docker缓存的方案。
### npm cache
.drone.yml
```
kind: pipeline
type: exec
name: ci 
trigger:
  ref:
    include:
      - refs/heads/v[0-9]*
      - refs/tags/v[0-9]*
steps:
  - name: restore-cache
    commands:
      # npm cache，一般缓存到drone的工作目录下
      - mkdir -p /data/cache/citest/node_modules
      - rsync -a /data/cache/citest/node_modules .

  - name: build
    commands:
     - export YARN_CACHE_FOLDER="~/.yarn/cache"
     - npm install --registry=https://registry.npm.taobao.org
     - npm build

  - name: rebuild-cache
    commands:
      # npm cache
      - rsync -a ./node_modules /data/cache/cicdtest/

```
### yarn cache
.drone.yml
```
kind: pipeline
type: exec
name: ci 
trigger:
  ref:
    include:
      - refs/heads/v[0-9]*
      - refs/tags/v[0-9]*
steps:
- name: prepare
  commands:
    - |
      cat <<EOF >> .yarnrc.yml
      # 启用全局cache
      enableGlobalCache: true
      EOF
      
  - name: restore-cache
    commands:
      # yarn cache，这里不区分项目，共同使用一个缓存目录
      - mkdir -p /data/cache/.yarn
      - rsync -a /data/cache/.yarn ~/

  - name: build
    commands:
     - export YARN_CACHE_FOLDER="~/.yarn/cache"
     - yarn --registry=https://registry.npmmirror.com/
     - yarn build

  - name: rebuild-cache
    commands:
      # yarn cache
      - rsync -a ~/.yarn /data/cache/
```