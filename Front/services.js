const generalUrl = 'http://localhost:8080';

export const getAllTasks = async () => {
    const url = `${generalUrl}/tasks`;
    return await fetch(url).then(r => r.json());
}

export const getTaskById = async (id) => {
    const url = `${generalUrl}/tasks/${id}`;
    return await fetch(url).then(r => r.json());
}

export const createTask = async (task) => {
    const url = `${generalUrl}/tasks`;
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(response => response.json());
}


export const updateTask = async (task) => {
    const url = `${generalUrl}/tasks/${task.id}`;
    return await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(response => response.json());
}

export const deleteTask = async (id) => {
    const url = `${generalUrl}/tasks/${id}`;
    return await fetch(url, {
        method: 'DELETE'
    }).then(response => response.json());
}
