/*jshint esversion: 6*/
const dummyTodo = {
  task: 'call the dr',
  isCompleted: false
};
const dummyTodo2 = {
  task: 'call the vet',
  isCompleted: false
};

const TodoApp = {
  rootElement: '#app',
  myTodos:[dummyTodo,dummyTodo2],
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
    // this.addBtn.addEventListener('click',()=>{
    //  console.log ('ADD');
    // });
    this.addBtn.addEventListener('click',()=>console.log('add'));
  },

  render: function(){
    //const lis = this.myTodos.map(todo=>todo.task);
    //const lis = this.myTodos.map(function(todo,index){return(todo[index])});//not working yet!!
     const lis = this.myTodos.map(function(todo,index){
       //return(todo.task);
       return(`<li>${todo.task}</li>`);
     }).join('');
      // const lis = this.myTodos
      //                //  .map(todo=>'<li>'+todo.task+ '</li>')
      //                 .map(todo=>`<li>${todo.task}</li>`)
      //                 .join('');
     this.todoList.innerHTML = lis;
  }


};
TodoApp.start();
