export function changeCategory(category) {
  return {
    type: 'CHANGE_CATEGORY',
    category,
  };
}
// export function editTodo(id, text) {
//   return {
//     type: 'EDIT_TODO',
//     id,
//     text,
//     date: Date.now()
//   };
// }
// export function deleteTodo(id) {
//   return {
//     type: 'DELETE_TODO',
//     id
//   };
// }
