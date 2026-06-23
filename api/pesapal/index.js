// api/pesapal/index.js
module.exports = {
  auth: require('./auth.js'),
  payment: require('./payment.js'),
  ipn: require('./ipn.js'),
  register: require('./register.js'),
  checkStatus: require('./check-status.js'),
};