Version of TodoMVC.com, with Addy Osmani.

We’ll need:

    - a Todo MODEL to describe individual todo items
    - a TodoList COLLECTION to store and persist todos
    - a way of creating todos
    - a way to display a listing of todos
    - a way to edit existing todos
    - a way to mark a todo as completed
    - a way to delete todos
    - a way to filter the items that have been completed or are remaining

Essentially, these features are classic CRUD methods. Let’s get started!


Libraries needed:

  js/       lib/              jquery.min.js
  js/       lib/              underscore-min.js
  js/       lib/              backbone-min.js
  js/       lib/              backbone.localStorage.js

MVC Pack Organization:
  js/       models/           todo.js
  js/       collections/      todos.js
  js/       views/            todos.js
  js/       views/            app.js
  js/       routers/          router.js

An App.js to house central iniziation code:
  js/app.js
