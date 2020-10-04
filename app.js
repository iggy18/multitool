// selectors
const todoInput = document.querySelector('.input'); //<----------get these from html doc to make available for JS FILE
const todoButton = document.querySelector('.todoButton');
const todoList = document.querySelector('.todoList');
const body = document.querySelector('body');
const ghost = document.querySelector('.ghost');

// const api = {
//     key: "5ae61908d029eac552247f920fb8dd44",

// }

// date, time, and weather
function getCurrentWorld() {  // <---------------------------------------------------clock object -------- this is where clock starts
    let now = new Date(),
        dayName = now.getDay(), // <------------------declair property that is inbuilt function for time data
        month = now.getMonth(),
        dayNumber = now.getDate(),
        year = now.getFullYear(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        m = "AM";
    if (hour == 0) { // <-----hour is midnight instead of 0 o'clock
        hour = 12
    }
    if (hour > 12) { // <--------------- change AM to PM get rid of milltary time
        hour = hour - 12;
        m = "PM";
    }
    if (hour > 6 && m === "PM" || hour < 6 && m === "AM") {
        body.classList.add('darkMode');
    }
    if (hour === 6 && m === "AM" && minute === 1) {
        body.classList.remove('darkMode');
        console.log('darkmode has been removed');
    }

    Number.prototype.pad = function (digits) { //<---------------------- add zero in clock show one digit number 
        for (var n = this.toString(); n.length < digits; n = 0 + n);
        return n;
    }
    // getMonth returns the number of the month, create an array of names to use. same for days 
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // id's are tagged in HTML file.
    let ids = ["dayName", "month", "dayNumber", "year", "hour", "minutes", "am"];
    // values should line up with id's above
    let values = [days[dayName], months[month], dayNumber.pad(2), year, hour.pad(2), minute.pad(2), m]; //<---- pad is from number prototype
    for (let i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
    }
}

function currentWorld() { //<-------------------------- refreshes clock info every second 
    getCurrentWorld();
    window.setInterval("getCurrentWorld()", 1000);
}

// ----------------------------------------------------------------------------------------------------------------------end clock/ todo functions start


// functions


function addTodo(event) { // <----------------------- fires all this off when clicked
    event.preventDefault(); // <---------------------prevents refresh

    const todoDiv = document.createElement('div'); //<------------------------(((creates todo DIV)))
    todoDiv.classList.add('todo');                 //adds todo classlist for styling in css

    const newTodo = document.createElement('li'); //<---------- creates new todo list item
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-Item'); //<<-------------- adds classlist to item
    todoDiv.appendChild(newTodo);

    saveTodos(todoInput.value); //<---------------------------- this saves the new todo in local storage. savetodos function near event listeners

    const completedButton = document.createElement('button');//<-------((((makes complete button))))
    completedButton.innerHTML = '<i class="fas fa fa-check"></i>';
    completedButton.classList.add('complete');
    todoDiv.appendChild(completedButton); // <------------------------((((sticks complete button to todo div)))

    const deleteButton = document.createElement('button');//<------- makes delete button
    deleteButton.innerHTML = '<i class="fas fa fa-minus-circle"></i>'; //<-------adds icon
    deleteButton.classList.add('delete');
    todoDiv.appendChild(deleteButton); //<----------------------------sticks delete Button to todo DIV

    todoList.appendChild(todoDiv); //<---------------------------- sticks .this new todo list item to UL in HTML
    todoInput.value = ""; //<--------------------------------------clears input bar when button is clicked
}

function deletecheck(event) { //<---------------------------------------deletes item
    const clicked = event.target;
    const newTodo = clicked.parentElement;
    if (clicked.classList[0] === 'delete') {
        newTodo.classList.add('fall'); //<------------adds classlist that triggers animation
        removeLocalTodo(newTodo);
        newTodo.addEventListener('transitionend', function () { //<------removes element after animation is done
            newTodo.remove();
        });
    }

    if (clicked.classList[0] === 'complete') { //<---------------------------toggles completd classlist which "activates" CSS selctor waiting for it
        newTodo.classList.toggle('completed');
    }
}

function addGetbutton() {
    if (localStorage.getItem("todos") !== null) {
        const getListButton = document.createElement('button');
        getListButton.innerHTML = "get my list";
        getListButton.classList.add('getListButton')
        ghost.appendChild(getListButton);
    }
    if (localStorage.getItem("todos") === null)
    getListButton.innerHTML = "you have no list"
}

addGetbutton();

// function removeGetbutton() {
//     if (localStorage.getItem("todos") === null){
//         let button = getElementbyClass('.getListButton');
//         button.remove();
//     }
// }


function saveTodos(todo) {                            //<------------------------- save to local storage (todo) is created up top
    let keepTodos;
    if (localStorage.getItem("todos") === null) { //<-------------------------- checks to see if there is anything in local storage, if not an array is created
        keepTodos = [];
    } else {
        keepTodos = JSON.parse(localStorage.getItem("todos")); //<-------------------if there is already an array, get it
    }
    keepTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(keepTodos)); // <---------------------strigify the array
}

function test() {
    console.log('this works');
}

function fetchTodos() {
    let keepTodos;
    if (localStorage.getItem("todos") === null) { //<-------------------------- checks to see if there is anything in local storage, if not an array is created
        keepTodos = [];
    } else {
        keepTodos = JSON.parse(localStorage.getItem("todos")); //<-------------------if there is already an array, get it
    }
    keepTodos.forEach(function (todo) { //<-------------------------------------THIS IS recycled code from the top still imside fetchtodos
        const todoDiv = document.createElement('div'); //<------------------------(((creates todo DIV)))
        todoDiv.classList.add('todo');                 //adds todo classlist for styling in css

        const newTodo = document.createElement('li'); //<---------- creates new todo list item
        newTodo.innerText = todo; ///<---------------------------------------innertext removed replaced with todo, because todo already exists.
        newTodo.classList.add('todo-Item'); //<<-------------- adds classlist to item
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');//<-------((((makes complete button))))
        completedButton.innerHTML = '<i class="fas fa fa-check"></i>';//<---------inner HTML inserts HTML into the page
        completedButton.classList.add('complete');
        todoDiv.appendChild(completedButton); // <------------------------((((sticks complete button to todo div)))

        const deleteButton = document.createElement('button');//<------- makes delete button
        deleteButton.innerHTML = '<i class="fas fa fa-minus-circle"></i>'; //<-------adds icon HTML to page
        deleteButton.classList.add('delete');
        todoDiv.appendChild(deleteButton); //<----------------------------sticks delete Button to todo DIV

        todoList.appendChild(todoDiv); //<---------------------------- sticks .this new todo list item to UL in HTML
    });

    // removeGetbutton();
}

function removeLocalTodo(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// event listeners
todoButton.addEventListener('click', addTodo); //<-------------- these listen to the quesry selected global const declaired up top 
todoList.addEventListener('click', deletecheck);
ghost.addEventListener('click', fetchTodos);

