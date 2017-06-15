/*jshint esversion: 6*/
const TodoApp = {
  rootElement: '#app',
  myTodos: JSON.parse(localStorage.getItem('myTodos')) || [],
  start: function(){
    this.cacheDOM();
    this.bindEvents();
    this.render();
  },
  cacheDOM: function(){
    this.root = document.querySelector(this.rootElement);
    this.inputForm = this.root.querySelector('.create-form');
    this.inputBox = this.root.querySelector('.todo-input');
    //console.dir(this.inputBox);
    this.todoList = this.root.querySelector('.todo-list');
    this.completeLabel = this.root.querySelector('.complete-label');
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
    localStorage.setItem('myTodos', JSON.stringify(this.myTodos));

    this.inputBox.value = '';
  },
  cacheDeleteButtons: function(){
    this.deleteBtns = this.root.querySelectorAll('.delete-button');
  },
  bindDeleteEvents: function(){
      //this.deleteBtns.forEach(()=>{});
      this.deleteBtns.forEach((chkbox,index)=>{
      chkbox.addEventListener('click',()=>this.deleteaTodo(index));
    });
  },
  deleteaTodo: function(index){
    this.myTodos.splice(index,1);
    this.render();
    localStorage.setItem('myTodos', JSON.stringify(this.myTodos));
  },
  cacheLiItems: function(){
    //this.liItems = this.root.querySelectorAll('.taskitems-left-side');//don't need this
    this.taskItem = this.root.querySelectorAll('.item-task');
  },

  bindLiEvents: function(){
      this.taskItem.forEach((task,index)=>{
        task.addEventListener('input',()=>this.modifyaTodo(event,index));
    });
  },

  modifyaTodo: function(event,index){
    this.myTodos[index].task = event.target.textContent;
    localStorage.setItem('myTodos', JSON.stringify(this.myTodos));
    //no need to call render again! in fact you don't want to or it re-renders after every single letter change
  },

  gimmeLi: function(todo){

    //do not allow user to modify a completed task!
  //   if(todo.isComplete){
  //     return (`<li class="todo-item">
  //                 <div class = 'taskitems-left-side'>
  //                   <button class='delete-button'>X</button>
  //                   <del>${todo.task}</del>
  //                 </div>
  //                 <div class = 'taskitems-right-side'>
  //                   <input type="checkbox" class="complete-checkbox" checked/>
  //                 </div>
  //             </li>`);
  //   }
  //   else{
  //     return (`<li class="todo-item">
  //                 <div class = 'taskitems-left-side'>
  //                   <button class='delete-button'>X</button>
  //                   <span class = 'item-task'contenteditable="true">${todo.task}</span>
  //                 </div>
  //                 <div class = 'taskitems-right-side'>
  //                   <input type="checkbox" class="complete-checkbox"/>
  //                 </div>
  //             </li>`);
  //   }
  // },
  return (`<li class="todo-item">
              <div class = 'taskitems-left-side'>
                <button class='delete-button'>X</button>
                <span class=${todo.isComplete ? 'is-complete':'is-incomplete'}>${todo.task}</span>
              </div>
              <div class = 'taskitems-right-side'>
                <input type="checkbox" class="complete-checkbox" ${todo.isComplete ? 'checked': ''}/>
              </div>
          </li>`);
  },

  // li: function(todo){
  //   return `<li>
  //             <input type='checkbox' class='complete-box' ${todo.isComplete ? 'checked': ''}/>
  //             <span class=${todo.isComplete ? 'complete':''}>${todo.task}</span>
  //             <button class='delete'>X</button>
  //          </li>`;
  // },
  cacheCompleteCheckboxes: function(){
    this.completeChkBoxes = this.root.querySelectorAll('.complete-checkbox');
  },
  bindCompleteCheckboxEvents: function(){
      this.completeChkBoxes.forEach((chkbox,index)=>{
      chkbox.addEventListener('change',()=>this.changeCompleteStatus(chkbox.checked,index));
    });
  },
  changeCompleteStatus: function(isChecked,index){
    if (isChecked){
      this.myTodos[index].isComplete = true;
    }
    else{
      this.myTodos[index].isComplete = false;
    }
    this.render();
    localStorage.setItem('myTodos', JSON.stringify(this.myTodos));
  },
  render: function(){
    //const lis = this.myTodos.map(todo=>todo.task).join(''); //this works but does not create actual li elements

    //const list - this.todos.map(function(todo,index){});//structure for code below - this works!
      // const list = this.myTodos.map(function(todo,index){
      //   //return('<li>' + todo.task + '</li>');//old clunkier syntax
      //   return(`<li>${todo.task}</li>`);//new ES6 template string
      // }).join('');

    const lis = this.myTodos
                    //.map(todo=>`<li>${todo.task}<button class='delete-button'>X</button></li>`)
                    .map(todo=>this.gimmeLi(todo))
                    .join('');
    this.todoList.innerHTML = lis;
    if(this.myTodos.length>0){
      this.completeLabel.style.visibility = 'visible';
    }
    else{
      this.completeLabel.style.visibility = 'hidden';
    }
    this.cacheDeleteButtons();
    this.bindDeleteEvents();
    this.cacheLiItems();
    this.bindLiEvents();
    this.cacheCompleteCheckboxes();
    this.bindCompleteCheckboxEvents();

  },
  addStorage: function(property,value) {
    localStorage.setItem(property, value);
  },

};
TodoApp.start();
