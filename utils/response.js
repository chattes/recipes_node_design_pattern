const send = (response) => (status, message) => {
  response.statusCode = status;

  return response.end(JSON.stringify(message));
};

module.exports = {
  send,
};
