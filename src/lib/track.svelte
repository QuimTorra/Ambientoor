<script lang=ts>
  export let src: string;
  export let playing: boolean = false;
  let name: string = "trackName";
  let songLength: number = 100;
  let time: number = 0;

  function play () {
    playing = true;
  }
  
  function pause () {
    playing = false;
  }

</script>

<div class="d-flex p-3 bg-light gap-2" id="track">
  <button id="playbtn" on:click={() => {
      if (playing) {pause()} else {play()}
    }} class="btn btn-primary">
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
  <div class="d-flex flex-column" id="middle">
    <p>{time} <span>{name}</span></p>
    <input type="range" name="time_rail" id="time_rail" max={songLength} bind:value={time} />
  </div>
</div>

<style>
  #track {
    width: 90%;
  }
  #middle {
    flex: 5;
  }
  #time_rail {
    height: .75rem;
    background-color: dimgrey;
    border-radius: 9px;
    color: cyan;
  }
</style>