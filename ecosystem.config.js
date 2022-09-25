module.exports = {
  apps: [
    {
      name: 'socket',
      script: 'socket_server.js',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
