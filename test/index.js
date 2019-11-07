'use strict'

const Pair = require('it-pair')
const { collect } = require('streaming-iterables')
const Wrap = require('..')
const assert = require('assert').strict

/* eslint-env mocha */
/* eslint-disable require-await */

describe('it-pb-rpc', () => {
  let pair
  let w

  before(async () => {
    pair = Pair()
    w = Wrap(pair)
  })

  describe('length-prefixed', () => {
    it('lp varint', async () => {
      const data = Buffer.from('hellllllllloooo')

      w.writeLP(data)
      const res = await w.readLP()
      assert.deepEqual(data, res.slice())
    })

    it.skip('lp fixed', async () => {
      const data = Buffer.from('hellllllllloooo')

      w.writeLP(data, true)
      const res = await w.readLP(true)
      assert.deepEqual(data, res.slice())
    })
  })

  describe('plain data', async () => {
    it('whole', async () => {
      const data = Buffer.from('ww')

      w.write(data)
      const r = await w.read(2)

      assert.deepEqual(data, r.slice())
    })

    it('split', async () => {
      const data = Buffer.from('ww')

      const r = Buffer.from('w')

      w.write(data)
      const r1 = await w.read(1)
      const r2 = await w.read(1)

      assert.deepEqual(r, r1.slice())
      assert.deepEqual(r, r2.slice())
    })
  })
})
