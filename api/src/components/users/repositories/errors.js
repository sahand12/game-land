class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class DbError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DbError';
  }
}

export {DbError, ValidationError};
