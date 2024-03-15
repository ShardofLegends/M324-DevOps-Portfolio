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
  let showOptions = false;
  let optionsIndex = -1;
  let showEditDeletePopup = false; // New state variable

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
    showEditDeletePopup = false; // Close edit/delete popup on cancel
  }

  function editSection(index) {
    newSectionName = lists[index].name;
    optionsIndex = index;
    showOptions = false; // Hide options after clicking on edit
    showEditDeletePopup = true; // Show the edit/delete popup
  }

  function deleteSection(index) {
    lists.splice(index, 1);
    showOptions = false; // Hide options after clicking on delete
  }

  function confirmEdit() {
    if (newSectionName.trim()) {
      lists[optionsIndex].name = newSectionName;
      newSectionName = '';
      showPopup = false;
      showEditDeletePopup = false; // Hide edit/delete popup after confirming edit
    }
  }

  function showOptionsPopup(index) {
    showOptions = !showOptions;
    optionsIndex = index;
  }

  let updateFlag = 0;

  function removeSection(index) {
    lists = lists.filter((_, i) => i !== index);
    updateFlag += 1;
  }

  $: lists = [...lists];
</script>

<main id="todo-app">
  <h1 style="display: flex;">To Do List</h1>

    {#each lists as list, listIndex (list.name)}
    <div class="Section-Box" style="display: flex;">
      <div class="todo-list">
        <div class="list-header">
          <h2>{list.name}</h2>
          <div class="list-options">
            <button class="options-button" on:click={() => showOptionsPopup(listIndex)}>...</button>
            {#if showOptions && optionsIndex === listIndex}
            <div class="popup">
              <div class="popup-content">
                <button id="edit-option" on:click={() => editSection(listIndex)}>Edit</button>
                <button id="delete-option" on:click={() => deleteSection(listIndex)}>Delete</button>
              </div>
            </div>
            {/if}
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
              <button id="remove-button" on:click={() => removeTask(listIndex, taskIndex)}>Remove</button>
            </li>
          {/each}
        </ul>
      </div>
    </div> 
    {/each}


  {#if showEditDeletePopup}
    <div class="popup">
      <div class="popup-content">
        <input id="section-name-input" bind:value={newSectionName} placeholder="Enter section name" />
        <button class="section-name-button" on:click={confirmEdit}>Save Changes</button>
        <button class="section-name-button" on:click={closePopup}>Cancel</button>
      </div>
    </div>
  {/if}

  <button class="sticky-button" on:click={addSection}>
    +
  </button>

  {#if showPopup}
    <div class="popup">
      <div class="popup-content">
        <input id="section-name-input" bind:value={newSectionName} placeholder="Enter section name" />
        <button class="section-name-button" on:click={confirmSection}>Confirm</button>
        <button class="section-name-button" on:click={closePopup}>Cancel</button>
      </div>
    </div>
  {/if}
</main>

<style>

@media screen and (max-width: 768px) {
    #todo-app {
      margin: 10%;
    }

    main {
      margin: 10px;
    }

    .todo-list {
      margin-bottom: 20px;
    }

    .add-task {
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .task-input {
      margin-right: 0;
      margin-bottom: 10px;
    }

    .task-item {
      flex-direction: column;
      align-items: flex-start;
    }

    .sticky-button {
      bottom: 10px;
      right: 10px;
    }
  }
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 20px;
  }
  #todo-app {
    margin-top: 10%;
    margin-bottom: 10%;
    margin-left: 30%;
    margin-right: 30%;
  }
  h1 {
    color: #333;
  }
  .todo-list {
    margin-bottom: 40px;
  }
  .add-task {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .task-input {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
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


  .sticky-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #007bff;
    color: white;
    height: 50px;
  width: 50px;
  border-radius: 50%;
    padding: 1rem;
    cursor: pointer;
    font-size: 20px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }

  .list-header {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  

  .list-options button {
    margin-left: 10px;
    cursor: pointer;
  }

  


  

  #edit-option {
    display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  gap: 15px;
  background-color: #17a2b8;
  outline: 3px #17a2b8;
  outline-offset: -3px;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  color: white;
  font-weight: 700;
  font-size: 1em;

  }


#edit-option:hover {
  background-color: transparent;
  color: #17a2b8;
}
  

  #delete-option {
    display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  gap: 15px;
  background-color: #dc3545;
  outline: 3px #dc3545;
  outline-offset: -3px;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  color: white;
  font-weight: 700;
  font-size: 1em;

  }

#delete-option:hover {
  background-color: transparent;
  color: #dc3545
}
  
  button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  gap: 15px;
  background-color: #007ACC;
  outline: 3px #007ACC solid;
  outline-offset: -3px;
  border-radius: 5px;
  border: none;
  cursor: pointer;

}

button {
  color: white;
  font-weight: 700;
  font-size: 1em;

}

input {
  border: 2px solid transparent;
  width: 15em;
  height: 2.5em;
  padding-left: 0.8em;
  outline: none;
  overflow: hidden;
  background-color: #F3F3F3;
  border-radius: 10px;
  transition: all 0.5s;
}

input:hover,
input:focus {
  border: 2px solid #4A9DEC;
  box-shadow: 0px 0px 0px 7px rgb(74, 157, 236, 20%);
  background-color: white;
}

#section-name-input {
  margin-right: 20px;
}

.section-name-button {
  margin-right: 20px;
}
.Section-Box {
    width: 120%;
    height: 120%;
    background-color: rgba(255, 255, 255, 1);
    color: #000;
    border-radius: 10px;
    box-shadow: 6px 9px 30px 6px rgba(142,178,229,1);
    margin-bottom: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
