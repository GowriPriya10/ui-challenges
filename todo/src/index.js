import '../styles.css';
import TaskStore from './task-store';

const taskStore = new TaskStore();
const taskAddButton = document.getElementById('add-task');
const taskInput = document.getElementById('task-item-input');
const taskList = document.querySelector('#task-list-wrapper');

taskAddButton.addEventListener('click', () => {
    addTaskToStore()
});

taskInput.addEventListener('keyup', (event) => {
    if(event.code === 'Enter') {
        addTaskToStore();
    }
});

function addTaskToStore() {
    if(!taskInput.value) {
        alert('Please enter a valid task');
        return;
    }

    const item = taskStore.addTask(taskInput.value);
    addTaskToDOM(item);
    taskInput.value = '';
}

function renderTaskList() {
    /**
     * 1. Get the task list from the store
     * 2. Traverse through the task list and create a task item for each task
     *      using the clone of template 'task'
     * 3. Append the task item to the task list wrapper
     */

    const taskList = taskStore.getTasks();
    
    if(taskList.length > 0) {
        taskList.forEach(taskItem => {
            addTaskToDOM(taskItem);
        });
    }
}

function addTaskToDOM(taskItem) {
    const taskListWrapper = document.getElementById('task-list-wrapper');
    
    const node = document.getElementById('task').content.cloneNode(true);
    const taskContainer = node.querySelector('.task-item');
    const taskCheckbox = node.querySelector('.task-item-checkbox');
    const taskData = node.querySelector('.task-item-data');
    const taskDelete = node.querySelector('.task-item-action');

    taskContainer.id = taskItem.id;
    taskCheckbox.checked = taskItem.completed;
    taskData.innerText = taskItem.title;
    
    if(taskCheckbox.checked) {
        taskData.classList.add('task-item-done');
    }

    taskCheckbox.addEventListener('change', () => {
        taskStore.updateTask(taskItem.id);
        if(taskCheckbox.checked) {
            taskData.classList.add('task-item-done');
        }else {
            taskData.classList.remove('task-item-done');
        }
    });

    taskDelete.addEventListener('click', () => { deleteTask(taskItem.id, taskListWrapper, taskContainer) });
    taskDelete.addEventListener('keydown', (event) => {
        if(event.code === 'Enter') {
            deleteTask(taskItem.id, taskListWrapper, taskContainer);
        }
    })
    taskListWrapper.appendChild(node);
}

function deleteTask (taskId, wrapper, container) {
    // Delete task from the store
    // Delete task from the DOM
    taskStore.deleteTask(taskId);
    wrapper.removeChild(container);
}

renderTaskList();

taskList.addEventListener('dragstart', (e) => {
    e.target.classList.add('dragging');
})

let throttle = true; 
taskList.addEventListener('dragover', function(event) {
    event.preventDefault();
    
    if (throttle) {

      throttle = false;

      onDrag(event);
      
      setTimeout(() => {
        throttle = true;
      }, 100);
    }
    console.log('waiting')
    return false;
});

function onDrag(e) {
   
    const taskListWrapper = document.querySelector('#task-list-wrapper');
    const dragEle = document.querySelector('.dragging');

    const draggableEle = [...taskListWrapper.querySelectorAll('.task-item:not(.dragging)')];

    // find the ele which is closest 
    const afterEle = draggableEle.find(ele => {
        return e.clientY <= ele.offsetTop + ele.offsetHeight/2;;
    })

    if(afterEle){
        taskListWrapper.insertBefore(dragEle, afterEle);
    }else {
        taskListWrapper.appendChild(dragEle);
    }
}

taskList.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
})

// function throttle(func, delay) {
// 	let wait = false;

//   return (...args) => {
//     if (wait) {
//         console.log('waiting')
//         return;
//     }

//     func(...args);
//     wait = true;
//     setTimeout(() => {
//       wait = false;
//     }, delay);
//   }
// }
