import type {User} from '$types/user';

//------------- server API -------------
async function allUsers() {
  const res = await fetch('http://localhost:5201/users')
  const users: User[] = await res.json()

  return users
}

async function findUser(id: string) {
  const res = await fetch(`http://localhost:5201/users/${id}`)
  const user: User = await res.json()

  return user
}

async function saveUser(request: User) {
  const res = await fetch('http://localhost:5201/users', {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const user = await res.json()
  return user
}

async function deleteUser(id: string) {
  const res = await fetch(`http://localhost:5201/users/${id}`, {
    method: 'DELETE',
  })
  const result = await res.json()
  return result
}
//------------- // server API -------------




//------------- client API (sveltekit server) -------------
async function saveUser_v1(form: User) {
  const res = await fetch('/api/v1/users', {
    method: 'POST',
    body: JSON.stringify(form)
  })
  const user = await res.json()
  return user
}
async function deleteUser_v1(id: string) {
  const res = await fetch(`/api/v1/users/${id}`, {
    method: 'DELETE',
  })
  const user = await res.json()
  return user
}
//------------- // client API (sveltekit server) -------------

export {
  // server fns..
  allUsers,
  findUser,
  saveUser,
  deleteUser,

  // client fns...
  saveUser_v1,
  deleteUser_v1,
}
