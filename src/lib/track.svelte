<script lang=ts>
import { onMount } from "svelte";

  import { srcStore, titleStore, volumeStore } from "../stores/stores";
  $: $volumeStore, volumeSet()
  export let index: number;
  export let src: string;
  export let playing: boolean = false;

  let player
  let track

  let name: string = $titleStore[index]; 
  let songLength: number = 100;
  let time: number
  let loopBtn
  if (player) {
    time = player.currentTime
  }

  let changingName: boolean = false

  let muted: boolean = false;
  let vol: number = 50;

  export function play () {
    player.play()
    playing = true
    track.classList.add("playing")
  }
  
  export function pause () {
    player.pause()
    playing = false 
    track.classList.remove("playing")
  }

  export function stop () {
    pause()
    player.currentTime = 0
  }

  function loop () {
    player.loop = !player.loop
    if (!player.loop) {
      loopBtn.classList.add("bg-dark")
    } else {
      loopBtn.classList.remove("bg-dark")
    }
  }

  function mute () {
    muted = !muted;
    if (muted) {
      vol = 0
    } else {
      vol = 100
    }
    volumeSet()
  }

  function volumeSet() {
    if(player != undefined) {
      player.volume = (vol/100) * ($volumeStore/100);
    }
  }

  function deleteTrack() {
    console.log($srcStore[index])
    $srcStore.splice(index, 1)
    $srcStore = $srcStore
    $titleStore.splice(index, 1)
    $titleStore = $titleStore
    name = $titleStore[index]
  }

  function confirmName() {
    $titleStore[index] = name
    $titleStore = $titleStore
    name = $titleStore[index]
    changingName = false
  }
  
  onMount (() => {
    pause()
  })
</script>

<div class="d-flex p-2 gap-2 m-1 playing" id="track" bind:this={track}>
  <button id="playbtn" on:click={() => {
      if (playing) {pause()} else {play()}
    }} class="btn btn-primary btn-sm d-flex justify-content-center align-items-center">
    {#if playing}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
      </svg>
    {/if}
  </button>

  <button on:click={stop} id="stop" class="btn btn-primary btn-sm d-flex justify-content-center align-items-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16">
      <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
    </svg>
  </button>

  <div class="d-flex align-items-center" id="middle">
    <audio src={src} bind:this={player}></audio>
    {#if !changingName}
      <h3 class="title">{name}</h3>
      <button on:click={() => {changingName = true}} class="btn btn-outline-warning btn-sm d-flex justify-content-center align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
        </svg>
      </button>
    {:else}
      <input type="text" name="nameInput" id="nameInput" bind:value={name} maxlength=11>
      <button on:click={confirmName} id="accept" class="btn btn-success btn-sm d-flex justify-content-center align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
        </svg>
      </button>
      <button on:click={() => { name = $titleStore[index]; changingName = false; }} id="cancel" class="btn btn-danger btn-sm d-flex justify-content-center align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    {/if}
  </div>

  {#if !changingName}
  <div class="bg-secondary d-flex justify-content-center align-items-center" id="volume">
    <button on:click={mute} id="volume-btn" class="btn btn-secondary d-flex justify-content-center align-items-center">
      {#if muted}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-mute-fill" viewBox="0 0 16 16">
          <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16">
          <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
          <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
          <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
        </svg>
      {/if}
    </button>
    <input type="range" name="volumeknob" id="volumeknob" bind:value={vol} on:change={volumeSet}>
  </div>
  {/if}

  <button id="repeat" on:click={loop} class="btn btn-success btn-sm d-flex justify-content-center align-items-center bg-dark" bind:this={loopBtn}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
      <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
      <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
    </svg>
  </button>

  <button id="delete" on:click={deleteTrack} class="btn btn-danger btn-sm d-flex justify-content-center align-items-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
    </svg> 
  </button>
</div>

<style>
  #track {
    width: fit-content;
    max-width: 35rem;
    border-radius: 9px;
    background-color: beige;
    transition: background-color 500ms ease;
  }
  #track.playing {
    background-color: turquoise;
  }
  #middle {
    flex: 5;
  }
  #volume {
    border-radius: 4px;
  }
  #volumeknob {
    width: 6rem;
    margin-right: .5rem;
  }
  #nameInput {
    max-width: 16ch;
    font-size: .85rem;
  }

  .title {
    width: 15ch;
    font-size: .85rem;
  }
</style>