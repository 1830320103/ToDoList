document.getElementById('addTaskBtn').addEventListener('click', openTaskForm);
document.getElementById('taskForm').addEventListener('submit', saveTask);

function openTaskForm() {
  document.getElementById('taskFormOverlay').style.display = 'block';
  // Reset the form whenever it's opened
  document.getElementById('taskForm').reset();
  toggleTaskType(); // Ensure that the correct fields are shown/hidden when opening the form
}

function closeTaskForm() {
  document.getElementById('taskFormOverlay').style.display = 'none';
}

function saveTask(event) {
  event.preventDefault();

  // Get form values
  var taskType = document.getElementById('taskType').value;
  var taskName = document.getElementById('taskName').value;
  var dueDate = document.getElementById('dueDate').value;
  var priority = document.getElementById('priority').value;
  var description = document.getElementById('description').value;
  
  // Variables for team task
  var assignee = '';
  var teamMembers = '';
  
  if (taskType === 'team') {
    assignee = document.getElementById('assignee').value;
    teamMembers = document.getElementById('teamMembers').value;
  }

  // Validate form values
  if (!taskName || !dueDate) {
    alert('Please fill out all required fields.');
    return;
  }

  // Additional validation logic can be added here

  // Save or update task in the list
  var taskList = document.getElementById('taskList');
  var li = document.createElement('li');
  
  if (taskType === 'team') {
    li.innerHTML = `<strong>${taskName}</strong><br>Due: ${dueDate}<br>Priority: ${priority}<br>Team Members: ${teamMembers}<br>Assignee: ${assignee}<br>Description: ${description}`;
  } else {
    li.innerHTML = `<strong>${taskName}</strong><br>Due: ${dueDate}<br>Priority: ${priority}<br>Description: ${description}`;
  }
  
  taskList.appendChild(li);

  // Close the form
  closeTaskForm();
}

function toggleTaskType() {
  var taskType = document.getElementById('taskType').value;
  var teamFields = document.getElementById('teamFields');
  if (taskType === 'team') {
    teamFields.style.display = 'block';
  } else {
    teamFields.style.display = 'none';
  }
}


function deleteTask(event) {
  event.preventDefault();

  // Get the task list item that was clicked on
  var taskItem = event.target.parentElement;

  // Remove the task item from the list
  taskItem.remove();
}

// Add event listener to each task item's delete button
document.querySelectorAll('.delete-btn').forEach(function(button) {
  button.addEventListener('click', function(event) {
    deleteTask(event);
  });
});
    document.querySelector('.input-todo').addEventListener('keyup', function (e) {
        // console.log(e)
        // trim 去首尾空格
        var name = e.target.value || ''
        if (!name || !name.trim()) {
            return
        }
        if (e.key === 'Enter') {
            console.log('按下了回车键')
            var item = {
                name: name,
                completed: false,
            }
            list.push(item)
            render(list)
            e.target.value = ''
        }
    })

    var list = [{
        name: 'task1',
        completed: false,
    }, {
        name: 'task2',
        completed: true,
    }, {
        name: 'task3',
        completed: true,
    }]

    render(list)


    document.querySelector('.input-todo').addEventListener('keyup', function (e) {
        // console.log(e)
        // trim 去首尾空格
        var name = e.target.value || ''
        if (!name || !name.trim()) {
            return
        }
        if (e.key === 'Enter') {
            console.log('按下了回车键')
            var item = {
                name: name,
                completed: false,
            }
            list.push(item)
            render(list)
            e.target.value = ''
        }
    })

    document.querySelectorAll('.filter-btn').forEach((el) => {
        el.addEventListener('click', filterCompletedStatus)
    })

    function filterCompletedStatus(e) {
        console.log('点击了按钮')
        // html 自定义属性 data-*   data-type="哈哈哈"   el.dataset.type
        console.log(e.target.dataset)
        var completed = e.target.dataset.completed
        if (completed === 'all') {
            return renderTodoList(list)
        }

        var newList = list.filter((item) => item.completed === Boolean(Number(completed)))
        render(newList)
    }


    document.querySelector('.btn-clean').addEventListener('click', () => {
        list = []
        render(list)
    })


    function deleteItem(index) {
        // console.log(`点击了第${index}个删除按钮`)
        list.splice(index, 1);  // splice修改原数组，返回值是被删除的值
        render(list);
    }

    function onClickCompleteBtn(index) {
        // console.log(`点击了第${index}个完成按钮`)
        // console.log('item:', list[index])
        list[index].completed = !list[index].completed
        render(list)
    }

    function render(list) {
        updateActiveNum()
        renderTodoList(list)
    }

    function updateActiveNum() {
        // 1，计算出还有几个未完成
        // 2，改.active-num的innerHTML
        var num = list.filter(item => !item.completed).length
        document.querySelector('.active-num').innerHTML = num
    }

    function renderTodoList(list) {
        var html = ''
        list.forEach((item, index) => {
            var itemClass = item.completed ? 'todo-item item-complete' : 'todo-item'
            var spanClass = item.completed ? 'icon-complete icon-complete-active' : 'icon-complete'
            html = html + `<li class="${itemClass}">
            <span onclick="onClickCompleteBtn(${index})" class="${spanClass}"></span>
            <span>${item.name}</span>
            <div class="btn-group">
                <button onclick="" class="btn-complete">完成</button>
                <button onclick="deleteItem(${index})" class="btn-delete">删除</button>
            </div>
        </li>`
        })

        document.querySelector('.todo-list').innerHTML = html
}