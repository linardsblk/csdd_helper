// Sets button that responds to Enter key, adds [Enter] label
let elementOnEnterKey;
const errorsOverviewLink = document.querySelectorAll("[href$='/parskats']")?.[0];
const newExamLink = document.querySelectorAll("[href='/new/']")?.[0];

if (errorsOverviewLink) {
  elementOnEnterKey = errorsOverviewLink;
  errorsOverviewLink.innerHTML = `${errorsOverviewLink.innerHTML} [Enter]`;
} else if (newExamLink) {
  elementOnEnterKey = newExamLink;
  newExamLink.firstElementChild.innerHTML = `${newExamLink.firstElementChild.innerHTML} [Enter]`;
}

// Automatically selects B category
const bCat = document.getElementById(52);
if (bCat) {
  bCat.click();
}

// Autoplays video
const video = document.getElementsByClassName('js-poster-play')[0]?.firstElementChild;
if (video) {
  video.setAttribute('autoplay', 'true');
}

// Skips test questions
const skipTestQuestion = (answerId) => {
  const testQuestionAnswer = document.getElementById(answerId);

  if (testQuestionAnswer) {
    testQuestionAnswer.click();
    document.getElementsByClassName('button')[0].click();
  }
};

skipTestQuestion('atbilde-2264');
skipTestQuestion('atbilde-2272');
skipTestQuestion('atbilde-37322');

// Gets to next question after answer
const radioButtons = Array.from(document.getElementsByName('atbilde'));
radioButtons.forEach((radio, index) => {
  radio.parentElement.firstChild.nodeValue = `[${index + 1}]`;
  radio.addEventListener('change', () => {
    document.getElementById('atbbtn').click();
  });
});

document.addEventListener(
  'keydown',
  (event) => {
    const key = event.key;

    // Numbers to answer questions
    if (['1', '2', '3', '4', '5', '6'].includes(key)) {
      document.getElementsByName('atbilde')[parseInt(key) - 1].click();
    }

    // Enter action
    if (key === 'Enter' && elementOnEnterKey) {
      elementOnEnterKey.click();
    }

    // Arrow buttons through failed questions
    const next = document.getElementsByClassName('next')[0];
    if (key === 'ArrowRight' && next) {
      next.firstElementChild.click();
    }

    const prev = document.getElementsByClassName('prev')[0];
    if (key === 'ArrowLeft' && prev) {
      prev.firstElementChild.click();
    }

    // Video play/pause with space
    if (key === ' ' && video) {
      const isVideoPlaying = !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
      isVideoPlaying ? video.pause() : video.play();
    }
  },
  false
);
