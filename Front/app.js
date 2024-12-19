import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../Front/services.js';

let taskTable = document.getElementById('tableName');

// Function to open the modal
function showModal(taskId = null) {
    const modal = document.getElementById('exampleModal');

    if (taskId) {
        getTaskById(taskId).then(task => {
            console.log(task);
            document.getElementById('taskId').value = task.id_task;
            document.getElementById('nameTask').value = task.name_task;
            document.getElementById('descriptionTask').value = task.description_task;
            document.getElementById('startDate').value = task.start_date.split('T')[0];
            document.getElementById('endDate').value = task.final_date.split('T')[0];
            document.getElementById('priority').value = task.priority;
        }).catch(error => console.error(error));
    } else {
        document.getElementById('taskForm').reset();
    }

    modal.classList.add('show');
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    document.body.appendChild(backdrop);
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('exampleModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();
}

// Function to save the task (create or update)
function saveTask() {
    const task = {
        id: document.getElementById('taskId').value,
        name: document.getElementById('nameTask').value,
        description: document.getElementById('descriptionTask').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        priority: document.getElementById('priority').value,
    };

    if (task.id) {
        updateTask(task).then(() => readTask());
    } else {
        createTask(task).then(() => readTask());
    }
    closeModal();
}

// Function to populate the table
async function readTask() {
    const result = await getAllTasks();
    let rows = "";
    result.forEach(task => {
        rows += `<tr>
            <td>${task.id_task}</td>
            <td>${task.name_task}</td>
            <td>${task.description_task}</td>
            <td>${task.start_date.split('T')[0]}</td>
            <td>${task.final_date.split('T')[0]}</td>
            <td>${task.priority}</td>
            <td>
                <button class="btn btn-sm btn-success" onclick="showModal(${task.id_task})">Update</button>
                <button class="btn btn-sm btn-danger" onclick="deleteValues(${task.id_task})">Delete</button>
            </td>
        </tr>`;
    });
    taskTable.innerHTML = rows;
}

// Function to delete a task
async function deleteValues(id) {
    await deleteTask(id);
    readTask();
}

// Exponer funciones globalmente
window.showModal = showModal;
window.closeModal = closeModal;
window.saveTask = saveTask;
window.deleteValues = deleteValues;

readTask();
