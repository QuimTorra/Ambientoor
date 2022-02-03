import { writable } from "svelte/store";
import { browser } from "$app/env";

export const srcStore = writable(
  browser && (JSON.parse(localStorage.getItem("srcStore")) || [])
)
srcStore.subscribe((val) => { browser && localStorage.setItem("srcStore", JSON.stringify(val)) })

export const titleStore = writable(
  browser && (JSON.parse(localStorage.getItem("titleStore")) || [])
)
titleStore.subscribe((val) => { browser && localStorage.setItem("titleStore", JSON.stringify(val)) })

export const volumeStore = writable(
  browser && (parseInt(localStorage.getItem("masterVolume")) || 100)
)
volumeStore.subscribe((val) => { browser && localStorage.setItem("masterVolume", val.toString()) })