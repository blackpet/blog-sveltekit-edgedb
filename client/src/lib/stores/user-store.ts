import {writable} from 'svelte/store';
import type {User} from '$types/user';

function createUserStore() {
  const {subscribe, set} = writable<User | null>(null)

  function signin(user: User) {
    const {email, name, id} = user
    set({email, name, id})
  }

  function signout() {
    set(null)
  }

  return {
    subscribe,
    signin,
    signout,
  }
}

export const userStore = createUserStore()
