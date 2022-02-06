# teg争霸赛


### 第一关 刷到10000

直接返回a 即可


### 第二关
看js 返回a*a+a 即可


### 第三关 20201021
将js看懂后改写

```js

window = {}

var bl5 = ['A5473788'];
(function (bl1, bl2) {
    var bl4 = function (bl3) {
        while (--bl3) {
            bl1['push'](bl1['shift']());
        }
    };
    bl4(++bl2);
}(bl5, 496));


var _0x23fc = function (bl1, bl2) {
    bl1 = bl1 - 0x0;
    var bl4 = bl5[bl1];
    return bl4;
};

window[_0x23fc('0x0')] = function (bl6) {
    var bl9 = 199999;

    for (var bl8 = 0; bl8 < 199999; bl8++) {
        var bl7 = 0;
        //for (var bl10 = 0; bl10 < bl8; bl10++) {
        //  bl7 += bl6['a'][0];
        //} 这里循环删掉
        bl7 += bl6['a'][0] * bl8;

        if (bl7 % bl6['a'][2] == bl6['a'][1] && bl8 < bl9) {
            bl9 = bl8
            break
        }
    }
    return bl9;
};

console.log(window.A5473788)

```

### 第四关 20201022




原始代码直接放node里面, 报错,

一点点剥皮后发现node 里没有window 对象, 加上即可

```js

window = {}

window.setTimeout = setTimeout

window.A593C8B8 = async (b106) => (($, b106, b105, b104, b103) => {

    let b102 = function* () {
        while ([]) yield[    (b106, b105) => b106 + b105, (b106, b105) => b106 - b105, (b106, b105) => b106 * b105]   [++b105 % 3]['bind'](0, b104, b103)
    }();

    let b101 = function (b102, b101, b100) {
        b103 = b102;
        b104 = b101["next"]()['value']();

        b105 == b106['a']["length"] && b100(-b104)

    };
    // return new Promise(b105 => b106['a']['forEach'](b104 => $["setTimeout"](b103 => b101(b104, b102, b105), b104)))


    return new Promise(b105 => {

        b106['a']['forEach'](b104 => {
            setTimeout(b103 => {
                b101(b104, b102, b105)
            },b104/50)

        })

    })

})(window, b106, 0, 0, 0)

```


可以运行,但是很慢, 搞懂后, 在延时处 b104/50 即可






### 第五关 20201023

这关用的wasm

>https://www.wasm.com.cn/docs/semantics/  

```wasm

(module
  (func $Math.min (;0;) (import "Math" "min") (param i32 i32) (result i32))
  (func $Math.max (;1;) (import "Math" "max") (param i32 i32) (result i32))
  (func $Run (;2;) (export "Run") (param $var0 i32) (param $var1 i32) (result i32)
    (local $var2 i32) (local $var3 i32) (local $var4 i32) (local $var5 i32) (local $var6 i32) (local $var7 i32)
    local.get $var0
    local.set $var2
    local.get $var1
    i32.const 1
    i32.sub
    local.tee $var4
    if
      loop $label1
        local.get $var2
        local.set $var3
        i32.const 0
        local.set $var6
        i32.const 10
        local.set $var7
        loop $label0
          local.get $var3
          i32.const 10
          i32.rem_u
          local.set $var5
          local.get $var3
          i32.const 10
          i32.div_u
          local.set $var3
          local.get $var5
          local.get $var6
          call $Math.max
          local.set $var6
          local.get $var5
          local.get $var7
          call $Math.min
          local.set $var7
          local.get $var3
          i32.const 0
          i32.gt_u
          br_if $label0
        end $label0
        local.get $var2
        local.get $var6
        local.get $var7
        i32.mul
        i32.add
        local.set $var2
        local.get $var4
        i32.const 1
        i32.sub
        local.tee $var4
        br_if $label1
      end $label1
    end
    local.get $var2
  )
)

```

https://github.com/WebAssembly/wabt

wasm 转c, 然后编译时加上 Ofast 优化 即可

`gcc a.c -o a.out -Ofast`

```c

#include <stdio.h>
#include <stdlib.h>
#include <limits.h>
 unsigned max(unsigned a,unsigned b){
     if (a>b)
     return a;
     else return b;
 }

 unsigned min(unsigned a,unsigned b){
     if (a<b)
     return a;
     else return b;
 }
 

int _Run(int _p0, int _p1) {
  int _l2 = 0, _l3 = 0, _l4 = 0, _l5 = 0, _l6 = 0, _l7 = 0;
//   FUNC_PROLOGUE;
  int _i0, _i1, _i2;

  
  _l2 = _p0;
  _i0 = _p1;
  _i1 = 1u;
  _i0 -= 1;
  _l4 = _i0;
  if (_i0) {
    //   printf("i0 = %d\n",_i0);
    _L1: 
    
      _i0 = _l2;
      _l3 = _i0;
      _i0 = 0u;
      _l6 = _i0;
      _i0 = 10u;
      _l7 = _i0;
      _L2: 
    //   printf("i0 = %d\n",_i0);
        _i0 = _l3;
        _i1 = 10u;
        // _i0 = REM_U(_i0, _i1);  //有符号求余数
        _i0 = _i0 % _i1;
        _l5 = _i0 ;
        _i0 = _l3;
        _i1 = 10u;
        // _i0 = DIV_U(_i0, _i1);  //向下整除
        _i0 = _i0 / _i1; 
        _l3 = _i0;
        _i0 = _l5;
        _i1 = _l6;
        _i0 = max(_i0, _i1);
        _l6 = _i0;
        _i0 = _l5;
        _i1 = _l7;
        _i0 = min(_i0, _i1);
        _l7 = _i0;
        _i0 = _l3;
        _i1 = 0u;
        _i0 = _i0 > _i1;
        if (_i0) {goto _L2;}
      _i0 = _l2;
      _i1 = _l6;
      _i2 = _l7;
      _i1 *= _i2;
      _i0 += _i1;
      _l2 = _i0;
      _i0 = _l4;
      _i1 = 1u;
      _i0 -= _i1;
      _l4 = _i0;
      if (_i0) {goto _L1;}
  }
  _i0 = _l2;
//   FUNC_EPILOGUE;
  return _i0;
}

int main( int argc, char *argv[]){
    // int dd = _Run(211814391, 6301083);    
    // printf("%s,%s",argv[1],argv[2]);
    int dd = _Run(atoi(argv[1]),atoi(argv[2]));    
    //211814400
    printf("%d",dd);

    return 0;
}

```



