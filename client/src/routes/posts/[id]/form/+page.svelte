<script lang="ts">
  import PostForm from "$lib/partials/PostForm.svelte";
  import type {Post} from '$types/post';

  interface DataProps {
    post: Post
  }
  export let data: DataProps
</script>

<PostForm data={data.post} />
