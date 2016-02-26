
// js/collections/todos.js

var app = app || {};

// Todo Collection
// ---------------

// The collection of todos is backed by *localStorage* instead of a remote
// server.
var TodoList = Backbone.Collection.extend({

  // Reference to this collection's model.
  model: app.Todo,

  // Save all of the todo items under the `"todos-backbone"` namespace.
  localStorage: new Backbone.LocalStorage('todos-backbone'),

  // Filter down the list of all todo items that are finished.
  completed: function() {
    return this.filter(function( todo ) {
      return todo.get('completed');
    });
  },

  // Filter down the list to only todo items that are still not finished.
  remaining: function() {
    return this.without.apply( this, this.completed() );
  },

  // We keep the Todos in sequential order, despite being saved by unordered
  // GUID in the database. This generates the next order number for new items.
  nextOrder: function() {
    if ( !this.length ) {
      return 1;
    }
    return this.last().get('order') + 1;
  },

  // Todos are sorted by their original insertion order.
  comparator: function( todo ) {
    todo.set({"id": todo.get('order')})
    return todo.get('order');
  }
});

// Create our global collection of **Todos**.
app.Todos = new TodoList();


// QUESTIONS
// - Why this TodoList is a constructor and app.Todos gets an
// intstance of it and with the model app.Todo not ?







// completed: function() {
//   _(this).filter(function(todo) {
//     if (todo.attributes.completed === true) {
//         return todo;
//     }
//   })
// },
// pending: function() {
//   _(this).filter(function(todo) {
//     if (todo.attributes.completed === false) {
//         return todo;
//     }
//   })
// },
// incrementID: function() {
//   if ( !this.length ) {
//     return 1;
//   }
//   return this.last().get('order') + 1;
// },
