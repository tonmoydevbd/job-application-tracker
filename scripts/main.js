// filtered card data 
let interviewCardData = [];
let rejectedCardData = [];

// all variable 
const totalJobsCountEl = document.querySelectorAll('.total-jobs');
const interviewCountEl = document.querySelector('#interview-count');
const rejectedCountEl = document.querySelector('#rejected-count');
const sectionEl = document.querySelector('section');
const noJobsSection = document.querySelector('.no-jobs-section');
const toggleBtnContainer = document.querySelector('.toggle-btn-container');
const filterJobsCount = document.querySelector('.filter-jobs-count');
const filterJobsText = document.querySelector('.filter-jobs-text');
// card showing btn 
const allCardBtn = toggleBtnContainer.children[0];
const interviewBtn = toggleBtnContainer.children[1];
const rejectedBtn = toggleBtnContainer.children[2];

allCardBtn.addEventListener('click', () => {
  allCardBtn.classList.add('active-btn');
  interviewBtn.classList.remove('active-btn');
  rejectedBtn.classList.remove('active-btn');
  refreshView()
});
interviewBtn.addEventListener('click', () => {
  interviewBtn.classList.add('active-btn');
  allCardBtn.classList.remove('active-btn');
  rejectedBtn.classList.remove('active-btn');
  filterJobsCount.classList.remove('hide');
  filterJobsText.classList.remove('hide');
  filterJobsCount.innerText = interviewCardData.length;
  refreshView()
});
rejectedBtn.addEventListener('click', () => {
  rejectedBtn.classList.add('active-btn');
  allCardBtn.classList.remove('active-btn');
  interviewBtn.classList.remove('active-btn');
  filterJobsCount.classList.remove('hide');
  filterJobsText.classList.remove('hide');
  filterJobsCount.innerText = rejectedCardData.length;
  refreshView()
});


document.getElementById('card-section').addEventListener('click', (e) => {
  const clickedBtn = e.target;
  const targetCardId = Number(clickedBtn.parentElement.parentElement.parentElement.getAttribute('id'));

  if (e.target.classList.contains('fa-trash-can')) {
    const clickedTrashCanCardId = Number(e.target.parentElement.parentElement.getAttribute('id'));
    if (allCardBtn.classList.contains('active-btn')) {
      jobsData = jobsData.filter(item => item.id !== clickedTrashCanCardId)
      if (!!interviewCardData.length) {
        interviewCardData = interviewCardData.filter(item => item.id !== clickedTrashCanCardId)
      }
      if (!!rejectedCardData.length) {
        rejectedCardData = rejectedCardData.filter(item => item.id !== clickedTrashCanCardId)
      }
      refreshView()
    } else if (interviewBtn.classList.contains('active-btn')) {
      interviewCardData = interviewCardData.filter(item => item.id !== clickedTrashCanCardId);
      jobsData = jobsData.filter(item => item.id !== clickedTrashCanCardId);
      filterJobsCount.innerText = interviewCardData.length;
      refreshView()
    } else if (rejectedBtn.classList.contains('active-btn')) {
      rejectedCardData = rejectedCardData.filter(item => item.id !== clickedTrashCanCardId);
      jobsData = jobsData.filter(item => item.id !== clickedTrashCanCardId);
      filterJobsCount.innerText = rejectedCardData.length;
      refreshView()
    }

  }

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
    filterJobsCount.innerText = interviewCardData.length;
    refreshView();

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
    filterJobsCount.innerText = rejectedCardData.length;
    refreshView()
  }
})

renderCard(jobsData);





// all functions
function renderCard(data) {
  updateCount();
  sectionEl.innerHTML = '';
  if (data.length) {
    noJobsSection.classList.add('hide');
    data.forEach(card => {
      sectionEl.innerHTML += `
      <article id="${card.id}" class="card">
        <div>
          <h3>${card.companyName}</h3>
          <p>${card.position}</p>
          <div class="job-meta-data">
            <p>${card.location}</p>
            <p class="only-dot">.</p>
            <p>${card.type}</p>
            <p class="only-dot">.</p>
            <p>$${card.salary.lowerRange} - $${card.salary.upperRange}</p>
          </div>
          <p class="${card.status === 'Not Applied' ? '' : card.status === 'interview' ? 'green-body' : 'red-body'} job-status">${card.status}</p>
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
    });
  } else {
    noJobsSection.classList.remove('hide');
  }
}

function updateCount() {
  totalJobsCountEl.forEach(item => item.innerText = jobsData.length);
  interviewCountEl.innerText = interviewCardData.length;
  rejectedCountEl.innerText = rejectedCardData.length;
}

function refreshView() {
  if (allCardBtn.classList.contains('active-btn')) {
    renderCard(jobsData);
    filterJobsCount.classList.add('hide');
    filterJobsText.classList.add('hide');
  } else if (interviewBtn.classList.contains('active-btn')) {
    renderCard(interviewCardData)
  } else if (rejectedBtn.classList.contains('active-btn')) {
    renderCard(rejectedCardData)
  }
  updateCount();
}
