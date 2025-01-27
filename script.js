// script.js

let historyData = [];
let meteoroidInterval;

function calculateAge() {
  const birthdate = document.getElementById('birthdate').value;
  if (!birthdate) {
    alert('Please select a birthdate!');
    return;
  }

  const birthDateObj = new Date(birthdate);
  const now = new Date();

  // Calculate age in years
  let years = now.getFullYear() - birthDateObj.getFullYear();
  if (
    now.getMonth() < birthDateObj.getMonth() ||
    (now.getMonth() === birthDateObj.getMonth() && now.getDate() < birthDateObj.getDate())
  ) {
    years--; // Adjust if birthday hasn't passed yet
  }

  // Calculate days, weeks, minutes, and seconds
  const diffInTime = now - birthDateObj;
  const days = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const minutes = Math.floor(diffInTime / (1000 * 60));
  const seconds = Math.floor(diffInTime / 1000);

  // Calculate next birthday
  let nextBirthday = new Date(now.getFullYear(), birthDateObj.getMonth(), birthDateObj.getDate());
  if (nextBirthday < now) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }
  const daysRemaining = Math.floor((nextBirthday - now) / (1000 * 60 * 60 * 24));
  const nextBirthdayDayName = nextBirthday.toLocaleDateString('en-US', { weekday: 'long' });

  // Add to history
  historyData.push({
    birthdate,
    years,
    days,
    weeks,
    minutes,
    seconds,
    nextBirthday,
    daysRemaining
  });

  // Update UI with calculated data
  document.getElementById('years').innerText = `You are ${years} years old.`;
  document.getElementById('days').innerText = `That's ${days} days.`;
  document.getElementById('weeks').innerText = `Or ${weeks} weeks.`;
  document.getElementById('minutes').innerText = `That's approximately ${minutes} minutes.`;
  document.getElementById('seconds').innerText = `Or about ${seconds} seconds.`;
  document.getElementById('next-birthday').innerText = `Your next birthday is on ${nextBirthday.toDateString()} (${nextBirthdayDayName}).`;
  document.getElementById('days-remaining').innerText = `Only ${daysRemaining} days left until your next birthday!`;
  document.getElementById('cake-emoji').style.display = 'block';
}

function goBack() {
  document.getElementById('birthdate').value = '';
  document.getElementById('years').innerText = '';
  document.getElementById('days').innerText = '';
  document.getElementById('weeks').innerText = '';
  document.getElementById('minutes').innerText = '';
  document.getElementById('seconds').innerText = '';
  document.getElementById('next-birthday').innerText = '';
  document.getElementById('days-remaining').innerText = '';
  document.getElementById('cake-emoji').style.display = 'none';
}

function showHistory() {
  const historyContainer = document.getElementById('history');
  const historyContent = document.getElementById('history-content');
  historyContent.innerHTML = '';

  if (historyData.length === 0) {
    historyContent.innerHTML = '<p>No history available yet!</p>';
    return;
  }

  historyData.forEach((entry, index) => {
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    historyItem.innerHTML = `
      <h3>History ${index + 1}</h3>
      <p>Birthdate: ${entry.birthdate}</p>
      <p>Age: ${entry.years} years, ${entry.days} days</p>
      <p>Weeks: ${entry.weeks} weeks</p>
      <p>Next Birthday: ${entry.nextBirthday.toDateString()} (${entry.nextBirthday.toLocaleDateString('en-US', { weekday: 'long' })})</p>
      <p>Days Remaining: ${entry.daysRemaining} days</p>
      <button class="delete-button" onclick="deleteHistory(${index})">Delete</button>
      <hr>
    `;
    historyContent.appendChild(historyItem);
  });

  historyContainer.style.display = 'block';
}

function deleteHistory(index) {
  historyData.splice(index, 1);
  showHistory(); // Refresh history
}

// Meteoroid animation generation
function createMeteoroid() {
  const meteoroid = document.createElement('div');
  meteoroid.classList.add('meteoroid');
  document.body.appendChild(meteoroid);

  setTimeout(() => {
    meteoroid.remove();
  }, 3000);
}

function startMeteoroidAnimation() {
  meteoroidInterval = setInterval(createMeteoroid, 3000);
}

// Start meteoroid animation when page loads
window.onload = () => {
  startMeteoroidAnimation();
};