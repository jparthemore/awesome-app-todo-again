/*jshint esversion: 6*/
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
    this.inputForm = this.root.querySelector('.create-form');
    this.inputBox = this.root.querySelector('.todo-input');
    this.todoList = this.root.querySelector('.todo-list');
  },
  bindEvents: function(){
    //this.addBtn.addEventListener('click',()=>this.addaTodo());
    this.inputForm.addEventListener('submit',(event)=>this.addaTodo(event));
  },
  addaTodo: function(event){
    event.preventDefault();//this keeps the submit button from submitting the form, and thus from refreshing the form
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
  cacheDeleteButtons: function(){
    this.deleteBtns = this.root.querySelectorAll('.delete-button');
    //console.dir(this.deleteBtns);
  },
  bindDeleteEvents: function(){
      //this.deleteBtns.forEach(()=>{});
      this.deleteBtns.forEach((btn,index)=>{
      btn.addEventListener('click',()=>this.deleteaTodo(index));
    });
  },
  deleteaTodo: function(index){
    this.myTodos.splice(index,1);
    this.render();
  },
  render: function(){
    //const lis = this.myTodos.map(todo=>todo.task).join(''); //this works but does not create actual li elements

    //const lis - this.todos.map(function(todo,index){});//structure for code below - this works!
      // const lis = this.myTodos.map(function(todo,index){
      //   //return('<li>' + todo.task + '</li>');//old clunkier syntax
      //   return(`<li>${todo.task}</li>`);//new ES6 template string
      // }).join('');
    const lis = this.myTodos
                    .map(todo=>`<li>${todo.task}<button class='delete-button'>X</button></li>`)
                    .join('');
    this.todoList.innerHTML = lis;
    this.cacheDeleteButtons();
    this.bindDeleteEvents();
  }


};
TodoApp.start();
