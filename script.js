const todoList = document.querySelector('.todo-list');
const addTodo = document.querySelector('.fa-plus-square');
const input = document.querySelector('#input');
const filterTodo = document.querySelector('#filter-todo');

const createTodo = (e) => {
    e.preventDefault();
    
    saveTodo(input.value);

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-item');

    const todoTitle = document.createElement('li');
    todoTitle.classList.add('todo-title');
    todoTitle.innerText = input.value;
    input.value = '';
    todoDiv.append(todoTitle);

    const checkBtn = document.createElement('button');
    checkBtn.innerHTML = '<i class="fas fa-check"></i>'
    checkBtn.classList.add('check-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
    deleteBtn.classList.add('delete-btn');

    todoDiv.append(checkBtn);
    todoDiv.append(deleteBtn);

    todoList.append(todoDiv);
}

const deleteTodo = (e) =>{
    const item = e.target;
    const todo = item.parentElement;
    // console.log(item.classList);
    if(item.classList[0] === 'check-btn'){
        todo.classList.toggle('completed');
    }else if(item.classList[0] === 'delete-btn'){
        removeTodo(todo);
        todo.classList.add('fall');
        todo.addEventListener('transitionend', e => {
            todo.remove();
        })    
    }
}
const saveTodo = (todo) => {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
const removeTodo = (todo) => {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const title = todo.children[0].innerText;
    const newTodos = todos.filter(todo => todo !== title);
    localStorage.setItem('todos', JSON.stringify(newTodos));
}
const getTodos = () =>{
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.map(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-item');

        const todoTitle = document.createElement('li');
        todoTitle.classList.add('todo-title');
        todoTitle.innerText = todo;
        todoDiv.append(todoTitle);

        const checkBtn = document.createElement('button');
        checkBtn.innerHTML = '<i class="fas fa-check"></i>'
        checkBtn.classList.add('check-btn');

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
        deleteBtn.classList.add('delete-btn');

        todoDiv.append(checkBtn);
        todoDiv.append(deleteBtn);

        todoList.append(todoDiv);
    })
}
const filterTodos = (e) =>{
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        // console.log(e.target.value);
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break; //
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else todo.style.display = "none";
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else todo.style.display = "none";
                break;
        }
    })
}
document.addEventListener('DOMContentLoaded', getTodos);
filterTodo.addEventListener('click', filterTodos);
todoList.addEventListener('click', deleteTodo);
addTodo.addEventListener('click', createTodo);