const shortid = require('shortid');

module.exports = {
  generateId: () => shortid.generate(),
};