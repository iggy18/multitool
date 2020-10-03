// selectors
const todoInput = document.querySelector('.input'); //<----------get these from html doc to make available for JS FILE
const todoButton = document.querySelector('.todoButton');
const todoList = document.querySelector('.todoList');

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
    if (hour >= 12) { // <--------------- change AM to PM get rid of milltary time
        hour = hour - 12;
        m = "PM";
    }

    Number.prototype.pad = function(digits){ //<---------------------- add zero in clock show one digit number 
        for(var n = this.toString(); n.length < digits; n = 0 + n);
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
    window.setInterval("getCurrentWorld()", 1);
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

    const completedButton = document.createElement('button');//<-------((((makes complete button))))
    completedButton.innerHTML = '<i class="fas fa fa-check"></i>';
    completedButton.classList.add('complete');
    todoDiv.appendChild(completedButton); // <------------------------((((sticks complete button to todo div)))

    const deleteButton = document.createElement('button');//<------- makes delete button
    deleteButton.innerHTML = '<i class="fas fa fa-minus-circle"></i>';
    deleteButton.classList.add('delete');
    todoDiv.appendChild(deleteButton); //<----------------------------sticks delete Button to todo DIV

    todoList.appendChild(todoDiv); //<---------------------------- sticks .this new todo list item to UL in HTML
    todoInput.value = ""; //<--------------------------------------clears input bar when button is clicked
}

function deletecheck (event){ //<---------------------------------------deletes item
    const clicked = event.target;
    const newTodo = clicked.parentElement;
    if (clicked.classList[0] === 'delete'){
        newTodo.classList.add('fall');
        newTodo.addEventListener('transitionend', function(){
            newTodo.remove();
        });
    }
    
    if(clicked.classList[0] === 'complete') { //<---------------------------toggles completd classlist which "activates" CSS selctor waiting for it
        newTodo.classList.toggle('completed');
    }
}

// event listeners
todoButton.addEventListener('click', addTodo); //<-------------- these listen to the quesry selected global const declaired up top 
todoList.addEventListener('click', deletecheck);
