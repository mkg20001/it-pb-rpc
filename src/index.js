'use strict'

module.exports = (duplex) => {
  return {
    read: (bytes) => {
      // just read
    },
    readLP: (useBE32) => {
      // read, decode
    },
    readPB: (proto) => {
      // readLP, decode
    },
    write: (data) => {
      // just write
    },
    writeLP: (data, useBE32) => {
      // encode, write
    },
    writePB: (data, proto) => {
      // encode, writeLP
    },

    unwrap: () => {
      // returns vanilla duplex again, terminates all reads/writes from this object
    }
  }
}
