(() => {
  "use strict";
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  $("#startButton").addEventListener("click", () => $("#flowers").scrollIntoView({behavior:"smooth"}));

  const rose = $("#roseButton"), tulip = $("#tulipButton");
  const roseMsg = $("#roseMessage"), tulipMsg = $("#tulipMessage");

  rose.addEventListener("click", () => {
    const open = roseMsg.classList.toggle("visible");
    rose.setAttribute("aria-expanded", String(open));
    if (open) tulipMsg.classList.remove("visible");
  });

  tulip.addEventListener("click", () => {
    tulipMsg.classList.toggle("visible");
    roseMsg.classList.remove("visible");
    rose.setAttribute("aria-expanded", "false");
  });

  const smileNo = $("#smileNo"), smileMaybe = $("#smileMaybe"), smileResult = $("#smileResult");
  smileNo.addEventListener("click", () => {
    smileResult.textContent = "Yeah okay. I definitely believe you. 😭";
    smileNo.classList.add("selected"); smileMaybe.classList.remove("selected");
  });
  smileMaybe.addEventListener("click", () => {
    smileResult.textContent = "Mhm. 'Maybe'. Sure. 👀";
    smileMaybe.classList.add("selected"); smileNo.classList.remove("selected");
  });

  const trap = $("#doNotPress"), trapResult = $("#secretResult"), biceps = $("#biceps");
  let presses = 0;
  trap.addEventListener("click", () => {
    presses++;
    if (presses === 1) {
      trap.textContent = "I warned you.";
      trapResult.textContent = "Okay. That was one. Don't do it again.";
    } else if (presses === 2) {
      trap.textContent = "seriously 😭";
      trapResult.textContent = "You really don't listen, huh?";
    } else if (presses === 3) {
      trap.textContent = "LAST WARNING";
      trapResult.textContent = "This is your final chance.";
    } else {
      trap.disabled = true;
      trap.textContent = "fine. you win.";
      trapResult.textContent = "You kept pressing it. So here's what you unlocked. 👀";
      biceps.classList.add("unlocked");
      setTimeout(() => biceps.scrollIntoView({behavior:"smooth", block:"start"}), 250);
    }
  });

  const yes = $("#yesButton"), no = $("#noButton"), result = $("#callResult"), box = $("#callButtons");
  let attempts = 0;
  const msgs = ["hmm.", "nice try.", "that button seems broken.", "you're really committed to this, huh?", "okay, the website has made its decision. 😭"];

  no.addEventListener("click", () => {
    attempts++;
    result.textContent = msgs[Math.min(attempts - 1, msgs.length - 1)];

    if (attempts <= 4) {
      const rangeX = Math.max(25, (box.clientWidth - no.offsetWidth) / 2 - 8);
      const x = Math.random() * rangeX * 2 - rangeX;
      const y = Math.random() * 60 - 30;
      no.style.transform = `translate(${x}px, ${y}px)`;
    } else {
      no.disabled = true;
      no.textContent = "NO 😭";
      no.style.opacity = ".4";
      no.style.transform = "none";
      result.textContent = "Yeah... we're going with YES. I don't make the rules. 👀";
    }
  });

  yes.addEventListener("click", () => {
    no.disabled = true;
    no.style.opacity = ".4";
    result.textContent = "Perfect. I'll see you at 10:30 then. 🌹";
  });

  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, {threshold:.12});
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("visible"));
  }
})();
