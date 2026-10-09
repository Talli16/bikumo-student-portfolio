/* COS 106 Bikumo Student Portfolio JavaScript
   Demonstrates event handling, functions, arrays, DOM updates, validation, and localStorage. */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Update the footer year automatically.
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Responsive navigation menu for smaller screens.
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
      menuToggle.textContent = isOpen ? "×" : "☰";
    });
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
      });
    });
  }

  setupAcademicPlanner();
  setupContactForm();
});

function setupAcademicPlanner() {
  const taskForm = document.querySelector("#task-form");
  const taskTitle = document.querySelector("#task-title");
  const taskDate = document.querySelector("#task-date");
  const taskPriority = document.querySelector("#task-priority");
  const taskList = document.querySelector("#task-list");
  const taskFeedback = document.querySelector("#task-feedback");
  const taskFilter = document.querySelector("#task-filter");
  const taskCount = document.querySelector("#task-count");
  const progressText = document.querySelector("#task-progress-text");
  const progressBar = document.querySelector("#task-progress-bar");
  const clearCompletedButton = document.querySelector("#clear-completed");
  const clearAllButton = document.querySelector("#clear-all");

  // Only initialise planner logic on planner.html.
  if (!taskForm || !taskList) return;

  const STORAGE_KEY = "cos106StudentPortfolioTasks";
  let tasks = loadTasks();

  function loadTasks() {
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY);
      const parsed = storedTasks ? JSON.parse(storedTasks) : [];
      return Array.isArray(parsed) ? parsed.filter((task) =>
        task && typeof task.id === "string" && typeof task.title === "string"
      ) : [];
    } catch (error) {
      return [];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      taskFeedback.textContent = "Could not save tasks in this browser. Your changes may not persist.";
      taskFeedback.className = "form-feedback error";
    }
  }

  function showFeedback(message, type) {
    taskFeedback.textContent = message;
    taskFeedback.className = "form-feedback " + (type || "");
  }

  function renderTasks() {
    const filter = taskFilter.value;
    const visibleTasks = tasks.filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });

    taskList.replaceChildren();

    if (visibleTasks.length === 0) {
      const emptyItem = document.createElement("li");
      emptyItem.className = "empty-state";
      emptyItem.textContent = tasks.length === 0
        ? "Your task list is empty. Add your first task above."
        : "No tasks match this filter.";
      taskList.appendChild(emptyItem);
    } else {
      visibleTasks.forEach((task) => {
        const item = document.createElement("li");
        item.className = "task-item" + (task.completed ? " completed" : "");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-check";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Mark " + task.title + " as completed");
        checkbox.addEventListener("change", () => {
          task.completed = checkbox.checked;
          saveTasks();
          renderTasks();
        });

        const textWrap = document.createElement("div");
        textWrap.className = "task-text";
        const title = document.createElement("strong");
        title.textContent = task.title;
        textWrap.appendChild(title);

        const details = document.createElement("small");
        details.textContent = task.dueDate ? "Due: " + task.dueDate : "No due date";
        textWrap.appendChild(details);

        const priority = document.createElement("span");
        priority.className = "priority " + task.priority;
        priority.textContent = task.priority + " priority";
        textWrap.appendChild(priority);

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-task";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("aria-label", "Delete task: " + task.title);
        deleteButton.addEventListener("click", () => {
          tasks = tasks.filter((itemTask) => itemTask.id !== task.id);
          saveTasks();
          renderTasks();
          showFeedback("Task deleted.", "success");
        });

        item.append(checkbox, textWrap, deleteButton);
        taskList.appendChild(item);
      });
    }

    const completedCount = tasks.filter((task) => task.completed).length;
    const percent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
    taskCount.textContent = tasks.length + (tasks.length === 1 ? " task" : " tasks");
    progressText.textContent = percent + "% completed";
    progressBar.style.width = percent + "%";
    progressBar.setAttribute("role", "progressbar");
    progressBar.setAttribute("aria-valuemin", "0");
    progressBar.setAttribute("aria-valuemax", "100");
    progressBar.setAttribute("aria-valuenow", String(percent));
  }

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = taskTitle.value.trim();
    if (!title) {
      showFeedback("Please enter a task description.", "error");
      taskTitle.focus();
      return;
    }

    tasks.unshift({
      id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2),
      title: title,
      dueDate: taskDate.value,
      priority: taskPriority.value,
      completed: false
    });
    saveTasks();
    taskForm.reset();
    taskPriority.value = "Normal";
    taskFilter.value = "all";
    renderTasks();
    showFeedback("Task added successfully.", "success");
    taskTitle.focus();
  });

  taskFilter.addEventListener("change", renderTasks);

  clearCompletedButton.addEventListener("click", () => {
    const before = tasks.length;
    tasks = tasks.filter((task) => !task.completed);
    saveTasks();
    renderTasks();
    showFeedback(before === tasks.length ? "There are no completed tasks to clear." : "Completed tasks cleared.", "success");
  });

  clearAllButton.addEventListener("click", () => {
    if (tasks.length === 0) {
      showFeedback("There are no tasks to delete.", "");
      return;
    }
    if (window.confirm("Delete every task? This cannot be undone.")) {
      tasks = [];
      saveTasks();
      renderTasks();
      showFeedback("All tasks deleted.", "success");
    }
  });

  renderTasks();
}

function setupContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const fields = {
    name: document.querySelector("#contact-name"),
    email: document.querySelector("#contact-email"),
    phone: document.querySelector("#contact-phone"),
    message: document.querySelector("#contact-message")
  };
  const feedback = document.querySelector("#contact-feedback");
  const errors = {
    name: document.querySelector("#name-error"),
    email: document.querySelector("#email-error"),
    phone: document.querySelector("#phone-error"),
    message: document.querySelector("#message-error")
  };

  function setFieldError(key, message) {
    errors[key].textContent = message;
    fields[key].classList.toggle("input-invalid", Boolean(message));
    fields[key].setAttribute("aria-invalid", String(Boolean(message)));
  }

  function validateField(key) {
    const value = fields[key].value.trim();
    let message = "";

    if (!value) {
      message = "This field is required.";
    } else if (key === "email") {
      // Basic email-format check suitable for a front-end class exercise.
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailPattern.test(value)) message = "Enter a valid email address (e.g. name@example.com).";
    } else if (key === "phone") {
      if (!/^\d+$/.test(value)) {
        message = "Use digits only, with no spaces, + sign, or hyphens.";
      } else if (value.length < 7 || value.length > 15) {
        message = "Enter a phone number between 7 and 15 digits.";
      }
    } else if (key === "name" && value.length < 2) {
      message = "Please enter at least 2 characters.";
    } else if (key === "message" && value.length < 5) {
      message = "Please enter a message of at least 5 characters.";
    }

    setFieldError(key, message);
    return message === "";
  }

  Object.keys(fields).forEach((key) => {
    fields[key].addEventListener("input", () => {
      if (fields[key].classList.contains("input-invalid")) validateField(key);
    });
    fields[key].addEventListener("blur", () => validateField(key));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const keys = Object.keys(fields);
    const allValid = keys.map(validateField).every(Boolean);

    if (!allValid) {
      feedback.textContent = "Please correct the highlighted fields and try again.";
      feedback.className = "form-feedback error";
      const firstInvalid = keys.find((key) => fields[key].getAttribute("aria-invalid") === "true");
      if (firstInvalid) fields[firstInvalid].focus();
      return;
    }

    feedback.textContent = "Validation successful! This demo does not send your message to a server.";
    feedback.className = "form-feedback success";
    // Intentionally do not transmit or store personal contact information.
  });
}
