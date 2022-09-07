import {writable} from 'svelte/store';
import type {User} from '$types/user';
import {browser} from '$app/environment'

const STORAGE_KEY = 'credentials'

function createUserStore() {
  const storageUser = browser && (JSON.parse(localStorage.getItem(STORAGE_KEY) as string))
  const {subscribe, set} = writable<User | null>(storageUser)

  function signin(user: User) {
    const {email, name, id} = user

    // #1. set to localStorage
    browser && (localStorage[STORAGE_KEY] = JSON.stringify({email, name, id}))
    // #2. set to store
    set({email, name, id})
  }

  function signout() {
    // #1. reset localStorage
    browser && localStorage.removeItem(STORAGE_KEY)
    // #2. reset store
    set(null)
  }

  return {
    subscribe,
    signin,
    signout,
  }
}

export const userStore = createUserStore()
