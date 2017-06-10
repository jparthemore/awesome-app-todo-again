/*jshint esversion: 6*/
// const dummyTodo = {
//   task: 'call the dr',
//   isCompleted: false
// };
// const dummyTodo2 = {
//   task: 'call the vet',
//   isCompleted: false
// };

const TodoApp = {
  rootElement: '#app',
  myTodos:[],
  start: function(){
    this.cacheDOM();
    this.bindEvents();
    this.render();
  },
  cacheDOM: function(){
    this.root = document.querySelector(this.rootElement);
    this.inputBox = this.root.querySelector('.todo-input');
    this.addBtn = this.root.querySelector('.add-button');
    this.todoList = this.root.querySelector('.todo-list');
  },
  bindEvents: function(){
    this.addBtn.addEventListener('click',()=>this.addaTodo());
  },
  addaTodo: function(){
    const taskVal = this.inputBox.value;
    if(!taskVal){
      return;
    }
    const toDo ={
      task: taskVal,
      isComplete: false
    };
    this.myTodos.push(toDo);
    this.render();
    this.inputBox.value = '';
  },
  render: function(){
    //const lis = this.myTodos.map(todo=>todo.task).join(''); //this works but does not create actual li elements

    //const lis - this.todos.map(function(todo,index){});//structure for code belong - this works!
      // const lis = this.myTodos.map(function(todo,index){
      //   //return('<li>' + todo.task + '</li>');//old clunkier syntax
      //   return(`<li>${todo.task}</li>`);//new ES6 template string
      // }).join('');
    const lis = this.myTodos
                      .map(todo=>`<li>${todo.task}</li>`)
                      .join('');
     this.todoList.innerHTML = lis;
  }


};
TodoApp.start();
