import{_ as e,o as n,c as i,d}from"./app-CFIaTHNp.js";const s={},a=d(`<h1 id="drone" tabindex="-1"><a class="header-anchor" href="#drone" aria-hidden="true">#</a> drone</h1><p>下面的例子中，项目名假定为citest</p><table><thead><tr><th>缓存类型</th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td>docker缓存</td><td>&quot;1. 可以缓存全过程,2. 不限于某个runner节点&quot;</td><td>需要构建并推送额外的docker镜像</td></tr><tr><td>本地缓存</td><td>简单</td><td>&quot;1. 无法缓存构建过程（如yarn build）2. 只生效在单一runner节点&quot;</td></tr></tbody></table><h2 id="docker缓存-优先使用" tabindex="-1"><a class="header-anchor" href="#docker缓存-优先使用" aria-hidden="true">#</a> docker缓存（优先使用）</h2><p>不限制构建的类型，原理是基于docker cache加速执行过的构建。下面的例子中，会将所有的依赖文件打包成一个docker镜像进行加速： .drone.yml</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kind: pipeline
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
      - IMAGE_TAG=\${DRONE_TAG##*/} make docker-build
    environment:
      DOCKER_USERNAME:
        from_secret: docker_username
      DOCKER_PASSWORD:
        from_secret: docker_password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先构建依赖库的镜像，再构建最终使用的镜像 Makefile</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>REGISTRY ?= dcr.xxx.com
IMAGE_NAME ?= xxx/citest
IMAGE_TAG ?= latest

docker-build:
        DOCKER_BUILDKIT=1 docker build . \\
                --file Dockerfile.base \\
                --tag \${REGISTRY}/\${IMAGE_NAME}:deps \\
                --cache-from \${REGISTRY}/\${IMAGE_NAME}:deps \\
                --build-arg BUILDKIT_INLINE_CACHE=1

        DOCKER_BUILDKIT=1 docker build . \\
                --file Dockerfile \\
                --tag \${REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG} \\
                --cache-from \${REGISTRY}/\${IMAGE_NAME}:deps \\
                --build-arg BUILDKIT_INLINE_CACHE=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>依赖库镜像的Dockerfile Dockerfile.base</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>FROM node:lts-bullseye as build
WORKDIR /app
COPY ./package.json ./yarn.lock /app/
COPY ./src /app/src
COPY ./public /app/public
RUN yarn --registry=https://registry.npm.taobao.org
RUN yarn build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终业务用镜像的Dockerfile Dockerfile</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>FROM node:lts-bullseye as build
WORKDIR /app
COPY ./package.json ./yarn.lock /app/
COPY ./src /app/src
COPY ./public /app/public
RUN yarn --registry=https://registry.npm.taobao.org
RUN yarn build

FROM nginx:stable-alpine-slim
COPY --from=build /app/dist/ /usr/share/nginx/html/
EXPOSE 80
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="本地缓存" tabindex="-1"><a class="header-anchor" href="#本地缓存" aria-hidden="true">#</a> 本地缓存</h2><p>可以用于缓存npm/yarn的依赖库文件，原理是将每次构建时使用的依赖库文件同步到主机的指定目录，然后下一次构建时先同步回来。该方案只能加速下载依赖文件的流程，每次都要重新build，因此如果build时间太久，建议尝试使用上面docker缓存的方案。</p><h3 id="npm-cache" tabindex="-1"><a class="header-anchor" href="#npm-cache" aria-hidden="true">#</a> npm cache</h3><p>.drone.yml</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kind: pipeline
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
     - export YARN_CACHE_FOLDER=&quot;~/.yarn/cache&quot;
     - npm install --registry=https://registry.npm.taobao.org
     - npm build

  - name: rebuild-cache
    commands:
      # npm cache
      - rsync -a ./node_modules /data/cache/cicdtest/

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="yarn-cache" tabindex="-1"><a class="header-anchor" href="#yarn-cache" aria-hidden="true">#</a> yarn cache</h3><p>.drone.yml</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kind: pipeline
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
      cat &lt;&lt;EOF &gt;&gt; .yarnrc.yml
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
     - export YARN_CACHE_FOLDER=&quot;~/.yarn/cache&quot;
     - yarn --registry=https://registry.npmmirror.com/
     - yarn build

  - name: rebuild-cache
    commands:
      # yarn cache
      - rsync -a ~/.yarn /data/cache/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),l=[a];function r(c,v){return n(),i("div",null,l)}const m=e(s,[["render",r],["__file","drone.html.vue"]]);export{m as default};
