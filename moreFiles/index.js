import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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
const database = getDatabase(app);

window.collectAndStore = async function () {

    const report = {};

    // ================= IMPORTANT =================
    report.important = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        screen: `${screen.width} x ${screen.height}`,
        cpuCores: navigator.hardwareConcurrency,
        memoryGB: navigator.deviceMemory,
        timestamp: new Date().toISOString()
    };

    try {
        const ip = await fetch("https://api.ipify.org?format=json")
            .then(res => res.json());
        report.important.publicIP = ip.ip;
    } catch {}

    // ================= BROWSER =================
    report.browser = {
        vendor: navigator.vendor,
        cookiesEnabled: navigator.cookieEnabled,
        onlineStatus: navigator.onLine
    };

    // ================= DISPLAY =================
    report.display = {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth,
        pixelDepth: screen.pixelDepth,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
    };

    // ================= HARDWARE =================
    if (navigator.getBattery) {
        const b = await navigator.getBattery();
        report.hardware = {
            batteryLevel: b.level,
            charging: b.charging
        };
    }

    // ================= NETWORK =================
    if (navigator.connection) {
        report.network = {
            type: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink,
            rtt: navigator.connection.rtt
        };
    }

    // ================= ADVANCED =================
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.textBaseline = "top";
    ctx.font = "14px Arial";
    ctx.fillText("Fingerprint", 2, 2);
    report.advanced = {
        canvasFingerprint: canvas.toDataURL()
    };

    // WebGL
    const glCanvas = document.createElement("canvas");
    const gl = glCanvas.getContext("webgl");
    if (gl) {
        const debug = gl.getExtension("WEBGL_debug_renderer_info");
        if (debug) {
            report.advanced.webglVendor =
                gl.getParameter(debug.UNMASKED_VENDOR_WEBGL);
            report.advanced.webglRenderer =
                gl.getParameter(debug.UNMASKED_RENDERER_WEBGL);
        }
    }

    // ================= STORE IN FIREBASE =================
    push(ref(database, "deviceReports"), report);
};