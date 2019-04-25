/**
 * Reflect Metadata 基础使用
 *
 * @author wujohns
 * @date 19/04/17
 */
import 'reflect-metadata'

@Reflect.metadata('inClass', 'AAA')
class Test {
  @Reflect.metadata('inProperty', 'BBB')
  private ele

  @Reflect.metadata('inMethod', 'CCC')
  public hello (): string {
    return 'hello'
  }

  @Reflect.metadata('inAccessor', 'DDD')
  public get elee () {
    return 'elee'
  }
}

// 获取相应的描述
const testObj = new Test()
console.log(Reflect.getMetadata('inClass', Test))   // 'AAA'
console.log(Reflect.getMetadata('inProperty', testObj, 'ele'))  // 'BBB
console.log(Reflect.getMetadata('inMethod', testObj, 'hello'))  // 'CCC'
console.log(Reflect.getMetadata('inAccessor', testObj, 'elee'))  // 'DDD'

// Tips: Reflect.metadata 的结构
type metadata =
  (
    metadataKey: any,
    metadataValue: any
  ) => {
    <T extends (new(...args: any[]) => any)>(target: T): void;
    (target: object, propertyKey: string | symbol): void;
  }
