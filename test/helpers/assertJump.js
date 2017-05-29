module.exports = function(error) {
  assert.equal(error.message.search('invalid JUMP') > -1 || error.message.search('invalid opcode') > -1, true, 'Invalid JUMP OR opcode error must be returned');
}
