// CAMBIO INSESO FINAL: un proceso web y un trabajador de correo con la misma base persistente.
module.exports={apps:[
 {name:'astro-inseso',script:'./dist/server/entry.mjs',node_args:'--env-file=.env',instances:1,exec_mode:'fork',env:{NODE_ENV:'production',HOST:'127.0.0.1',PORT:4321},autorestart:true,watch:false,max_memory_restart:'1G'},
 {name:'inseso-citas-correo',script:'./scripts/appointment-mail-worker.mjs',args:'--daemon',node_args:'--env-file=.env',instances:1,exec_mode:'fork',autorestart:true,kill_timeout:30000,watch:false}
]};
