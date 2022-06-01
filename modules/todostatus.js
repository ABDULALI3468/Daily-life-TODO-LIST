const updateStatus = (index, bool, arr) => {
  arr[index].completed = bool;
  localStorage.setItem('todos', JSON.stringify(arr));
};

export default updateStatus;
