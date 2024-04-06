function saveSliderValue(event) {
    localStorage.setItem(event.target.id, event.target.value);
    updateSliderValue(event);
}

function loadSliderValue(sliderId) {
    const slider = document.getElementById(sliderId);
    const value = localStorage.getItem(sliderId);
    if (value !== null) {
        slider.value = value;
        document.getElementById(`${sliderId}-hours`).textContent = value;
    }
}

function updateSliderValue(event) {
    const output = document.getElementById(`${event.target.id}-hours`);
    output.textContent = event.target.value;
}

const sliders = document.querySelectorAll('input[type="range"]');

sliders.forEach(slider => {
    slider.addEventListener('input', saveSliderValue);
    slider.addEventListener('input', updateSliderValue)
    loadSliderValue(slider.id);
});
