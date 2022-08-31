<script lang="ts">
  import type {User} from '$types/user';

  interface DataProp {
    users: User[]
  }
  export let data: DataProp
  console.log('+page users', data.users)
</script>

<h1>Users</h1>

{#if data}
<table class="table-auto">
  <thead>
  <tr>
    <th>id</th>
    <th>login id</th>
    <th>name</th>
    <th>email</th>
    <th>registered at</th>
  </tr>
  </thead>

  <tbody>
  {#each data.users as user (user.id)}
  <tr>
    <td>{user.id}</td>
    <td>{user.login_id}</td>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>-</td>
  </tr>
  {/each}
  </tbody>
</table>
{/if}

<style>
</style>
