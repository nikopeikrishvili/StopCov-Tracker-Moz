const periodInMinutes = 1; // for every 3 minute alarm should come
var infected = 0;
var CovNotification = "Cov-notification";

console.log("LOADED")

// Add a method when a alarm is triggerd
browser.alarms.onAlarm.addListener(handleAlarm);

/**
 *
 */
function createNoti(){

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "https://studyhub.ge/stopcov.php");
    oReq.send();
    browser.alarms.create("covid-19-alarm", {delayInMinutes: periodInMinutes});




}

/**
 *
 */
function reqListener () {
    var data = JSON.parse(this.responseText);
    if(data.result==='ok'){
        if(data.data.infected !== infected){
            browser.notifications.create(CovNotification, {
                "type": "basic",
                "iconUrl": browser.extension.getURL("icons/covid-19-96.png"),
                "title": "ბოლო ინფორმაცია",
                "message": "ბოლო მონაცემებით ინფიცირებული "+data.data.infected+" ადამიანი (+"+(data.data.infected-infected)+")"
            });
            infected = data.data.infected
            browser.browserAction.setBadgeText({text:  String(infected)});

        }
    }

}

/**
 *
 * @param alarmInfo
 */
function handleAlarm(alarmInfo) {
    createNoti();
}

createNoti();



