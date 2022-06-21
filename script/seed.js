'use strict';

const {
  db,
  models: { User, Product, CartDetail },
} = require('../server/db');

const fs = require('fs');

const snowboardData = JSON.parse(fs.readFileSync('SnowboardData.json', 'utf8'));
const skiData = JSON.parse(fs.readFileSync('SkiData.json', 'utf8'));
const userData = JSON.parse(fs.readFileSync('UserData.json', 'utf8'));

// console.log('HERES USER DATA, ', userData);
/*
 *
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  const users = await Promise.all(userData.map((user) => User.create(user)));
  const snowboards = await Promise.all(
    snowboardData.map((snowboard) => Product.create(snowboard))
  );
  const skis = await Promise.all(skiData.map((ski) => Product.create(ski)));

  console.log(
    `seeded ${users.length} users and ${skis.length} skis and ${snowboards.length} snowboards`
  );
  console.log(`seeded successfully`);
}

//A user is created through post request or seed
//A cart is created for that user and then it's assigned to the user

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
