document.querySelectorAll('.total-jobs').forEach(item => item.innerText = jobsData.length);
let sectionEl = document.querySelector('section');

jobsData.forEach((card, i) => {
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
});

