module.exports = {
  apps: [
    {
      name: 'astro-inseso',
      script: './dist/server/entry.mjs',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 4321,
        STRAPI_URL: 'http://localhost:1337'
      },
      error_file: './logs/astro-error.log',
      out_file: './logs/astro-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    },
    {
      name: 'strapi-inseso',
      script: './cms/node_modules/.bin/strapi',
      args: 'start',
      cwd: './cms',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 1337
      },
      error_file: './logs/strapi-error.log',
      out_file: './logs/strapi-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
};
