import mysql from 'mysql2'

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'task_manager'
}).promise();

export async function getTasks() {
    const [rows] = await pool.query("SELECT * FROM tasks");
    return [rows];
}

export async function getTaskById(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM tasks
    WHERE id_task = ?
    `, [id]);
    return rows[0];
}

export async function createTask(nombre, descripcion, fecha_inicio, fecha_final, prioridad) {
    const [result] = await pool.query(`
    INSERT INTO tasks (name_task, description_task, start_date, final_date, priority)
    VALUES (?, ?, ?, ?, ?)
    `, [nombre, descripcion, fecha_inicio, fecha_final, prioridad]);
    return result;
}

export async function updateTask(id, nombre, descripcion, fecha_inicio, fecha_final, prioridad) {
    const [result] = await pool.query(
        `UPDATE tasks SET 
    name_task = ?, 
    description_task = ?, 
    start_date = ?, 
    final_date = ?, 
    priority = ? 
    WHERE id_task = ?`,
        [nombre, descripcion, fecha_inicio, fecha_final, prioridad, id]
    );

    return getTaskById(id);
}

export async function deleteTask(id) {
    const [result] = await pool.query(
        'DELETE FROM `tasks` WHERE `tasks`.`id_task` = ?', [id]);
    return 'se ha eliminado correctamente'
}