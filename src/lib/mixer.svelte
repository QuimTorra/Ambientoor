<script lang=ts>
  import { srcStore, volumeStore } from "../stores/stores";
  import Track from "./track.svelte";
  
  let tracks = []

  function playAll () {
    tracks.forEach(t => {
      t.play() 
    });
  }

  function pauseAll () {
    tracks.forEach(t => {
      t.pause() 
    });
  }
</script>

{#if $srcStore.length === 0}
  <h1>Start adding songs!</h1>
{:else}
  <div class="d-flex align-items-center p-2 bg-light gap-2 m-1" id="mixer">
    <h3>Master</h3>
    <button on:click={playAll} class="btn btn-dark d-flex justify-content-center align-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
      </svg>
    </button>
    <button on:click={pauseAll} class="btn btn-dark d-flex justify-content-center align-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"/>
      </svg>
    </button>
    <input type="range" name="volumeknob" id="volumeknob" bind:value={$volumeStore} >
  </div>
{/if}
{#each $srcStore as inp, i}
  <Track src={inp} index={i} bind:this={tracks[i]} />
{/each}

<style>
  #mixer {
    width: 70%;
    max-width: 35rem;
    border-radius: 9px;
  }
</style>