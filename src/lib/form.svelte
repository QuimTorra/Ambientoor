<script lang=ts>
  import { srcStore, titleStore } from "../stores/stores";

  let url: string 
  let name: string

  function handleSubmit () {
    $srcStore.push(url)
    $srcStore = $srcStore
    console.log(name)
    if (name == undefined){
      name = `Track_${$srcStore.length}`
    }
    $titleStore.push(name)
    $titleStore = $titleStore
    url = ""
    name = undefined 
  }
</script>

<div class="d-flex gap-2 p-2">
  <input bind:value={url} type="text" name="Audio URL" id="audio_input" class="form-control" placeholder="Audio URL">
  <input bind:value={name} type="text" maxlength=20 name="Audio URL" id="audio_input" class="form-control" placeholder="Track Name">
  <button on:click={handleSubmit} class="btn btn-primary">ADD</button>
</div>
