const buildTable = require('./table-builder');

const headers = [
  {dataKey: 'key1', name: 'Value 1'},
  {dataKey: 'memory', name: 'Value 2'},
  {dataKey: 'imageHint', name: 'Value 4'},
];

const data = [
  {
    key1: 'someValue1',
    imageHint: 'image1',
    memory: 4096,
  },
  {
    key1: 'someValue2',
    imageHint: 'image2',
    memory: 1024,
  },
  {
    key1: 'someValue3',
    imageHint: 'image2',
    memory: 2048,
  },
];

const options = {
  headerColor: '#DEADED',
  spacesBetweenColumns: 5,
};

const table = {
  headers,
  data,
};

console.log(buildTable(table, options));
