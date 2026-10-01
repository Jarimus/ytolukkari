function setContent() {
    const params = (new URLSearchParams(window.location.search));
    setH1(params);
    setSchedule(params);
    setDateHeader(params);
    setWeekChangeArrows(params);
}

function setH1(params) {
    const schedule = params.get("schedule");
    const h1 = document.getElementById("h1")
    switch (schedule) {
        case "hikalao":
            h1.textContent = "Hika + Lao";
            break;
        case "sote":
            h1.textContent = "Sote";
            break;
        case "nyo":
            h1.textContent = "Nyo";
            break
        default:
            window.location = "index.html";
            break;
    }
}

function setDateHeader(params) {
    const currentWeek = getWeekNumber(Date.now());
    const scheduleWeek = params.get("week") ?? getWeekNumber(Date.now());
    if (currentWeek != scheduleWeek) {
        document.getElementById("weekNumber").textContent = `Viikko ${scheduleWeek}`;
    }
}

function setSchedule(params) {
    const schedule = params.get("schedule");
    const week = params.get("week") ?? getWeekNumber(Date.now());
    console.log("Current week: ", week);
    var scheduleData;
    switch (schedule) {
        case "hikalao":
            scheduleData = HIKALAO_SCHEDULE;
            break;
        case "sote":
            scheduleData = SOTE_SCHEDULE;
            break;
        case "nyo":
            scheduleData = NYO_SCHEDULE;
            break
        default:
            window.location = "index.html";
            break;
    }
    // Set correct times
    ["ap_kello", "ruokailu_kello", "ip1_kello", "ip2_kello"].forEach((slot) => {
        document.getElementById(slot).textContent = scheduleData[slot];
    });
    // Set teachers (if no teachers or week info, set "Ei opetusta")
    ["ap_opettajat", "ip1_opettajat", "ip2_opettajat"].forEach((opet) => {
        if (opet === "ip2_opettajat" && schedule === "nyo") {
            const finalBlock = document.getElementById("final_block");
            finalBlock.hidden = true;
        }
        var opetus = scheduleData[week];
        if (opetus !== undefined) {
            opetus = opetus[opet] ?? "Ei opetusta";
        } else {
            opetus = "Ei opetusta";
        }
        document.getElementById(opet).textContent = opetus;
    });
}

function setWeekChangeArrows(params) {
    const schedule = params.get("schedule");
    const weekNumber = Number(params.get("week") ?? getWeekNumber(Date.now()));
    const prevArrow = document.getElementById("prev_week_arrow");
    const nextArrow = document.getElementById("next_week_arrow");
    prevArrow.setAttribute("href", `schedules.html?schedule=${schedule}&week=${weekNumber - 1}`);
    nextArrow.setAttribute("href", `schedules.html?schedule=${schedule}&week=${weekNumber + 1}`);
}

setContent();