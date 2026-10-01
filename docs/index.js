const schedule_select = document.getElementById("lukkarivalinta");
schedule_select.addEventListener("change", () => {
    if (schedule_select.value != "") {
        window.location = `schedules.html?schedule=${schedule_select.value}`
    }
});
