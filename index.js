const server = require('./server');
const models = require('./model');

server.listen(process.env.RUNNING_PORT, async function () {
  console.log(
    `server has start at port number ${process.env.RUNNING_PORT}`,
  ); // the server object listens on port 3000
  await models.createModels();
});
