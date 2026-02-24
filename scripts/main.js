// filtered card data 
let interviewCardData = [];
let rejectedCardData = [];

// all variable 
const totalJobsCountEl = document.querySelectorAll('.total-jobs');
const interviewCountEl = document.querySelector('#interview-count');
const rejectedCountEl = document.querySelector('#rejected-count');
let sectionEl = document.querySelector('section');
let noJobsSection = document.querySelector('.no-jobs-section');
const toggleBtnContainer = document.querySelector('.toggle-btn-container')
// card showing btn 
const allCardBtn = toggleBtnContainer.children[0];
const interviewBtn = toggleBtnContainer.children[1];
const rejectedBtn = toggleBtnContainer.children[2];

totalJobsCountEl.forEach(item => item.innerText = jobsData.length);
interviewCountEl.innerText = interviewCardData.length;
rejectedCountEl.innerText = rejectedCardData.length;

function renderCard(data) {
  sectionEl.innerHTML = '';
  if (data.length) {
    data.forEach(card => {
      sectionEl.innerHTML += `
      <article id="${card.id}" class="card">
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
      noJobsSection.classList.add('hide');
    });
  } else {
    noJobsSection.classList.remove('hide');
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
  renderCard(rejectedCardData)
});


document.getElementById('card-section').addEventListener('click', (e) => {
  const clickedBtn = e.target;
  const targetCardId = Number(clickedBtn.parentElement.parentElement.parentElement.getAttribute('id'));

  if (clickedBtn.innerText === 'REJECTED') {
    jobsData.forEach(item => {
      if (targetCardId === item.id) {
        item.status = 'rejected';
        rejectedCardData.push(item)
        if (interviewCardData.length) {
          interviewCardData = interviewCardData.filter(item => item.id !== targetCardId);
        }
      }
    })
    rejectedCardData = rejectedCardData.filter((item, index, self) => {
      return self.indexOf(item) === index;
    })
    refreshView()

  } else if (clickedBtn.innerText === 'INTERVIEW') {
    jobsData.forEach(item => {
      if (targetCardId === item.id) {
        item.status = 'interview';
        interviewCardData.push(item);
        if (rejectedCardData.length) {
          rejectedCardData = rejectedCardData.filter(item => item.id !== targetCardId);
        }
      }
    })
    interviewCardData = interviewCardData.filter((item, index, self) => {
      return self.indexOf(item) === index;
    })
    refreshView()

  }
})
function refreshView() {
  if (allCardBtn.classList.contains('active-btn')) {
    renderCard(jobsData)
  } else if (interviewBtn.classList.contains('active-btn')) {
    renderCard(interviewCardData)
  } else if (rejectedBtn.classList.contains('active-btn')) {
    renderCard(rejectedCardData)
  }
}