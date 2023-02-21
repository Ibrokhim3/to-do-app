let tasks = [];

const elTaskWrapper = document.querySelector(".todo-list");

const elTemplate = document.querySelector(".template");

const renderTasks = () => {
  elTaskWrapper.innerHTML = "";

  tasks.forEach((taskItem) => {
    const elTaskItem = elTemplate.cloneNode(true).content;

    const { task } = taskItem;

    // const elCheckBox = elTaskItem.querySelector(".todo-list__checkbox");
    // elCheckBox.textContent = isChecked;

    const elTask = elTaskItem.querySelector(".task-name");
    elTask.textContent = task;

    elTaskWrapper.append(elTaskItem);
  });
};

const getTasks = () => {
  fetch("http://localhost:3005/tasks")
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .then((data) => {
      if (data) {
        tasks = data;
        renderTasks();
      }
    });
};
getTasks();
const elForm = document.querySelector(".form");

// elForm.dataset.type = "add";

const elTaskInput = document.querySelector(".add-task");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const target = evt.target;
  const elements = evt.target.elements;

  let { taskInput } = target;

  // const taskValue = elTaskInput.value;

  const newTask = {
    task: taskInput.value,
  };
  console.log(newTask);

  fetch("http://localhost:3005/tasks", {
    method: "POST",
    body: JSON.stringify(newTask),
    // headers: {
    //   "Content-type": "application/json",
    // },
  })
    .then((res) => {
      if (res.status === 201) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .then((data) => {
      elTaskWrapper.innerHTML = "";
      getTasks();
    })
    .catch((err) => {
      console.log(err);
    });
  renderTasks();
});
