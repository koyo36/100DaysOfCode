class Controller
{
    constructor(taskItem)
    {
        this.taskList = [];
    }

    create(task)
    {
        let listItem = `
            <li class="todo">
                <span>${task.title}</span>
                <span>Description: ${task.description}</span>
                <span>Due Date: ${task.duedate}</span>
                <span>Priority: ${task.priority}</span>
                <span>${task.id}</span>
            </li>
        `;

        return listItem;
    }
    taskList() {
        return this.taskList;
    }

    addTask(task)
    {
        this.taskList.push(task);
        this.update();
    }

    update()
    {
        console.log('update');
    }

    remove(id)
    {
        this.taskList.splice(i,1);
        this.update();
    }
}
export { Controller }
