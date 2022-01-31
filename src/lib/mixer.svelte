<script lang=ts>
  import { srcStore } from "../stores/srcStore";
import Track from "./track.svelte";

  function handleDelete (index) {
    $srcStore.splice(index, 1)
    $srcStore = $srcStore
  }
</script>

<!-- {#if $srcStore.length === 0}
  <h1>Start adding songs!</h1>
{/if}
{#each $srcStore as inp, i}
  <div class="d-flex p-2">
    <h3>{i+1}. {inp}</h3>
    <button on:click={() => handleDelete(i)} class="btn btn-warning">DEL</button>
  </div>
{/each} -->
<Track src="YES"/>