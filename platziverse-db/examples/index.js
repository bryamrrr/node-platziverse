'use strict'

const db = require('../')

async function run() {
  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'bryam',
    password: process.env.DB_PASS || 'abc123',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres'
  }

  const { Agent, Metric } = await db(config).catch(handleFatalError)

  const agent = await Agent.createOrUpdate({
    uuid: 'yyy',
    name: 'test',
    username: 'test',
    hostname: 'test',
    pid: 1,
    connected: true
  }).catch(handleFatalError)

  console.log('---Agent---')
  console.log(agent)

  const metrics = await Metric.findByAgentUuid(agent.uuid).catch(handleFatalError)

  console.log('---Metrics---')
  console.log(metrics)

  const metric = await Metric.create(agent.uuid, {
    type: 'memory',
    value: '380'
  }).catch(handleFatalError)

  console.log('---Metric---')
  console.log(metric)
}

function handleFatalError(err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()
