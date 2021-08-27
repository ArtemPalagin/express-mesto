const AuthenticationError = require('./authentication-error');
const ConflictError = require('./conflict-error');
const ForbiddenError = require('./forbidden-error');
const NotFoundError = require('./not-found-err');
const RequestError = require('./request-error');

module.exports = {
  AuthenticationError, ConflictError, ForbiddenError, NotFoundError, RequestError,
};
