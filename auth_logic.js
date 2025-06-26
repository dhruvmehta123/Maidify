async function signup(){

    const name=document.getElementById('name').value;
    const username=document.getElementById('username').value;
    const age=document.getElementById('age').value;
    const password=document.getElementById('password').value;


    await axios.post("http://localhost:3000/signup",{

        name:name,
        username:username,
        age:age,
        password:password
            
    })

    alert('signed up succesfully');
    window.location.href="signin.html";



}


async function signin(){

    const username=document.getElementById('username').value;
    const password=document.getElementById('password').value;

    const response = await axios.post('http://localhost:3000/signin',{

        username : username,
        password : password

    })
    .catch(e=>{
        alert('invalid username or password');
    })

    localStorage.setItem('token',response.data.token);
    alert('signed in succesfully');

    
    window.location.href="index.html";

    
}

