## 1. Requirements / Intro

You need to implement a simple web application that allows you to take notes, tag, and filter them. The development is divided into two phases:

- Note creation
- Tag application and filtering

#### User Stories

- As a user, I want to be able to create, edit, and delete notes.
- As a user, I want to archive/unarchive notes.
- As a user, I want to list my active notes.
- As a user, I want to list my archived notes.
- As a user, I want to be able to add/remove categories to notes.
- As a user, I want to be able to filter notes by category.


### Developer notes

To run this app you'll need
Node v18.16.1 or higher
npm v9.5.1 or higher
Postgres v16.2

Please make sure you have the database 'notes' created before atempting to run the app, database can be empty as this project uses sequelize as orm which creates the tables on demand.

Project can be run using npm dev or yarn dev, avoid using both, in case you need to change from npm to yarn or vice versa please delete package.json, yarn.lock and node_modules before doing install again.
