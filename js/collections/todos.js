

var app = app || {};

var TodoList = Backbone.Collection.extend({

  model: app.Todo,

  localStorage: new Backbone.LocalStorage('todos-backbone'),

  completed: function() {
    return this.filter(function( todo ) {
      return todo.get('completed');
    });
  },

  remaining: function() {
    return this.without.apply( this, this.completed() );
  },

  nextOrder: function() {
    if ( !this.length ) {
      return 1;
    }
    return this.last().get('order') + 1;
  },

  comparator: function( todo ) {
    todo.set({"id": todo.get('order')})
    return todo.get('order');
  }
});

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
