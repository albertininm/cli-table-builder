const chalk = require('chalk');

/**
 * Generate a table with headers
 * and values based on the given input.
 * @param {object} table All data necessary to build the table
 * @param {Array} table.headers Object containing the header values
 * @param {Array} table.data List of objects to be printed on the table
 * @param {?object} options Optional config
 * @param {?object} options.spacesBetweenColumns Optional config
 * @param {?object} options.headerColor Color of the table header
 * @returns {string} Formatted table
 */
function buildTable(table, options) {
  const maxOffsetMap = getMaximumOffset(table);
  const msg = generateOutputString(table, maxOffsetMap, options);
  return msg;
}

/**
 * Generate a map containing the number of spaces between columns.
 * @param {object} table All data necessary to build the table
 * @param {Array} table.headers Object containing the header values
 * @param {Array} table.data List of objects to be printed on the table
 * @returns {Map} Map containing max value length for each column
 */
function getMaximumOffset(table) {
  const {headers, data} = table;
  const maxLengthMap = new Map();
  for (const header of headers) {
    maxLengthMap.set(header.dataKey, header.name.length);
  }

  for (const header of headers) {
    for (const item of data) {
      const currentElement = item[header.dataKey];
      let valueLength;
      if (typeof currentElement === 'number') {
        valueLength = String(currentElement).length;
      } else {
        valueLength = currentElement.length;
      }
      const maxValueForKey = maxLengthMap.get(header.dataKey) || 0;
      if (valueLength > maxValueForKey) {
        maxLengthMap.set(header.dataKey, valueLength);
      }
    }
  }
  return maxLengthMap;
}
/**
 * Generate an string well formated.
 * @param {object} table All data necessary to build the table
 * @param {Array} table.headers Object containing the header values
 * @param {Array} table.data List of objects to be printed on the table
 * @param {Map} maxLengthMap A map containing the max length for each object
 * @param {?object} options Optional config
 * @param {?object} options.spacesBetweenColumns Optional config
 * @returns {string} String with the table
 */
function generateOutputString(table, maxLengthMap, options) {
  const {headers, data} = table;
  const {headerColor, spacesBetweenColumns} = options;
  //Generate header
  let msg = '';
  for (const header of headers) {
    msg += header.name.padEnd(
      maxLengthMap.get(header.dataKey) + spacesBetweenColumns
    );
  }
  //Generate table lines for each object
  msg = `${chalk.hex(headerColor)(msg)}\n`;
  for (const item of data) {
    for (const header of headers) {
      msg += String(item[header.dataKey]).padEnd(
        maxLengthMap.get(header.dataKey) + spacesBetweenColumns
      );
    }
    msg += '\n';
  }
  return msg;
}

module.exports = buildTable;