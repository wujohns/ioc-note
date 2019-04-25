/**
 * 自定义 decorator 的方式
 *
 * @author wujohns
 * @date 19/04/17
 */
import 'reflect-metadata'

const dClass = () => {
  return (target) => {
    Reflect.defineMetadata('classMetaData', 'a', target)
  }
}

const dMethod = () => {
  return (target, key, descriptor) => {
    Reflect.defineMetadata('methodMetaData', 'b', target, key)
  }
}

@dClass()
class Test {
  @dMethod()
  kk () {
    console.log('kk')
  }
}

const test = new Test()
console.log(Reflect.getMetadata('classMetaData', Test))  // a
console.log(Reflect.getMetadata('methodMetaData', test, 'kk')) // b
