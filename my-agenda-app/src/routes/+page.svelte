
<script>
    let agenda = [];
    let newAgenda = '';
    function addAgenda() {
      if (newAgenda) {
        agenda = [...agenda, newAgenda];
        newAgenda = '';
      }
    }
    function removeAgenda(index) {
      agenda.splice(index, 1);
      agenda = [...agenda]; // Update the agenda array to trigger reactivity
    }
  </script>
  <main>
    <h1>SvelteKit Agendas App</h1>
    <div class="add-agenda">
      <input class="agenda-input" bind:value={newAgenda} placeholder="Add a new agenda" />
      <button class="add-button" on:click={addAgenda}>Add</button>
    </div>
    <ul class="agenda-list">
      {#each agenda as agenda, index (agenda)}
        <li class="agenda-item">
          {agenda}
          <button class="remove-button" on:click={() => removeAgenda(index)}>Remove</button>
        </li>
      {/each}
    </ul>
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
    .add-agenda {
      margin-bottom: 20px;
    }
    .agenda-input {
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
    .agenda-list {
      list-style-type: none;
      padding: 0;
    }
    .agenda-item {
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
