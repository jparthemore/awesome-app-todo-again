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
    this.taskItems = this.root.querySelectorAll('.task-item');
  },

  bindLiEvents: function(){
      this.taskItems.forEach((task,index)=>{
        task.addEventListener('input',()=>this.modifyaTodo(event,index));
    });
  },

  modifyaTodo: function(event,index){
    this.myTodos[index].task = event.target.textContent;
    localStorage.setItem('myTodos', JSON.stringify(this.myTodos));
    //no need to call render again! in fact you don't want to or it re-renders after every single letter change
  },

  /*gimmeLi: function(todo){

    //do not allow user to modify a completed task!
    return (`<li class="todo-item">
              <div class = 'taskitems-left-side'>
                <button class = 'delete-button'>X</button>
                <span class = "task-item ${todo.isComplete ? 'is-complete':'is-incomplete'}"
                       contenteditable = ${todo.isComplete ? "false": contenteditable = "true"}>
                       ${todo.task}
                </span>
              </div>
              <div class = 'taskitems-right-side'>
                <input type="checkbox" class="complete-checkbox" ${todo.isComplete ? 'checked': ''}/>
              </div>
          </li>`);
  },*/
  gimmeLi : function(todo){
     //will need the following to create the li's
     const li = document.createElement('li');

     const divLeft = document.createElement('div');
     const divRight = document.createElement('div');
     const chkbox = document.createElement('input');
     const span = document.createElement('span');
     const delBtn = document.createElement('button');

     //configuration
     divLeft.classList.add('taskitems-left-side');
     divRight.classList.add('taskitems-right-side');
     delBtn.classList.add('delete-button');
     span.classList.add('task-item');
     chkbox.type = 'checkbox';
     chkbox.classList.add('complete-checkbox');

     //properties
     span.textContent = todo.task;
     delBtn.textContent = 'X';

     if(todo.isComplete){
       span.classList.add('is-complete');
       span.contentEditable = false;
       chkbox.checked = true;
     }
     else{
       span.classList.add('is-incomplete');
       span.contentEditable = true;
     }
     ///console.dir(chkbox);

     //this gives us divs!!! - for better formatting
     li.appendChild(divLeft);
     const leftChildren = [delBtn,span];
     leftChildren.forEach(child => divLeft.appendChild(child));
     li.appendChild(divRight);
     const rightChildren = [chkbox];
     rightChildren.forEach(child =>divRight.appendChild(child));

     //works but no divs
     /*const children = [delBtn, span, chkbox];
     children.forEach(child => li.appendChild(child));*/

     return li;
  },

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

    const lis = this.myTodos
                    .map(todo=>this.gimmeLi(todo));

    this.todoList.innerHTML = ''; //inner HTMl can lead to security vulnerability
    lis.forEach(li => this.todoList.appendChild(li));

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
