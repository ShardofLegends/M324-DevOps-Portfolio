<script>
  import { onMount } from 'svelte';

  let lists = [
    { name: 'Personal', tasks: [] },
    { name: 'Work', tasks: [] }
    // Add more sections as needed
  ];

  let newTasks = new Array(lists.length).fill('');
  let showPopup = false;
  let newSectionName = '';

  function addTask(listIndex) {
    const newTask = newTasks[listIndex].trim();
    if (newTask) {
      lists[listIndex].tasks = [...lists[listIndex].tasks, newTask];
      newTasks[listIndex] = ''; // Reset newTask after adding task
    }
  }

  function removeTask(listIndex, taskIndex) {
    lists[listIndex].tasks.splice(taskIndex, 1);
    lists = [...lists]; // Update the lists array to trigger reactivity
  }

  function addSection() {
    showPopup = true;
  }

  function confirmSection() {
    if (newSectionName.trim()) {
      lists = [...lists, { name: newSectionName, tasks: [] }];
      newSectionName = '';
      showPopup = false;
    }
  }

  function closePopup() {
    showPopup = false;
    newSectionName = '';
  }

  onMount(() => {
    // Add event listener to close popup on Escape key press
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    });
  });

  let editingIndex = -1;

function editSection(index) {
  editingIndex = index;
  newSectionName = lists[index].name;
  showPopup = true;
}

function deleteSection(index) {
  lists.splice(index, 1);
}

function confirmEdit() {
  if (newSectionName.trim()) {
    lists[editingIndex].name = newSectionName;
    editingIndex = -1;
    newSectionName = '';
    showPopup = false;
  }
}
let updateFlag = 0;

  function removeSection(index) {
    lists = lists.filter((_, i) => i !== index);
    updateFlag += 1;
  }

  $: lists = [...lists];
</script>

<main>
  <h1>SvelteKit Todo App</h1>
  {#each lists as list, listIndex (list.name)}
    <div class="todo-list">
      <div class="list-header">
        <h2>{list.name}</h2>
        <div class="list-options">
          <button on:click={() => editSection(listIndex)}>Edit</button>
          <button on:click={() => deleteSection(listIndex)}>Delete</button>
        </div>
      </div>
      <div class="add-task">
        <input class="task-input" bind:value={newTasks[listIndex]} placeholder="Add a new task" on:keydown={(event) => event.key === 'Enter' && addTask(listIndex)} />
        <button class="add-button" on:click={() => addTask(listIndex)}>Add</button>
      </div>
      <ul class="task-list">
        {#each list.tasks as task, taskIndex (task)}
          <li class="task-item">
            {task}
            <button class="remove-button" on:click={() => removeTask(listIndex, taskIndex)}>Remove</button>
          </li>
        {/each}
      </ul>
    </div>
  {/each}

  <div class="sticky-button" on:click={addSection}>
    +
  </div>

  {#if showPopup}
    <div class="popup">
      <div class="popup-content">
        <input bind:value={newSectionName} placeholder="Enter section name" />
        <button on:click={editingIndex === -1 ? confirmSection : confirmEdit}>{editingIndex === -1 ? 'Confirm' : 'Save Changes'}</button>
        <button on:click={closePopup}>Cancel</button>
      </div>
    </div>
  {/if}
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 20px;
  }
  h1 {
    color: #333;
  }
  .todo-list {
    margin-bottom: 40px;
  }
  .add-task {
    margin-bottom: 20px;
  }
  .task-input {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .add-button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .task-list {
    list-style-type: none;
    padding: 0;
  }
  .task-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  .remove-button {
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .sticky-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
  }

  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .popup-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list-options button {
    margin-left: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
