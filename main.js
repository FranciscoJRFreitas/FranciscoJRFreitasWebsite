import "./style.css";
import Experience from "./Experience/Experience.js";

const experience = new Experience(document.querySelector(".experience-canvas"));

document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("background-audio");
    const muteButton = document.getElementById("mute-button");
    const muteIcon = muteButton.querySelector("i");

    muteButton.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            muteIcon.classList.replace("fa-volume-mute", "fa-volume-up");
        } else {
            audio.pause();
            muteIcon.classList.replace("fa-volume-up", "fa-volume-mute");
        }
    });
});
