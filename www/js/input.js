function resetInputWarning() {
    if (!isPending()) {
        document.getElementById("ns-reqerror").textContent = "";
        document.getElementById("ns-reqinput").classList.remove("ms-border-green");
        enableRequest();
    }
}

function invalidInputWarning() {
    document.getElementById("ns-reqerror").textContent = "動画ID（sm123など）が含まれていません";
    document.getElementById("ns-reqinput").classList.add("ms-border-green");
    document.getElementById("ns-reqbtn").classList.add("ms-disabled")
}

function checkInput() {
    const inputValue = document.getElementById("ns-reqinput").value;
    const validPattern = /.*[^a-z]?[a-z]{2}\d+.*/;

    return inputValue == "" || validPattern.test(inputValue);
}

function checkInputAndWarning() {
    const inputValue = document.getElementById("ns-reqinput").value;

    if (checkInput()) {
        resetInputWarning(inputValue != "");
    } else {
        invalidInputWarning();
    }
}

document.getElementById("ns-reqinput").addEventListener('input', resetInputWarning);
document.getElementById("ns-reqinput").addEventListener('focusout', checkInputAndWarning);
document.getElementById("ns-request-js").addEventListener('load', function() { setTimeout(checkInputAndWarning, 1100) });