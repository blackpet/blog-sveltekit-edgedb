<script lang="ts">
  import UserForm from "$lib/partials/UserForm.svelte";
  import type {User} from '$types/user';

  interface DataProps {
    user: User
  }
  export let data: DataProps
</script>

<UserForm data={data.user} />
