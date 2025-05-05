const authLogin = document.getElementById('auth-login');
const authReg = document.getElementById('auth-reg');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('reg-form');

document.addEventListener('DOMContentLoaded', () =>  {
  registerForm.style.display = 'none';
  if(!localStorage.userList)  {
    localStorage.setItem('userList', JSON.stringify([]));
  }

  if(localStorage.isAuth && JSON.parse(localStorage.isAuth)) {
    window.location.href = '../index.html';
  }

  authLogin.addEventListener('click', () =>  {
    authLogin.classList.add('active');
    authReg.classList.remove('active');
    loginForm.style.display = 'flex';
    registerForm.style.display = 'none';
  });

  authReg.addEventListener('click', () => {
    authReg.classList.add('active');
    authLogin.classList.remove('active');
    registerForm.style.display = 'flex';
    loginForm.style.display = 'none';
  });

  registerForm.addEventListener('submit', (event) =>  {
    event.preventDefault();

    const login = document.getElementById('reg-login').value;
    console.log(login)
    const password = document.getElementById('reg-password').value;
    const userList = JSON.parse(localStorage.userList);

    if(userList.some(user => user.login === login)) {
      alert('This login is taken. Try again!');
      return;
    }

    userList.push({login, password});
    localStorage.setItem('userList', JSON.stringify(userList));

    authLogin.click();
    document.getElementById('login').value = login;
    document.getElementById('password').value = '';
  })

  loginForm.addEventListener('submit', (event) =>  {
    event.preventDefault();
  
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const userList = JSON.parse(localStorage.userList);
    const user = userList.find(user => user.login === login);

    if(!user)  {
      alert('User is not found!');
      return;
    }

    if(user.password !== password)  {
      alert('Wrong password');
      return;
    }

    localStorage.setItem('isAuth', JSON.stringify(true));
    window.location.href = '../index.html';
  })
})

