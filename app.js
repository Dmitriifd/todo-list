const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

const showTask = () => {

    let getLocalStorage = localStorage.getItem('new todo');
    if (getLocalStorage === null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    let newLiTag = ''
    listArr.forEach((todo, index) => {
        newLiTag += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete" onclick="deleteTask(${index})"></i>
        </li>
        `
    });
    list.innerHTML = newLiTag;
};

addForm.addEventListener('submit', e => {
	e.preventDefault();
	const todo = addForm.add.value.trim();

    
    let getLocalStorage = localStorage.getItem('new todo');
    if (getLocalStorage === null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }

    if (todo.length) {
        listArr.push(addForm.add.value);
        localStorage.setItem('new todo', JSON.stringify(listArr));
        showTask();
        addForm.reset();
    }

});

list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
});

const filterTodos = term => {
    Array.from(list.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.add('filtered'))

    Array.from(list.children)
        .filter(todo => todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.remove('filtered'))
}

search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});

showTask()

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem('new todo');
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);

    localStorage.setItem('new todo', JSON.stringify(listArr));
    showTask() 
}

