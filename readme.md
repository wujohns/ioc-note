# 依赖管理笔记
依赖管理是开发中常见的问题，这里对依赖的管理的各种方案做记录与分析，供之后的开发参考

## 相关环境准备
1. 为了方便执行相应的 `ts` 脚本，需要安装 `ts-node`  
1. 由于用到了 `Reflect Metadata` 特性，需要安装依赖 `npm install reflect-metadata`  
1. 在 `tsconfig.json` 中配置 `emitDecoratorMetadata` 项为 `true`

## ioc
`ioc` 为 `Inversion of Control` 的缩写（控制反转），是面向对象编程中的一种设计原则：  
1. 在面向对象编程中不可避免的会遇到对象与对象间相互依赖的问题（比如A对象调用B对象中的方法）  
1. 若让对象自身去管理这些依赖则不可避免的会造成代码高度耦合，且难以维护和调试  
1. 解决的策略为统一管理相应对象的实例，并按照各对象的依赖将被依赖的对象注入到目标对象，方便目标对象的调用

### js 中的 ioc 策略
目前在 `js` 中的 `ioc` 框架或是使用到 `ioc` 策略的框架有:  
[inversifyJs](http://inversify.io/)  
[injection](https://github.com/midwayjs/injection)  
[nestjs](https://nestjs.com/)

上述经典的 `ioc` 框架中：
1. 会在初始时对依赖的 `service` 做分析，按照相应的依赖链，逐一的去实例化相应的 `service`，并注入到目标对象  
1. 好处是充分利用了 `typescript` 的 `Reflect MetaData` 特性，使得相应注入与标记轻量方便，且在对 `IDE` 的类型提示有比较好的支持  
1. 缺陷是对于实际开发场景中达到一定复杂度后的循环依赖问题没有很好的解决（出现循环依赖时会在依赖分析的步骤中抛错）

## nestjs 相关说明
1. `nestjs` 中使用其自己构建的 `ioc` 结构对相应的 `service` 以及 `controller` 进行管理  
1. 且对于循环依赖问题，提供了 `forwardRef` 的策略解决  
1. 由于使用 `Reflect Metadata` 特性使得其不需要做额外工作便对 `IDE` 的类型提示很友好

## eggjs 的策略
`eggjs` 对于依赖采用了暴力且直接的解决方案：  
1. 即将所有的 `service` 与 `controller` 安目录规则放在全局对象中  
1. 每一个 `service` 和 `controller` 引用这个全局对象实现不同 `service` 的相互调用以及 `controller` 对 `service` 的调用  
1. 使用 `egg-ts-helper` 生成对应 `service` 与 `controller` 的类型声明，以便于给 `IDE` 提供友好的类型提示
1. 由于使用挂载到全局对象的方式，结构上天然解决了循环依赖问题

这里有一个简单的还原 `eggjs` 思路的案例: [egg](/egg)

## 自制简易 ioc
这里综合参考 `nestjs` 与 `eggjs` 做了一个简易版的 `ioc` 作为学习的参考，代码案例参考 [ioc](/ioc)，在 `example` 目录执行 `ts-node run.ts` 即可

## 补充知识
在理解 `ioc` 之前需要对以下知识做了解

### decorator 相关
参考 [decorator](/decorator) 目录下的实际案例，使用 `ts-node` 即可执行验证

### metadata 相关
metadata(元数据): 主要是描述数据属性的数据(比如存储位置，历史数据，类型等)

### reflect metadata
Reflect Metadata 是 ES7 的一个提案，它主要用来在声明的时候添加和读取元数据。使用该特性可以方便的给 `Class` 以及 `Class` 中的属性添加描述，以下是该特性的使用案例，可以使用 `ts-node` 执行验证  
[基础使用案例 base.ts](/reflect_metadata/base.ts)  
[自实现相应的decorator custom.ts](/reflect_metadata/custom.ts)  
[被修饰后增加的默认metadata信息 default.ts](/reflect_metadata/default.ts)  
[注入的简单案例 inject.ts](/reflect_metadata/inject.ts)  

参考链接 [Reflect Metadata](https://jkchao.github.io/typescript-book-chinese/tips/metadata.html#%E5%9F%BA%E7%A1%80)
