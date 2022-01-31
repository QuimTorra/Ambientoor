<script lang=ts>
  import { srcStore } from "../stores/srcStore";

  let url: string 

  function handleSubmit () {
    $srcStore.push(url)
    $srcStore = $srcStore
    console.log($srcStore)
  }
</script>

<div class="d-flex gap-2 p-2">
  <input bind:value={url} type="text" name="Audio URL" id="audio_input" class="form-control" >
  <button on:click={handleSubmit} class="btn btn-primary">ADD</button>
</div>
