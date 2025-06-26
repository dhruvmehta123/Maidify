

async function fetchData() {

    const response = await fetch('http://localhost:3000/maids');
    const data = await response.json();
    return data;

}

function makeSlot(slot){

    const slotButton=document.createElement('button');
    slotButton.textContent=slot;
    return slotButton;

}

async function book(slot){

    //remove the slot from available slots

    await axios.post('http://localhost:3000/book')



    //add slot to past bookings

    

}


async function getSlots(id){

    const response=await fetch(`http://localhost:3000/slots/${id}`);
    const data=await response.json();

    const maidDiv=document.getElementById(`maid-${id}`);

    for(slot of data){
        const slotButton=makeSlot(slot);
        slotButton.onclick =()=> book(slot);
        maidDiv.appendChild(slotButton);
    }
    
    






}
function randomImage(){

    const response = (`https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 50) + 1}.jpg`);
    return response;
}

function makeComponent(data,id) {

    const divEl = document.createElement('div');
    divEl.className = 'maid-obj';
    divEl.style.display = 'inline-block';
    divEl.id=`maid-${id}`;

    const name = data.name;
    const age = data.age;
    const city = data.city;

    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    const span3 = document.createElement('span');

    span1.innerHTML = `${name}<br>`;
    span2.innerHTML = `${age}<br>`;
    span3.innerHTML = `${city}<br>`;

    divEl.appendChild(span1);
    divEl.appendChild(span2);
    divEl.appendChild(span3);

    const img = document.createElement('img');
    

    if (data.image) {

        img.src = data.image;
        divEl.appendChild(img);


    }

    else{

        img.src=randomImage();
        divEl.appendChild(img);

    }



    const btn=document.createElement('button');
    btn.textContent='Book slot!';
    btn.onclick = () => {
        getSlots(id);
        btn.disabled=true;
    }

    divEl.appendChild(btn);



    return divEl;

}

async function getMaids() {

    const data = await fetchData();

    const maids = document.getElementById('maids');

    let ctr=1;

    for (let maid of Object.values(data)) {

        const comp = makeComponent(maid,ctr);
        maids.appendChild(comp);
        ctr++;

    }








}

function logout(){

    localStorage.removeItem('token');
    alert('Logged Out!');
    
    


}

window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem("token");

    const signupBtn = document.getElementById("signup-btn");
    const signinBtn = document.getElementById("signin-btn");
    const logoutBtn = document.getElementById("logout-btn"); 

    if (token) {
        signupBtn.style.display = "none";
        signinBtn.style.display = "none";
        logoutBtn.style.display = "block";
    } else {
        signupBtn.style.display = "block";
        signinBtn.style.display = "block";
        if (logoutBtn) logoutBtn.style.display = "none";
    }
});


