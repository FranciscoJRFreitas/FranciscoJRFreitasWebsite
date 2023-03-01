if (navigator.userAgent.indexOf("Chrome") == -1){
    alert("If you're not able to load the website projects directly, I reccomend using a Chromium-Based browser for the purpose, as:\n- Google Chrome\n- Microsoft Edge,\n- Brave,\n- Opera,\n- Vivaldi,\n- Chromium.");
}

function expanded() {
  const iframe = document.querySelector('iframe[src="projects/project1/src/index.html"]');
  const elementToTarget = iframe.contentDocument.querySelector('#expand-toggle');
  elementToTarget.style.display='none';
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      observer.unobserve(entry.target);
    }
  });
});

const toggleButton = document.querySelector(".toggle-button");
const toggleCircle = document.querySelector(".toggle-circle");

toggleButton.addEventListener("click", () => {
  toggleCircle.classList.toggle("slide");
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
});

// observe the projects section
observer.observe(document.querySelector('.glsl-projects'));


const projectWrappers = document.querySelectorAll('.project-wrapper');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
const projectTitle = document.getElementById("project-title");
const githubButton = document.querySelector('.button-github');
const expandButton = document.querySelector('.button-expand');

// Remove the "active" class from all project wrappers except the first one
projectWrappers.forEach((wrapper, index) => {
  if (index === 0) {
    wrapper.classList.add('active');
  } else {
    wrapper.classList.remove('active');
    wrapper.classList.add('right');
    wrapper.style.transform = 'translateX(100%)';
  }
});

let activeIndex = 0;

function slideProjects(direction) {
  activeIndex += direction;

  if (activeIndex < 0) {
    activeIndex -= direction;
    return;
  }
  else if (activeIndex >= projectWrappers.length) {
    activeIndex -= direction;
    return;
  }

  projectWrappers.forEach((wrapper, index) => {
    if (wrapper.classList.contains('project-wrapper')) {
      if (index === activeIndex) {
        wrapper.classList.add('active');
        wrapper.style.transform = 'translateX(0)';
      }
      else if (index < activeIndex) {
        wrapper.classList.add('left');
        wrapper.classList.remove('right', 'active');
        wrapper.style.transform = 'translateX(-100%)';
      } else {
        wrapper.classList.add('right');
        wrapper.classList.remove('left', 'active');
        wrapper.style.transform = 'translateX(100%)';
      }
    } 

    if (index === activeIndex) {
      if (wrapper.dataset.project === '1') {
        projectTitle.textContent = 'Particles affected by gravity';
        githubButton.href = 'https://github.com/FranciscoJRFreitas/CGI-P1/tree/master/CGI%20P1';
        expandButton.href = 'projects/project1/src/index.html';
      } else if (wrapper.dataset.project === '2') {
        projectTitle.textContent = 'Helicopter Simulation WebGL';
        githubButton.href = 'https://github.com/FranciscoJRFreitas/Helicopter-WebGL';
        expandButton.href = 'projects/project2/src/index.html';
      } else if (wrapper.dataset.project === '3') {
        projectTitle.textContent = 'Effect of different lights and materials on objects';
        githubButton.href = 'https://github.com/FranciscoJRFreitas/CGI-P3';
        expandButton.href = 'projects/project3/src/index.html';
      }
    }
  });
}

prevArrow.addEventListener('click', () => slideProjects(-1));
nextArrow.addEventListener('click', () => slideProjects(1));
