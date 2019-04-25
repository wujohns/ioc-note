/**
 * 依赖注入简单案例
 *
 * @author wujohns
 * @date 19/04/18
 */
import 'reflect-metadata'

const injectable = (): ClassDecorator => (target) => {
  // do nothing
}

class OtherService1 { a = 1 }
class OtherService2 { a = 2 }

/**
 * 虽然这里的 class 修饰器没有做任何动作，但是在会默认的给其 metadata 添加如下属性:
 * design:type - 被修饰的数据的类型
 * design:paramtypes - 被修饰的函数的参数
 * design:returntype - 被修饰的函数返回的参数
 */
@injectable()
class TestService {
  constructor (
    private readonly otherService1: OtherService1,
    public readonly otherService2: OtherService2
  ) {
    // do nothing
  }

  testMethod1 () { console.log(this.otherService1.a) }
  testMethod2 () { console.log(this.otherService2.a) }
}

// 依据 metadata 中的 design:paramtypes 自动初始化
type Constructor<T = any> = new (...args: any[]) => T
const factory = <T>(target: Constructor<T>): T => {
  const providers = Reflect.getMetadata('design:paramtypes', target)
  const args = providers.map((provider) => new provider())
  return new target(...args)
}

const test = factory(TestService)
test.testMethod1()  // 1
test.testMethod2()  // 2
