
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.

    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}



document.getElementById('get-users').addEventListener('click', (e) => {
  fetch('/users')
    .then(res => res.json())
    .then(users => console.log(users))
    .catch(console.log)
});



document.getElementById('set-user').addEventListener('click', (e) => {
  const data = { firstName: 'ahmed', lastName: 'salah', age: 22 }

  postData('/users', data)
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    })
    .catch(console.log)

})