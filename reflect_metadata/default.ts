/**
 * 被修饰后增加的默认 metadata 信息
 *
 * @author wujohns
 * @date 19/04/18
 */
import 'reflect-metadata'

/**
 * 虽然这些修饰器没有进行任何动作，但是会给被修饰的数据添加 metadata
 * design:type - 数据类型
 * design:paramtypes - 函数参数类型
 * design:returntype - 函数返回的数据类型
 */
const dClass = (): ClassDecorator => (target) => {
  // do nothing
}
const dProperty = (): PropertyDecorator => (target, key) => {
  // do nothing
}
const dMethod = (): MethodDecorator => (target, key, descriptor) => {
  // do nothing
}

class Other {}

@dClass()
class Test {
  constructor (public readonly other: Other) {}

  @dProperty()
  a: string

  @dMethod()
  hello (b: string): string {
    return b
  }

  no (c: string): string {
    return c
  }
}

const test = new Test(new Other())

console.log('--- class metadata ---')
console.log(Reflect.getMetadata('design:type', Test)) // undefined
console.log(Reflect.getMetadata('design:paramtypes', Test)) // [ [Function: Other] ]
console.log(Reflect.getMetadata('design:returntype', Test)) // undefined

console.log('--- property metadata ---')
console.log(Reflect.getMetadata('design:type', test, 'a')) // [Function: String]
console.log(Reflect.getMetadata('design:paramtypes', test, 'a')) // undefined
console.log(Reflect.getMetadata('design:returntype', test, 'a')) // undefined

console.log('--- method metadata ---')
console.log(Reflect.getMetadata('design:type', test, 'hello')) // [Function: Function]
console.log(Reflect.getMetadata('design:paramtypes', test, 'hello')) // [ [Function: String] ]
console.log(Reflect.getMetadata('design:returntype', test, 'hello')) // [Function: String]

console.log('--- no metadata ---')
console.log(Reflect.getMetadata('design:type', test, 'no')) // undefined
console.log(Reflect.getMetadata('design:paramtypes', test, 'no')) // undefined
console.log(Reflect.getMetadata('design:returntype', test, 'no')) // undefined
