/**
 * entry
 *
 * @author wujohns
 * @date 19/04/19
 */
'use strict'

const A = require('./a')
const B = require('./b')

const GG = {}
GG.a = new A(GG)
GG.b = new B(GG)

GG.a.echoA()
GG.b.echoB()
GG.a.runB()
GG.b.runA()
