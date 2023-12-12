interface Todo {
  text: string;
  completed: boolean;
}

const btn = document.getElementById('btn')! as HTMLButtonElement;
const input = document.getElementById('todoinput')! as HTMLInputElement;
const form = document.querySelector('form')!;
const todolist  = document.querySelector('#todolist')!;

const todos: Todo[] = readTodos();
todos.forEach(createTodo);


function readTodos(): Todo[] {
  const todoJSON = localStorage.getItem('todos');
  if(todoJSON === null) return [];
  return JSON.parse(todoJSON);
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

const handleSubmit = (e:SubmitEvent) => {
 e.preventDefault();
 if (input.value.trim() === '') {
   return alert('Please enter a text');
  }

  const newTodo: Todo = {
    text: input.value,
    completed: false,
  }
  createTodo(newTodo);
  todos.push(newTodo);

 saveTodos();

  input.value = '';
}

function createTodo(todo: Todo) {
  const newLi = document.createElement('li');
  const checkbox  = document.createElement('input');
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  newLi.append(todo.text);
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    saveTodos();
  })

  deleteBtn.addEventListener("click",(e:Event) => {
    e.preventDefault();
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    saveTodos();
    window.location.reload();
  })
  newLi.append(checkbox);
  newLi.append(deleteBtn);
  todolist.append(newLi);
}

form.addEventListener('submit',handleSubmit);