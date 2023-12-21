const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }
    message = message.toUpperCase();
    key = this.generateKey(message, key);
    let result = '';
    for (let i = 0; i < message.length; i++) {
      const messageChar = message[i];
      if (this.alphabet.includes(messageChar)) {
        const messageIndex = this.alphabet.indexOf(messageChar);
        const keyChar = key[i % key.length];
        const keyIndex = this.alphabet.indexOf(keyChar);
        let encryptedIndex;
        if (this.isDirect) {
          encryptedIndex = (messageIndex + keyIndex) % this.alphabet.length;
        } else {
          encryptedIndex = (messageIndex - keyIndex + this.alphabet.length) % this.alphabet.length;
        }
        result += this.alphabet[encryptedIndex];
      } else {
        result += messageChar;
      }
    }
    return result;
  }
  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }
    encryptedMessage = encryptedMessage.toUpperCase();
    key = this.generateKey(encryptedMessage, key);
    let result = '';
    for (let i = 0; i < encryptedMessage.length; i += 1) {
      const encryptedChar = encryptedMessage[i];
      if (this.alphabet.includes(encryptedChar)) {
        const encryptedIndex = this.alphabet.indexOf(encryptedChar);
        const keyChar = key[i % key.length];
        const keyIndex = this.alphabet.indexOf(keyChar);
        let decryptedIndex;
        if (this.isDirect) {
          decryptedIndex = (encryptedIndex - keyIndex + this.alphabet.length) % this.alphabet.length;
        } else {
          decryptedIndex = (encryptedIndex + keyIndex) % this.alphabet.length;
        }
        result += this.alphabet[decryptedIndex];
      } else {
        result += encryptedChar;
      }
    }
    return result;
  }
  generateKey(message, key) {
    let generatedKey = '';
    for (let i = 0, j = 0; i < message.length; i += 1) {
      const messageChar = message[i];
      if (this.alphabet.includes(messageChar)) {
        generatedKey += key[j % key.length].toUpperCase();
        j += 1;
      } else {
        generatedKey += messageChar;
      }
    }
    return generatedKey;
  }
}

module.exports = {
  VigenereCipheringMachine
};
