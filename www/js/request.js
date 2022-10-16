function dummySendingProgress() {
    const newProgress = getCurrentProgress() + (Math.random() * 10)
    updateProgress(newProgress)

    if (newProgress < 100) {
        setTimeout(dummySendingProgress, Math.random() * 1000)
    } else {
        requestAccepted();
    }
}

function requestAccepted() {
    document.getElementById("ns-reqinfo").textContent = "リクエストが受理されました！";
    document.getElementById("ns-reqbtn").innerHTML = "リクエスト送信！";
    setTimeout(afterAccepted, 5000);
}

function afterAccepted() {
    document.getElementById("ns-reqinfo").textContent = "";
    document.getElementById("ns-reqinput").value = "";
    document.getElementById("ns-reqinput").classList.remove("ms-disabled");
    enableRequest();
}

function getCurrentProgress() {
    const strProgress = document.getElementById("ns-progress-fill").style.width;
    const numProgress = parseFloat(strProgress);
    return numProgress;
}

function disableRequest() {
    var buttonElement = document.getElementById("ns-reqbtn");
    document.getElementById("ns-reqinput").classList.add("ms-disabled");
    buttonElement.classList.add("ms-disabled");
    buttonElement.removeEventListener('click', sendRequest);
    buttonElement.innerHTML = '<div class="ms-loading"></div>';
}

function enableRequest() {
    var buttonElement = document.getElementById("ns-reqbtn");
    buttonElement.addEventListener('click', sendRequest);
    buttonElement.innerHTML = "リクエスト送信！";
    const inputValue = document.getElementById("ns-reqinput").value;
    if (inputValue == "") {
        buttonElement.classList.add("ms-disabled");
    } else {
        buttonElement.classList.remove("ms-disabled");
    }
}

function sendRequest() {
    if (!checkInput()) {
        checkInputAndWarning();
    } else {
        disableRequest();
        document.activeElement.blur();
        setProgressMessage("リクエスト送信中");
        updateProgress(0);
        setTimeout(dummySendingProgress, 1000, 20);
    }
}

function setProgressMessage(message) {
    document.getElementById("ns-progress-fill").textContent = message
}

function updateProgress(newProgress) {
    if (newProgress < 100) {
        document.getElementById("ns-progress-fill").style.width = String(newProgress) + "%";
        document.getElementById("ns-progress").classList.remove("ms-light")
    } else {
        document.getElementById("ns-progress-fill").style.width = "100%";
        document.getElementById("ns-progress-fill").textContent = "";
        document.getElementById("ns-progress").classList.add("ms-light")
    }
}

function isPending() {
    return !!(getCurrentProgress() < 100)
}
document.getElementById("ns-request-js").addEventListener('load', function() { setTimeout(enableRequest, 1000) });
document.getElementById("ns-reqinput").addEventListener('focusin', function() { if (isPending()) { document.activeElement.blur() } })