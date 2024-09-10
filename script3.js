document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('deleteSelectedButton').addEventListener('click', deleteAllChecked);
window.addEventListener('load', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput').value.trim();
    const taskDate = document.getElementById('taskDate').value;

    if (taskInput !== '' && taskDate) {
        const li = document.createElement('li');

        li.innerHTML = `
            <input type="checkbox" />
            <span>${taskInput} (${taskDate})</span>
            <button class="deleteButton">Удалить</button>
        `;

        li.querySelector('input[type="checkbox"]').addEventListener('change', function () {
            li.classList.toggle('completed', this.checked);
            saveTasks();
        });

        li.querySelector('.deleteButton').addEventListener('click', function () {
            li.remove();
            saveTasks();
        });

        document.getElementById('taskList').appendChild(li);
        document.getElementById('taskInput').value = '';
        document.getElementById('taskDate').value = '';

        saveTasks();
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    taskList.querySelectorAll('li').forEach(li => {
        const taskText = li.querySelector('span').textContent;
        const isChecked = li.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, checked: isChecked });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const li = document.createElement('li');

        li.innerHTML = `
            <input type="checkbox" ${task.checked ? 'checked' : ''} />
            <span>${task.text}</span>
            <button class="deleteButton">Удалить</button>
        `;

        li.querySelector('input[type="checkbox"]').addEventListener('change', function () {
            li.classList.toggle('completed', this.checked);
            saveTasks();
        });

        li.querySelector('.deleteButton').addEventListener('click', function () {
            li.remove();
            saveTasks();
        });

        document.getElementById('taskList').appendChild(li);
        if (task.checked) {
            li.classList.add('completed');
        }
    });
}

function deleteAllChecked() {
    const checkedItems = document.querySelectorAll('#taskList li input[type="checkbox"]:checked');
    checkedItems.forEach(checkbox => {
        const li = checkbox.parentElement;
        li.remove();
    });
    saveTasks();
}