function callText(text) {
    let textElement = document.createElement("span");
    textElement.setAttribute("class", "bold");
    textElement.innerText = text;
    return textElement;
}

function isNumeric(string) {
    return string.match(/\d/) != null;
}

function ruleset(tailnumber) {
    if (tailnumber.length > 6) {
        return false;
    }
    if (!isNumeric(tailnumber.charAt(1))) {
        return false;
    }
    for (let i=2; i<6; i++) {
        if (!isNumeric(tailnumber.charAt(i))) {
            if (tailnumber.length > i+2) {
                return false;
            }
            if (isNumeric(tailnumber.charAt(i+1))) {
                return false;
            }
        }
    }
    if (tailnumber.charAt(tailnumber.length-2) == "I" || tailnumber.charAt(tailnumber.length-2) == "O") {
        return false;
    }
    return !(tailnumber.charAt(tailnumber.length-1) == "I" || tailnumber.charAt(tailnumber.length-1) == "O");
}

function tailCompliancy(tailnumber, callsign) {
    if (tailnumber.startsWith('N') || callsign.startsWith('N')) {
        if (ruleset(tailnumber)) return true;
        return ruleset(callsign);
    }
    return false;
}

function findAircraft() {
    clearResults();
    let searchPattern = document.getElementById("searchPattern").value;
    let matchingRecords = aircrafts.filter(
        aircraft => {
            if (aircraft.callsign) {
                if (aircraft.callsign.indexOf(searchPattern) > -1)
                    return true;
            }

            if (aircraft.tailNumber) {
                if (aircraft.tailNumber.indexOf(searchPattern) > -1)
                    return true;
            }

            if (aircraft.agency) {
                if (aircraft.agency.indexOf(searchPattern) > -1)
                return true;
            }

            return false;
        });
    printResults(matchingRecords);
}

function printResults(matchingRecords) {
    let i = 0;
    if (matchingRecords.length < 1) {
        document.getElementById("results").innerHTML = "<div class=\"box\"><div class=\"title\">NO MATCHES FOUND</div></div>";
        return;
    }

    matchingRecords.forEach((aircraft => {
        i++;
        var element = document.createElement("div");
        element.setAttribute("id", `aircraft${i}`);
        if (tailCompliancy(aircraft.tailNumber, aircraft.callsign)) {
            element.setAttribute("class", "recordBox");
        }
        else {
            element.setAttribute("class", "recordBoxRed");
        }

        element.appendChild(callText("Registrant:"));

        var regname = document.createElement("span");
        regname.innerText = `${aircraft.regName}`;
        element.appendChild(regname);

        element.appendChild(callText("Phone number:"));

        var regph = document.createElement("span");
        regph.innerText = `${aircraft.regPH}`;
        element.appendChild(regph);

        element.appendChild(callText("Tail number:"));

        var tailnumber = document.createElement("span");
        tailnumber.innerText = `${aircraft.tailNumber}`;
        element.appendChild(tailnumber);

        element.appendChild(callText("Callsign:"));

        var callsign = document.createElement("span");
        callsign.innerText = `${aircraft.callsign}`;
        element.appendChild(callsign);

        element.appendChild(callText("Aircraft Type:"));

        var aircrafttype = document.createElement("span");
        aircrafttype.innerText = `${aircraft.aircraftType}`;
        element.appendChild(aircrafttype);

        element.appendChild(callText("Agency Name:"));

        var agencyname = document.createElement("span");
        agencyname.innerText = `${aircraft.agency}`;
        element.appendChild(agencyname);

        element.appendChild(callText("Agency Type:"));

        var agencytype = document.createElement("span");
        agencytype.innerText = `${aircraft.agencyType}`;
        element.appendChild(agencytype);

        element.appendChild(callText("Aircraft Model:"));

        var aircraftmodel = document.createElement("span");
        aircraftmodel.innerText = `${aircraft.aircraftModel}`;
        element.appendChild(aircraftmodel);

        document.getElementById("results").appendChild(element);
    }));
}

function clearResults() {
    document.getElementById("results").innerHTML = "";
}
