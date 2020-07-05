module.exports = {
  apps : [{
    name   : "ecoleta-api",
    script : "./dist/src/server.js",
    instances: 1,
    exec_mode: "cluster",
    watch: true,
    merge_logs: true,
    env: {
      PORT: 4000
    },
    env_production: {
      PORT: 5000
    }
  }]
}