const taskTable = document.querySelector('[table-data]')

const newTaskForm = document.querySelector('[data-new-task-form')
const newTaskName = document.querySelector('[data-new-task-name')
const newTaskTime = document.querySelector('[data-new-task-time')

const LOCAL_STORAGE_DATA_KEY = "task.data"

let taskList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA_KEY)) || []



newTaskForm.addEventListener('submit', e => {
    e.preventDefault()

    const taskName = newTaskName.value
    let taskTime = newTaskTime.value

    if (taskName == null || taskName === '') return
    if (taskTime == null || taskTime === '') taskTime = 'All Day'

    const taskObj = createTaskObj(taskName, taskTime)

    newTaskName.value = null
    newTaskTime.value = null

    taskList.push(taskObj)
    saveAndUpdate()
})

function createTaskObj(taskName, taskTime) {
    return { time: taskTime, taskname: taskName }
}


function saveAndUpdate() {
    save();
    clearAndUpdate();
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(taskList))
}


function clearAndUpdate() {
    clearData(taskTable)

    taskList.forEach(task => {
        const taskRow = document.createElement('tr')
        taskRow.classList.add("bg-white", "bg-opacity-50", "border-b", "dark:bg-gray-800", "dark:border-gray-700", "hover:bg-indigo-100", "dark:hover:bg-gray-600", "text-center")

        const taskNum = document.createElement('td')
        const taskTime = document.createElement('td')
        const taskName = document.createElement('td')
        const checkBox = document.createElement('td')
        const taskButtons = document.createElement('td')

        taskNum.classList.add("text-black")
        taskName.classList.add("px-6", "py-3", "text-left")

        taskNum.innerText = taskList.indexOf(task) + 1
        taskTime.innerHTML = task.time
        taskName.innerHTML = task.taskname
        checkBox.innerHTML = `<input type="checkbox" data-index="${taskList.indexOf(task)}">`
        taskButtons.innerHTML = `<a href="#" onclick="edit()" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
        <a href="#" onclick="deleteThis(this)" class="pl-10 font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>`

        taskRow.append(taskNum, taskTime, taskName, checkBox, taskButtons)

        taskTable.appendChild(taskRow)


    })
}

function clearData(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

clearAndUpdate()

function deleteAll() {
    taskList = []
    saveAndUpdate()
}

function deleteThis(button) {
    let row = button.parentNode.parentNode;
    let rowNum = row.getElementsByTagName('td')[0].innerText;

    taskList.splice((rowNum - 1), 1);

    saveAndUpdate()
}

var checkboxes = document.querySelectorAll('input[type = checkbox]');


checkboxes.forEach(chkbox => {

    chkbox.addEventListener("click", () => {

        let timeDone = document.getElementsByTagName('td')[1].innerHTML;
        let taskDone = document.getElementsByTagName('td')[2].innerHTML;
        let taskNum = chkbox.getAttribute("data-index");

        console.log(taskNum);

        if (chkbox.checked) {
            taskList[taskNum]['time'] = "<s>" + timeDone + "</s>";
            taskList[taskNum]['taskname'] = "<s>" + taskDone + "</s>";
        } else {
            taskList[taskNum]['time'] = timeDone;
            taskList[taskNum]['task'] = taskDone;
        }
        saveAndUpdate();
    });
})