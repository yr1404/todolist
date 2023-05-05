const taskTable = document.querySelector('[table-data]')

const newTaskForm = document.querySelector('[data-new-task-form')
const newTaskName = document.querySelector('[data-new-task-name')
const newTaskTime = document.querySelector('[data-new-task-time')

let taskList = [
    {
        time: 'time1',
        taskname: 'task'
    },
    {
        time: 'time1',
        taskname: 'task'
    }]

    newTaskForm.addEventListener('submit', e => {
        e.preventDefault()
        

    })

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
        taskRow.dataset.rowId = task.id

        taskName.classList.add("px-6", "py-3", "text-left")

        taskNum.innerText = taskList.indexOf(task)+1
        taskTime.innerText = task.time
        taskName.innerText = task.taskname
        checkBox.innerHTML = `<input type="checkbox" data-index="${taskNum}">`
        taskButtons.innerHTML = `<a href="#" onclick="edit()" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
        <a href="#" onclick="deletethis(this)" class="pl-10 font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>`

        taskRow.append(taskNum, taskTime, taskName, checkBox, taskButtons)

        taskTable.appendChild(taskRow)


    })
}

function clearData(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

clearAndUpdate()