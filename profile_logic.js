async function loadProfile() {
    try {
        const response = await axios.get('http://localhost:3000/me', {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        });

        const divEl = document.getElementById('profile');

        const spanEl = document.createElement('span');
        spanEl.textContent = "NAME: " + response.data.name;
        divEl.appendChild(spanEl);

       

        const spanEl3 = document.createElement('span');
        spanEl3.textContent = " | USERNAME: " + response.data.username;
        divEl.appendChild(spanEl3);

   
        const bookings = response.data.pastBookings;
        const bookingsContainer = document.createElement('div');
        bookingsContainer.classList.add('bookings-container');
        divEl.appendChild(bookingsContainer);

        if (bookings.length === 0) {
            const noBooking = document.createElement('p');
            noBooking.textContent = "No past bookings yet.";
            bookingsContainer.appendChild(noBooking);
        } else {
            for (const booking of bookings) {
                const bookingDiv = document.createElement('div');
                bookingDiv.classList.add('booking-card');
                bookingDiv.innerHTML = `
                    <h3>${booking.maid}</h3>
                    <p>Date: ${booking.date}</p>
                    <p>Time: ${booking.time}</p>
                    <p>Rating: ${booking.rating} ⭐</p>
                `;
                bookingsContainer.appendChild(bookingDiv);
            }
        }

    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("Please sign in!");
            window.location.href = "signin.html";

        } else {
            console.error(error);
            alert("Please Signin first!");
            window.location.href="signin.html";
        }
    }
}

loadProfile();
