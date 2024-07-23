document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Form submitted!');
});
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKgIVhnNeFdlug3YPrQqJjA916INhzPi4",
    authDomain: "deafvueproject.firebaseapp.com",
    projectId: "deafvueproject",
    storageBucket: "deafvueproject.appspot.com",
    messagingSenderId: "954927915842",
    appId: "1:954927915842:web:26c0aaf7143c40ae9d9edb",
    measurementId: "G-HEZK6THNEJ",
    databaseURL: "https://deafvueproject-default-rtdb.firebaseio.com/",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// WebRTC setup
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startCallButton = document.getElementById('startCall');
//const endCallButton = document.getElementById('endCall');
let localStream;
let remoteStream;
let peerConnection;
const config = {
    iceServers: [
        {
            urls: [
                'stun:stun.l.google.com:19302',    
                'turn:your-turn-server-url', username, 'your-username', credential, 'your-credential'
            ],
        },
        startCallButton.onclick = async () => {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideo.srcObject = localStream;

            peerConnection = new RTCPeerConnection(config);
            peerConnection.addStream(localStream);
            peerConnection.onaddStream = (event) => {
                remoteVideo.srcObject = event.stream;
                
            };
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            document.getElementById('offer').value = JSON.stringify(peerConnection.localDescription);
        },
    ]
}
// Function to request microphone and camera permissions
async function requestMediaPermissions() {
    try {
        // Request permission for both microphone and camera
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        // Success: Permissions granted
        console.log('Microphone and camera permissions granted.');

        // Do something with the stream if needed
        // For example, you can attach it to a video element:
        // const videoElement = document.querySelector('video');
        // videoElement.srcObject = stream;
    } catch (error) {
        // Handle errors or permissions denied
        console.error('Permission denied or error occurred:', error);
    }
}
// Attach the function to the button click event
document.getElementById('starCall').addEventListener('click', () => {
 startVideoCall();
});

// Example: Call this function when you need to request permissions, such as on page load or button click
document.addEventListener('DOMContentLoaded', () => {
    // Optionally, call requestMediaPermissions here or attach it to an event
    // requestMediaPermissions();
});
