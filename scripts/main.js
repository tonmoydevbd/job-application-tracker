document.querySelectorAll('.total-jobs').forEach(item => item.innerText = jobsData.length);
// filtered card data 
const interviewCardData = [];
const rejectedCardData = [];

// all variable 
let sectionEl = document.querySelector('section');
let noJobsSection = document.querySelector('.no-jobs-section');
const toggleBtnContainer = document.querySelector('.toggle-btn-container')
// card showing btn 
const allCardBtn = toggleBtnContainer.children[0];
const interviewBtn = toggleBtnContainer.children[1];
const rejectedBtn = toggleBtnContainer.children[2];

function renderCard(data) {
  sectionEl.innerHTML = '';
  if (data.length) {
    data.forEach(function (card, i) {
      sectionEl.innerHTML += `
      <article class="card">
        <div>
          <h3>${card.companyName}</h3>
          <p>${card.position}</p>
          <div class="job-meta-data">
            <p>${card.location}</p>
            <p>.</p>
            <p>${card.type}</p>
            <p>.</p>
            <p>$${card.salary.lowerRange} - $${card.salary.upperRange}</p>
          </div>
          <p class="job-status">${card.status}</p>
          <p>${card.description}</p>
          <div class="card-btn-container">
            <button id="interview-btn">Interview</button>
            <button id="rejected-btn">Rejected</button>
          </div>
        </div>
        <div class="delete-btn">
          <i class="fa-regular fa-trash-can"></i>
        </div>
      </article>
    `
      noJobsSection.classList.remove('show');
    });
  } else {
    noJobsSection.classList.add('show');
  }
}


allCardBtn.addEventListener('click', () => {
  allCardBtn.classList.add('active-btn');
  interviewBtn.classList.remove('active-btn');
  rejectedBtn.classList.remove('active-btn');
  renderCard(jobsData);
});
interviewBtn.addEventListener('click', () => {
  interviewBtn.classList.add('active-btn');
  allCardBtn.classList.remove('active-btn');
  rejectedBtn.classList.remove('active-btn');
  renderCard(interviewCardData);
});
rejectedBtn.addEventListener('click', () => {
  rejectedBtn.classList.add('active-btn');
  allCardBtn.classList.remove('active-btn');
  interviewBtn.classList.remove('active-btn');
  renderCard(rejectedCardData);
});
