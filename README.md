# Trekkies Snowboard & Ski
## GS-TEAM-TREKKIES : 
#### `Allah Jackson, Brandon Tran, Leland Kowal, & Ryan Tang `
</br>

#### `A fullstack snowboards & skis e-commerce site with end-to-end functionality from product browsing to purchasing.`
</br>

![Screen Shot 2022-06-22 at 1 16 54 PM](https://user-images.githubusercontent.com/99780324/175098723-3b31f353-9e92-448e-a9b2-f79e641266ff.png)


## `Key Features`

- View all available products and a single product for more details.
- Sort and filter products by category (snowboards or skis) and or alphabetically.
- Ability to add/remove products from cart, as well as adjust quantity.
- Persistant cart for both authenticated (logged in) and unauthenticated (guest) users.
- Create an account to view order history and user profile.
- Authorized admin users can view user information.
- Authenticated users and guest users can check out cart and have order processed.

## `Setup / How To Use`

1. Fork and clone our repo.
2. Run `npm install` in the terminal.
3. Create two postgres databases. These commands will create both your **development** and **test** databases

```
createdb grace-shopper
createdb grace-shopper-test
```

4. Sync and seed the database by running `npm run seed`.
5. Running `npm run start` will allow you to run the app on your local machine.

### Other commands
- `npm run start:dev` will both start your server and build your client side files using webpack.
- `npm run start:dev:logger` will allow you to see your SQL queries (can be helpful for debugging).
- `npm run start:dev:seed` will start your server and also seed your database.
```
