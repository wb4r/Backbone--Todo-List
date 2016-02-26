

// AppView will handle the creation of new todos and rendering of the initial
// todo list.



var app = app || {};



app.AppView = Backbone.View.extend({
  el: "#todoapp",
  statsTemplate: _.template($("#stats-template").html()),

  events: {
    "keypress     #new-todo"      :   "createOnEnter",
    "click        .toggle"        :   "filterOne",
    "click        #toggle-all"    :   "toggleAllComplete"
  },


  initialize: function() {
    this.allCheckbox = this.$("#toggle-all")[0];
    this.$input = this.$("#new-todo");
    this.$footer = this.$("#footer");
    this.$main = this.$("#main");

    this.listenTo(app.Todos, "add", this.addOne);
    this.listenTo(app.Todos, "reset", this.addAll);

    this.listenTo(app.Todos, "change:completed", this.filterOne)
    this.listenTo(app.Todos,'filter', this.filterAll);
    this.listenTo(app.Todos, 'all', this.render);

    app.Todos.fetch();
  },
  render: function() {
    var completed = app.Todos.completed().length;
    var remaining = app.Todos.remaining().length;

    if ( app.Todos.length ) {
      this.$main.show();
      this.$footer.show();

      this.$footer.html(this.statsTemplate({
        completed: completed,
        remaining: remaining
      }));

      this.$('#filters li a')
        .removeClass('selected')
        .filter('[href="#/' + ( app.TodoFilter || '' ) + '"]')
        .addClass('selected');
    } else {
      this.$main.hide();
      this.$footer.hide();
    }

    this.allCheckbox.checked = !remaining;
  },
  addOne: function(todo) {
    var view = new app.TodoView({model: todo})
    $("#todo-list").append(view.render().el)
  },
  addAll: function() {
    this.$("#todo-list").html("")
    // _(app.Todos).each(function(todo) {
    //   todo.addOne();
    // })
    _(app.Todos).each(this.addOne, this)
  },
  createOnEnter: function(e){
    if (e.which === 13) {
      // app.Todos.add(new app.Todo({title: this.$input.val()}))
      app.Todos.create(this.newAttributes())
      this.cleanInputVal();
    }
  },
  newAttributes: function() {
    return {
      title: this.$input.val(),
      completed: false,
      order: app.Todos.nextOrder(),
    }
  },
  cleanInputVal: function() {
    this.$input.val("");
  },
  clearCompleted: function() {
    _.invoke(app.Todos.completed(), 'destroy');
    return false;
  },
  toggleAllComplete: function(e) {
    // this.$("#toggle-all")[0];
    var completed = this.allCheckbox.checked;
    _(app.Todos.models).each(function(todo){todo.save({"completed": completed})})
  },
  filterOne: function(todo) {
    todo.trigger("visible")
  },
  filterAll: function() {
    app.Todos.each(this.filterOne, this)
  }
})
