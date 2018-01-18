#!/usr/bin/env node

const {db} = require('../server/db')

const seed = async () => {
  await db.sync({force: true})
  throw new Error('oh noes')
}

seed().catch(err => console.log(`

    Error seeding:

    ${err.message}

    ${err.stack}

`))
