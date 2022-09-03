<script lang="ts">
  import PostForm from "$lib/partials/PostForm.svelte";
  import {Post} from '$types/post';

  interface DataProps {
    post: Post
  }
  export let data: DataProps
</script>

<PostForm data={data.post} />
