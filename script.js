const sessionForm = document.getElementById('study-session-form');
const sessionList = document.getElementById('session-list');
let sessions = [];

// Load saved sessions from local storage
if (localStorage.getItem('sessions')) {
  sessions = JSON.parse(localStorage.getItem('sessions'));
  renderSessions();
}

sessionForm.addEventListener('submit', addStudySession);

function addStudySession(event) {
  event.preventDefault();

  const subject = event.target.subject.value;
  const date = event.target.date.value;
  const time = event.target.time.value;
  const duration = event.target.duration.value;

  const newSession = {
    subject,
    date,
    time,
    duration
  };

  sessions.push(newSession);
  saveSessionsToLocalStorage();
  renderSessions();

  // Clear the form
  event.target.reset();
}

function renderSessions() {
  sessionList.innerHTML = '';
  sessions.forEach(session => {
    const sessionItem = document.createElement('li');
    sessionItem.innerHTML = `<span>${session.subject}</span> | ${session.date} ${session.time} | ${session.duration} min`;
    sessionList.appendChild(sessionItem);
  });
}

function saveSessionsToLocalStorage() {
  localStorage.setItem('sessions', JSON.stringify(sessions));
}

sessionList.addEventListener('click', deleteStudySession);

function deleteStudySession(event) {
  if (event.target.tagName === 'SPAN') {
    const sessionText = event.target.textContent;
    const sessionIndex = sessions.findIndex(session => {
      return `${session.subject} | ${session.date} ${session.time} | ${session.duration} min` === sessionText;
    });

    if (sessionIndex !== -1) {
      sessions.splice(sessionIndex, 1);
      saveSessionsToLocalStorage();
      renderSessions();
    }
  }
}

const clearSessionsButton = document.getElementById('clear-sessions');
clearSessionsButton.addEventListener('click', clearAllSessions);

function clearAllSessions() {
  sessions = [];
  saveSessionsToLocalStorage();
  renderSessions();
}

//for canender

// ... (previous JavaScript code)

const toggleTodoButton = document.getElementById('toggle-todo');
const todoMenu = document.querySelector('.todo-menu');

toggleTodoButton.addEventListener('click', toggleTodoList);

function toggleTodoList() {
  todoMenu.classList.toggle('open');
}

// ... (rest of the code)
// ... (previous JavaScript code)

const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
let tasks = [];

addTaskButton.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    tasks.push(taskText);
    saveTasksToLocalStorage();
    renderTasks();
    taskInput.value = '';
  }
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.textContent = task;
    taskList.appendChild(taskItem);
  });
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load saved tasks from local storage
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  renderTasks();
}

// ... (rest of the code)
// ... (previous JavaScript code)

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const taskItem = document.createElement('li');
      taskItem.textContent = task;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteTask(index));
      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);
    });
  }
  
  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    renderTasks();
  }
  
  // timer

  let timer;
let pomodoroDuration = 25 * 60; // 25 minutes in seconds
let breakDuration = 5 * 60; // 5 minutes in seconds
let isPomodoro = true; // Flag to track current session

function startTimer(duration) {
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
  pomodoroDuration = duration;
}

function updateTimer() {
  const minutes = Math.floor(pomodoroDuration / 60);
  const seconds = pomodoroDuration % 60;
  
  document.getElementById('timer-display').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  pomodoroDuration--;
  if (pomodoroDuration < 0) {
    clearInterval(timer);
    document.getElementById('timer-display').textContent = '00:00';

    if (isPomodoro) {
      isPomodoro = false;
      startTimer(breakDuration);
    } else {
      isPomodoro = true;
      startTimer(pomodoroDuration);
    }
  }
}

document.getElementById('start-button').addEventListener('click', () => {
  if (isPomodoro) {
    startTimer(pomodoroDuration);
  } else {
    startTimer(breakDuration);
  }
});

document.getElementById('pause-button').addEventListener('click', () => clearInterval(timer));

