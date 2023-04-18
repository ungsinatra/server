class BadReqError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = 'BadReqError';
  }
}
module.exports = {
  BadReqError,
};
