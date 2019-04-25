/**
 * 测试自定义 ioc
 *
 * @author wujohns
 * @date 19/04/25
 */
import { Container } from '../lib'
import { ServiceA } from './service_a'
import { ServiceB } from './service_b'

const container = new Container([ServiceA, ServiceB])
container.getService('serviceA').runB()
container.getService('serviceB').runA()
