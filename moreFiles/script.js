import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, set, get, push, child, update, remove, onChildAdded, onChildRemoved } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA9czXS21ONXVxY2eGMS4GwMfR78IJE_Yc",
  authDomain: "secret-37491.firebaseapp.com",
  databaseURL: "https://secret-37491-default-rtdb.firebaseio.com",
  projectId: "secret-37491",
  storageBucket: "secret-37491.firebasestorage.app",
  messagingSenderId: "185262437707",
  appId: "1:185262437707:web:0ffe7c52e56f496e27a4ce",
  measurementId: "G-W19Q39DHFZ"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function retrieveData(){
    // const queryString = window.location.search;
    // const params = new URLSearchParams(queryString);
    // const name = params.get("name");
    // document.getElementById("username").innerText = name;

    let svgSend = document.getElementById("svgSend");
    let userMessage = document.getElementById("inputBox");
    
    module.sendMsg = function sendMsg() {
        var timeStamp = new Date().getTime(),
        let now = new Date();
        let currentDate = now.toLocaleString();
        let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let screenSize = window.screen.width + ', ' + window.screen.height;
        let platform = navigator.platform + ', ' + navigator.appName + ', ' + navigator.appVersion;
        let deviceMemory = navigator.deviceMemory || 'Not supported';
        deviceMemory = `${deviceMemory} GB`;
        let cpuCores = navigator.hardwareConcurrency || 'Not supported';
        cpuCores = `${cpuCores}`;
        if ('getBattery' in navigator && typeof navigator.getBattery === 'function') {
            navigator.getBattery().then(function(battery) {
                sessionStorage.setItem('Battery', `${battery.level * 100}%` + ', ' + `${battery.charging ? "Charging: Yes" : "Charging: No"}`);
            });
        }
        fetch("https://api.ipify.org?format=json").then(response => response.json())
        .then(data => {
            sessionStorage.setItem('IP', data.ip);
        })
        let ip = sessionStorage.getItem('IP').replace(/\./g, ':');
        let message = userMessage.value.trim();
        if (userMessage.value.trim().length !== 0) {
            set(ref(db, 'Messages/' + ip + '/' + currentDate.replace(/\//g, ':').replace(/ /g, '-')), {
                "Message" : message
            }).then(() => {
                update(ref(db, 'Messages/' + ip + '/' + currentDate.replace(/\//g, ':').replace(/ /g, '-') + '/' + 'Related-Information'), {
                    IP: sessionStorage.getItem('IP'),
                    TIME: currentDate,
                    TIMEZONE: timeZone,
                    SCREENSIZE: screenSize,
                    PLATFORM: platform,
                    DEVICEMEMORY: deviceMemory,
                    CPUCORES: cpuCores,
                    BATTERY: sessionStorage.getItem('Battery')
                })
                userMessage.value = "";
                svgSend.classList.add("svgSend")
                setTimeout(() => {
                    svgSend.classList.remove("svgSend")
                }, 2000);
            })
        }else{
            userMessage.focus();
        }
    }
}
retrieveData();
