<script lang="ts">
  import {deleteUser_v1, saveUser_v1} from '$api/users';
  import {goto} from '$app/navigation'
  import {formatYmdhm} from "../utils/dayjs-util.js";
  import type {User} from '$types/user';

  export let data // for modify auth

  let form: User = {...data}

  async function submit() {
    const auth = await saveUser_v1(form)
    // TODO: toast message
    await goto('/users')
  }

  async function deleteUser() {
    await deleteUser_v1(form.id)
    // TODO: toast message
    await goto('/users')
  }
</script>

<header>
  <h1>
    {#if data}
    Edit User
    {:else}
    Create New User
    {/if}
  </h1>
  <div class="flex gap-2">
    {#if data}
      <button class="btn" on:click={deleteUser}>Delete User</button>
    {/if}
    <button class="btn" on:click={submit}>Save</button>
    <a href="/users" class="btn block">List</a>
  </div>
</header>

<div class="field">
  <label>name</label>
  <input type="text" name="name" bind:value={form.name}>
</div>
<div class="field">
  <label>email</label>
  <input type="text" name="email" bind:value={form.email}>
</div>
<div class="field">
  <label>password</label>
  <input type="text" name="password" bind:value={form.password}>
</div>

{#if data}
<div class="field">
  <label>created at</label>
  {formatYmdhm(form.created_at)}
</div>
<div class="field">
  <label>last modified at</label>
  {formatYmdhm(form.last_modified_at)}
</div>
{/if}
