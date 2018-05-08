'use strict'

const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()

async function setup () {
  if (process.argv.indexOf('yes') === -1) {
    const answer = await prompt({
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database, are you sure?'
    })

    if (!answer.setup) {
      return console.log('Nothing happened :)')
    }
  }

  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'bryam',
    password: process.env.DB_PASS || 'abc123',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: message => debug(message),
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
