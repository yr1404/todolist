//Mark as Done Section

if( document.querySelectorAll('input[type = checkbox]').length > 0) {
    
    var checkboxes = document.querySelectorAll('input[type = checkbox]');


    checkboxes.forEach(chkbox => {

        chkbox.addEventListener("click", () => {

            let tasklist = JSON.parse(localStorage.getItem("data"));
            let timeDone = document.getElementsByTagName('td')[0].innerHTML;
            let taskDone = document.getElementsByTagName('td')[1].innerHTML;
            let tasknum = chkbox.getAttribute("data-index");

            console.log(chkbox);


            chkbox.addEventListener("change", () => {

                if (chkbox.checked) {
                    tasklist[tasknum]['time'] = "<s>" + timeDone + "</s>";
                    tasklist[tasknum]['task'] = "<s>" + taskDone + "</s>";

                    localStorage.setItem("data", JSON.stringify(tasklist));
                    update();
                } else {
                    tasklist[tasknum]['time'] = timeDone;
                    tasklist[tasknum]['task'] = taskDone;

                    localStorage.setItem("data", JSON.stringify(tasklist));
                    update();
                }

            });

        });
    })
}


//Add Task Submit Button  
function norefresh(e) {
    event.preventDefault();


    let task = document.getElementById('task').value;
    let time1 = document.getElementById('time').value;

    if (time1 == "") {
        time1 = "All Day";
    }

    let taskObj = {
        time: time1,
        taskname: task
    };


    if (localStorage.getItem("data") == null) {
        localStorage.setItem("data", "[]");
    }

    tasklist = JSON.parse(localStorage.getItem("data"));
    tasklist.push(taskObj);

    localStorage.setItem("data", JSON.stringify(tasklist));

    update();
    
}

function update() {
    tasklist = JSON.parse(localStorage.getItem("data"));
    
    const createTable = tasklist => {
        let html = "";
        for (const item of tasklist) {
            html += `
                <tr class="bg-white bg-opacity-75 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-indigo-100 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${tasklist.indexOf(item) + 1}
                </th>
                <td class="px-6 py-4">
                ${item.time}
                </td>
                <td class="px-6 py-4">
                ${item.taskname}
                </td>
                <td class="px-6 py-4 text-center">
                <input type="checkbox" data-index="${tasklist.indexOf(item)}">
                </td>
                <td class="px-6 py-4 text-right ">
                <a href="#" onclick="edit()" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                <a href="#" onclick="deletethis(this)" class="pl-10 font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                </td>
                
                </tr>
                `;
            }
            // console.log(html);
            return html;

        }
        
        
        document.getElementById('table-data').innerHTML = createTable(tasklist);

        // markdone();

}
function edit() {

}
function deletethis(button) {
    let tasklist = JSON.parse(localStorage.getItem("data"));

    let row = button.parentNode.parentNode;
    let rowNum = row.getElementsByTagName('th')[0].innerHTML;

    tasklist.splice((rowNum - 1), 1);

    localStorage.setItem("data", JSON.stringify(tasklist));
    update();
}

function deleteall() {
    let tasklist = [];
    localStorage.setItem("data", JSON.stringify(tasklist));
    update();
}


