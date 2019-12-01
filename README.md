# Expense Tracker
This is a web app to record expense data which is based on express,js.

## Features
+ User can register an account
+ User can login with Facebook
+ Show user's expense record list and total amount at index page with basic data.
+ User can choose category filter to filter expense records.
+ User can add new expense record.
+ User can edit data of exist expense record.
+ User can delete expense record from record list.

## Installing
### Environment
#### Should be prepared
+ node.js 12.13.0
+ mongoDB(use default path mongodb://localhost:27017)

#### Modules in NPM
+ bcryptjs
+ body-parser
+ connect-flash
+ dotenv
+ express
+ express-handlebars
+ express-session
+ method-override
+ mongoose
+ passport
+ passport-facebook
+ passport-local

### Step
Choose a [dir] as a workspace.
First, clone this project to the [dir].
```
git clone https://github.com/s2223695/S6_A17_expense_tracker.git [dir]
```
Switch to the project folder.
```
cd S6_A17_expense_tracker/
```
Install the modules.
```
npm install
```
Create .env file in project root path, add the content below to the file
```
FACEBOOK_ID= //your Client ID
FACEBOOK_SECRET= //your Client secret
FACEBOOK_CALLBACK= http://localhost:3000/auth/facebook/callback
```
Run the Express server with normal setting.
```
npm run start
```
Or, run the Express server with develop setting.
```
npm run dev
```
Now, you can go to http://localhost:3000 with your browser.

In addition, you can setup seed data before start the Express server
```
npm run seed
```

### Seed Data
There are two seed users, you can login the app with these account after ```npm run seed```
```
[user1]
account: user1@example.com
password: 123456

[user2]
account: user2@example.com
password: 654321
```