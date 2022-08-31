<script lang="ts">
  import type {User} from '$types/user';

  export let data

  const form: User = {
    login_id: '',
    email: '',
    name: '',
  }
</script>

<header>
  <h1>Create New User</h1>
  <div>
    <button class="btn">Save</button>
  </div>
</header>

<div class="field">
  <label>login id</label>
  <input type="text" name="login_id" bind:value={form.login_id}>
</div>
<div class="field">
  <label>name</label>
  <input type="text" name="name" bind:value={form.name}>
</div>
<div class="field">
  <label>email</label>
  <input type="text" name="email" bind:value={form.email}>
</div>
