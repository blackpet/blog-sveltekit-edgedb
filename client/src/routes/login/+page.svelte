<script lang="ts">
  import type {User} from '$types/user';
  import {userStore} from '../../lib/stores/user-store';
  import {goto} from '$app/navigation';

  type Login = Pick<User, 'email' | 'password'>

  const form: Login = {
    email: '',
    password: '',
  }

  async function signin() {
    userStore.signin({...form, name: '테스트', id: '05fbab58-28b6-11ed-b9ed-d3acf0fccf2a'})
    await goto('/posts')
  }
</script>

<header>
  <h1>Sign In</h1>
</header>

<main>
  <div class="field">
    <label>email</label>
    <input type="text" name="email" bind:value={form.email}>
  </div>
  <div class="field">
    <label>password</label>
    <input type="text" name="password" bind:value={form.password}>
  </div>
  <button class="btn" on:click={signin}>Login</button>
</main>
