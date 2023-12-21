const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  chain: [],
  getLength() {
    return this.chain.length;
  },
  addLink(value) {
    if (arguments.length === 0) {
      this.chain.push('(  )');
    } else {
      this.chain.push(`( ${value} )`);
    }
    return this;
  },
  removeLink(position) {
    if (
      typeof position !== 'number' ||
      !Number.isInteger(position) ||
      position < 1 ||
      position > this.chain.length
    ) {
      this._resetChain();
      throw new Error("You can't remove incorrect link!");
    }
    this.chain.splice(position - 1, 1);
    return this;
  },
  reverseChain() {
    this.chain.reverse();
    return this;
  },
  finishChain() {
    const result = this.chain.join('~~');
    this._resetChain();
    return result;
  },
  _resetChain() {
    this.chain = [];
  },
};

module.exports = {
  chainMaker
};
