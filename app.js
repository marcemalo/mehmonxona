const bookings = [];
const totalRooms = 15;

document.addEventListener("DOMContentLoaded", () => {
    populateRoomOptions();
    document.getElementById('registrationForm').addEventListener('submit', registerBooking);
    document.getElementById('updateBtn').addEventListener('click', updateBooking);
    document.getElementById('deleteBtn').addEventListener('click', deleteBooking);
});

function populateRoomOptions() {
    const roomSelect = document.getElementById('room');
    for (let i = 1; i <= totalRooms; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Room ${i}`;
        roomSelect.appendChild(option);
    }
}

function registerBooking(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const roomNumber = parseInt(document.getElementById('room').value);
    
    if (bookings.some(booking => booking.room === roomNumber)) {
        alert('Room is already booked. Please choose another room.');
        return;
    }
    
    const booking = { name, room: roomNumber };
    bookings.push(booking);
    updateBookingList();
    updateRoomOptions();
    document.getElementById('registrationForm').reset();
}

function updateBookingList() {
    const bookingList = document.getElementById('bookingList');
    bookingList.innerHTML = '';
    
    bookings.forEach((booking, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${booking.name} - Room ${booking.room}`;
        listItem.dataset.index = index; // Store index for update/delete
        bookingList.appendChild(listItem);
    });
}

function updateRoomOptions() {
    const roomSelect = document.getElementById('room');
    const bookedRooms = bookings.map(booking => booking.room);
    
    for (let i = 1; i <= totalRooms; i++) {
        const option = roomSelect.querySelector(`option[value="${i}"]`);
        if (bookedRooms.includes(i)) {
            option.disabled = true;
        } else {
            option.disabled = false;
        }
    }
}

function updateBooking() {
    const name = document.getElementById('updateName').value;
    const roomNumber = parseInt(document.getElementById('updateRoom').value);
    
    const bookingIndex = bookings.findIndex(booking => booking.name === name);
    
    if (bookingIndex === -1) {
        alert('Booking not found.');
        return;
    }

    if (bookings.some((booking, index) => booking.room === roomNumber && index !== bookingIndex)) {
        alert('Room is already booked. Please choose another room.');
        return;
    }

    bookings[bookingIndex].name = name;
    bookings[bookingIndex].room = roomNumber;
    updateBookingList();
    updateRoomOptions();
}

function deleteBooking() {
    const name = document.getElementById('updateName').value;
    
    const bookingIndex = bookings.findIndex(booking => booking.name === name);
    
    if (bookingIndex !== -1) {
        bookings.splice(bookingIndex, 1);
        updateBookingList();
        updateRoomOptions();
    } else {
        alert('Booking not found.');
    }
}






const slider = document.querySelector(".items");
		const slides = document.querySelectorAll(".item");
		const button = document.querySelectorAll(".button");

		let current = 0;
		let prev = 4;
		let next = 1;

		for (let i = 0; i < button.length; i++) {
			button[i].addEventListener("click", () => i == 0 ? gotoPrev() : gotoNext());
		}

		const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);

		const gotoNext = () => current < 4 ? gotoNum(current + 1) : gotoNum(0);

		const gotoNum = number => {
			current = number;
			prev = current - 1;
			next = current + 1;

			for (let i = 0; i < slides.length; i++) {
				slides[i].classList.remove("active");
				slides[i].classList.remove("prev");
				slides[i].classList.remove("next");
			}

			if (next == 5) {
				next = 0;
			}

			if (prev == -1) {
				prev = 4;
			}

			slides[current].classList.add("active");
			slides[prev].classList.add("prev");
			slides[next].classList.add("next");
		}