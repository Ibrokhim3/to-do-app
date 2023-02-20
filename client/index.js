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

// fetch("http://localhost:3005/create-task").then((res)=>{
//   if()
// });
