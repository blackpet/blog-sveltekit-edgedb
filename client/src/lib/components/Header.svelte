<script lang="ts">
  import {userStore} from '../stores/user-store';
  import {goto} from '$app/navigation';

  async function signout() {
    userStore.signout()
    await goto('/')
  }
</script>

<div class="header">
  <div class="logo font-bold text-lg">blog</div>
  <ul>
    <li><a href="/">home</a></li>
    <li><a href="/users">user</a></li>
    <li><a href="/posts">post</a></li>
  </ul>
  <div>
    {#if $userStore?.id}
      Hello {$userStore.name}
      <span class="text-slate-300 px-2"> | </span>
      <button on:click={signout}>sign out</button>
    {:else}
      <a href="/login">sign in</a>
    {/if}
  </div>
</div>

<style>
  .header {@apply bg-slate-200 flex mb-4 p-4;}
  ul {@apply flex-1 flex justify-evenly;}
  li {@apply uppercase;}
  a {@apply hover:text-red-500 hover:underline;}
</style>
