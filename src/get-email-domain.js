const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an email address, return it's domain.
 *
 * @param {String} email
 * @return {String}
 *
 * @example
 * For the input 'prettyandsimple@example.com', the output should be 'example.com'
 *
 */
function getEmailDomain(email) {
  const domainRegex = /@([^.]+)\.([^.\s]+)/;
  const match = email.match(domainRegex);
  if (match) {
    return match[1] + '.' + match[2];
  }
  return null;
}

module.exports = {
  getEmailDomain
};
