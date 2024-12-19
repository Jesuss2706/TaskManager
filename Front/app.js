// get all services and use the endpoints

const generalUrl = 'http://localhost:8080';

const getAllTasks = async () => {
    const url = `${generalUrl}/tasks`;
    return await fetch(url).then(response => r.json());
}

const getTaskById = async (id) => {
    const url = '${generalUrl}/tasks/${id}';
    return await fetch(url).then(response => r.json());
}

const createTask = async (task) => {
    const url = '${generalUrl}/tasks';
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(response => response.json());
}


const updateTask = async (task) => {
    const url = '${generalUrl}/tasks/${task.id}';
    return await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(response => response.json());
}

const deleteTask = async (id) => {
    const url = '${generalUrl}/tasks/${id}';
    return await fetch(url, {
        method: 'DELETE'
    }).then(response => r.json());
}

//let modal = new boostrap.Modal(document.getElementById('exampleModal'), {keyboard: false});


let id = null;
let taskTable = document.getElementById('tableName'); 


// get all data and use in the table
async function readTask() {
    var datas = "";
    const result = await getAllTasks();

    for (let i = 0; i < result.length; i++) {
        const task = result[i]; 
        datas += "<tr>";
        datas += `<td>${task.id}</td>`;
        datas += `<td>${task.name}</td>`;
        datas += `<td>${task.description}</td>`;
        datas += `<td>${task.startDate}</td>`;
        datas += `<td>${task.endDate}</td>`;
        datas += `<td>${task.priority}</td>`;
        // datas += '<td>'
        //     + '<div class="btn-group" role="group" aria-label="Editar">'
        //     + `<button type="button" class="btn btn-sm btn-success" onclick="showModal(${task.id})">Update</button>`
        //     + '</div>'

        //     + ' <div class="btn-group" role="group" aria-label="eliminar">'
        //     + `<button type="button" class="btn btn-sm btn-danger" onclick="deleteValues(${task.id})">Delete</button>`
        //     + '</div>'

        //     + '</td>';
        datas += "</tr>";
    }

    taskTable.innerHTML = datas;
}

readTask();