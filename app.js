const item = document.querySelector('#item');
const todo = document.querySelector('#to-do-list');

item.addEventListener(
    "keyup", function (event) {
        if (event.key == "Enter") {
            if (item.value.trim() <= 0) {
                // console.log("Empty field");
                return;

            }
            const valTask = this.value;
            item.value = null;
            createTasks(valTask);
        }
    }
)

createTasks = (task) => {
    const newTask = document.createElement("li");
    todo.appendChild(newTask);
    newTask.innerHTML = `
        ${task}
        <i class="fa fa-close" style="font-size:15px;"></i>
    `;

    newTask.addEventListener(
        "click",
        function () {
            this.classList.toggle("done");
        }
    )

    newTask.querySelector('i').addEventListener(
        "click",
        function () {
            newTask.remove();
            saveTasks();
        }
    )
    saveTasks();

}

saveTasks = () => {
    const data = [];
    const child = todo.childNodes;
    child.forEach(
        (tsk) => {
            data.push(tsk.innerText);
        }
    )

    if (data.length == 0) {
        localStorage.removeItem("tasks");
    } else {

        localStorage.setItem("tasks", JSON.stringify(data));
    }
}

(
    function () {

        const tasksLS = JSON.parse(localStorage.getItem("tasks"));
        // console.log(tasksLS);

        tasksLS.forEach(
            (tsk) => {
                createTasks(tsk);
            }
        )

    }

)()

