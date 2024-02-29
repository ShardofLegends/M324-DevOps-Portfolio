<script>
  let lists = [
    { name: 'Personal', tasks: [] },
    { name: 'Work', tasks: [] }
    // Add more sections as needed
  ];

  let newTasks = new Array(lists.length).fill('');

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
</script>

<main>
  <h1>SvelteKit Todo App</h1>
  {#each lists as list, listIndex (list.name)}
    <div class="todo-list">
      <h2>{list.name}</h2>
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
</style>
