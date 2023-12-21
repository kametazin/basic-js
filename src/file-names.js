const { NotImplementedError } = require('../extensions/index.js');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  const nameCounts = {};
  function getUniqueName(name, count) {
    return count === 0 ? name : `${name}(${count})`;
  }
  for (let i = 0; i < names.length; i += 1) {
    let currentName = names[i];
    if (nameCounts[currentName] !== undefined) {
      let count = 1;
      // Генерируем уникальное имя, пока не найдем свободное
      while (nameCounts[getUniqueName(currentName, count)] !== undefined) {
        count += 1;
      }
      let uniqueName = getUniqueName(currentName, count);
      names[i] = uniqueName;
      nameCounts[uniqueName] = 1;
    } else {
      nameCounts[currentName] = 1;
    }
  }
  return names;
}

module.exports = {
  renameFiles
};
