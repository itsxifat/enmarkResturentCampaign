// PM2 process config for the mail backend.
//   pm2 start ecosystem.config.cjs
// cwd is pinned to this file's folder so `dotenv` finds .env and the
// script path resolves no matter where you run pm2 from.
const path = require('path')

module.exports = {
  apps: [
    {
      name: 'enmark-mail',
      script: path.join(__dirname, 'server/index.js'),
      cwd: __dirname,
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      max_restarts: 10,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
