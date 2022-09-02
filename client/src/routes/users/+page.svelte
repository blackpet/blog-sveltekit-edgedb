<script lang="ts">
  import type {User} from '$types/user';
  import {formatYmdhm} from "../../lib/utils/dayjs-util.js";

  interface DataProps {
    users: User[]
  }
  export let data: DataProps
  console.log('+page users', data.users)
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
    {#each data.users as user (user.id)}
    <tr>
      <td><a href="/users/{user.id}">{user.id}</a></td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{formatYmdhm(user.created_at)}</td>
      <td>{formatYmdhm(user.last_modified_at)}</td>
    </tr>
    {/each}
    </tbody>
  </table>
  {/if}
</main>

<style>
</style>
