<script lang="ts">
  import {formatYmdhm} from "$lib/utils/dayjs-util.js";
  import type {User} from '$types/user';

  interface DataProps {
    users: User[]
  }
  export let data: DataProps
</script>

<header>
  <h1>Users</h1>
  <div>
    <a href="/users/form" class="btn">Create New User</a>
  </div>
</header>

<main>
  {#if data}
  <table class="table-auto w-full">
    <thead>
    <tr>
      <th>id</th>
      <th>name</th>
      <th>email</th>
      <th>created at</th>
      <th>last modified at</th>
    </tr>
    </thead>

    <tbody>
    {#each data.users as auth (auth.id)}
    <tr>
      <td><a href="/users/{auth.id}">{auth.id}</a></td>
      <td>{auth.name}</td>
      <td>{auth.email}</td>
      <td>{formatYmdhm(auth.created_at)}</td>
      <td>{formatYmdhm(auth.last_modified_at)}</td>
    </tr>
    {/each}
    </tbody>
  </table>
  {/if}
</main>

<style>
</style>
