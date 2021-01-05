export const state = () => ({
  faves: {
    14141: ['145', '131'],
    14249: ['145', '176'],
    43719: ['177'],
    66359: ['53', '53M']
  },
  list: ['14141', '14249', '43719', '66359']
})

export const mutations = {
  add(state, text, stops) {
    state.list.push(text)
    state.faves[]
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
