// import axios from 'axios';
// const axios = require('axios');
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.

    headers: {
      // 'Content-Type': 'application/json',
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

});

const formEle = document.querySelector('form');
console.log(formEle);
const inputFile = formEle.querySelector('input[name=image]');
console.log(inputFile);
inputFile.addEventListener('change', function (e) {
  console.log(e.target.files);
  if (e.target.files && e.target.files[0]) {

    const reader = new FileReader();
    reader.onload = (e) => {
      //   setFile(uploadImageInput.current.files[0])
      //   previewImage.current.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(e.target.files[0]);
  }
});
formEle.addEventListener('submit', async function (e) {
  e.preventDefault();
  console.log(e.target);
  const form = new FormData(this);
  console.log(form.get('image'))
  // try {
  //   const { data } = await axios.post('http://localhost:2020/upload-form', form);
  //   console.log(data);
  // } catch (error) {
  //   console.log(error);
  // }
  fetch('/upload-form', {
    method: 'post',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',

    // },
    body: form
  }).then(res => res.json())
    .then(console.log)
    .catch(console.log);
})