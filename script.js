// ===== ELEMEN DOM =====
const mainHeart = document.getElementById('mainHeart');
const secretMessage = document.getElementById('secretMessage');
const typingText = document.getElementById('typingText');
const nextBtn = document.getElementById('nextBtn');
const question = document.getElementById('question');
const closing = document.getElementById('closing');
const yesBtn = document.getElementById('yesBtn');
const maybeBtn = document.getElementById('maybeBtn');
const response = document.getElementById('response');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const skipBtn = document.getElementById('skipBtn');
const notification = document.getElementById('notification');

// ===== PESAN CONFESS =====
const messages = [
    "Aku mau ngomong sesuatu yang dari kemarin-kemarin sebenarnya sudah aku pendam...",
    "Cuma aku bingung cara nyampeinnya.",
    "Semakin sering aku ngobrol sama kamu, semakin aku sadar...",
    "Kamu tuh punya cara sendiri buat bikin aku nyaman.",
    "Entah dari cara kamu cerita, cara kamu bercanda...",
    "Atau sikap kamu yang kadang sederhana tapi ngena banget.",
    "Aku nggak tahu kamu sadar atau nggak...",
    "Tapi being around you feels different.",
    "Rasanya lebih tenang, lebih ringan, dan jujur...",
    "Aku suka perasaan itu.",
    "Kamu punya vibe yang bikin aku ngerasa dihargai dan didengerin...",
    "Dan itu jarang banget aku dapetin dari orang lain.",
    "Maybe it sounds cheesy...",
    "But the more I get to know you, the more I realize...",
    "How special you are to me.",
    "Aku mulai ngerasa kalau kehadiran kamu...",
    "Pelan-pelan jadi hal yang aku tunggu setiap hari.",
    "Dan aku bukan cuma nyaman sama kamu...",
    "Aku juga mulai suka sama kamu.",
    "Beneran suka.",
    "Beneran jatuh cinta malah.",
    "Aku cuma mau jujur soal perasaan ini.",
    "Aku nggak berharap kamu harus jawab apa sekarang...",
    "Aku cuma pengen kamu tahu kalau kamu itu berarti buat aku.",
    "What happens next, we can take it slow...",
    "But I just wanted you to know how I truly feel."
];

// ===== VARIABEL KONTROL =====
let messageIndex = 0;
let charIndex = 0;
let isTyping = false;
let isPaused = false;
let typingSpeed = 40;
let skipRequested = false;
let confettiAnimation = null;

// ===== FUNGSI UTAMA =====
function getMessageClass(message) {
    const msg = message.toLowerCase();
    if (msg.includes("beneran") || msg.includes("jatuh cinta") || msg.includes("suka sama kamu")) {
        return "highlight";
    } else if (msg.includes("maybe") || msg.includes("special") || msg.includes("different")) {
        return "emphasis";
    } else if (message.length > 50 || message.includes("...") || message.includes("---")) {
        return "special-line";
    }
    return "";
}

function typeMessage() {
    if (skipRequested) {
        skipToEnd();
        return;
    }
    
    if (isPaused) {
        setTimeout(typeMessage, 100);
        return;
    }
    
    if (messageIndex < messages.length) {
        let currentMessage = messages[messageIndex];
        let messageClass = getMessageClass(currentMessage);
        
        if (charIndex === 0 && currentMessage.trim() === "") {
            typingText.innerHTML += "<br><br>";
            messageIndex++;
            setTimeout(typeMessage, 300);
            return;
        }
        
        if (charIndex < currentMessage.length) {
            let char = currentMessage.charAt(charIndex);
            
            if (charIndex === 0 && messageClass) {
                typingText.innerHTML += `<span class="${messageClass}">`;
            }
            
            typingText.innerHTML += char;
            charIndex++;
            
            typingText.parentElement.scrollTop = typingText.parentElement.scrollHeight;
            
            let speed = typingSpeed;
            if (char === ',' || char === ';') speed = 100;
            if (char === '.' || char === '!' || char === '?') speed = 200;
            if (char === ' ') speed = 20;
            
            setTimeout(typeMessage, speed);
        } else {
            if (messageClass) {
                typingText.innerHTML += "</span>";
            }
            
            typingText.innerHTML += "<br><br>";
            messageIndex++;
            charIndex = 0;
            
            if (messageIndex < messages.length) {
                setTimeout(typeMessage, 500);
            } else {
                isTyping = false;
                nextBtn.style.display = 'block';
            }
        }
    }
}

function skipToEnd() {
    typingText.innerHTML = "";
    messages.forEach((msg) => {
        let messageClass = getMessageClass(msg);
        if (msg.trim() === "") {
            typingText.innerHTML += "<br><br>";
        } else if (messageClass) {
            typingText.innerHTML += `<span class="${messageClass}">${msg}</span><br><br>`;
        } else {
            typingText.innerHTML += `${msg}<br><br>`;
        }
    });
    isTyping = false;
    skipRequested = false;
    nextBtn.style.display = 'block';
    typingText.parentElement.scrollTop = typingText.parentElement.scrollHeight;
}

// ===== CONFETTI EFFECT =====
function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiCount = 200;
    const confetti = [];
    const colors = ['#ff6b8b', '#ffcc00', '#a5b4fc', '#00b09b', '#8e2de2', '#FF5252', '#4CAF50', '#2196F3'];
    
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -100,
            r: Math.random() * 6 + 3,
            d: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 5,
            tiltAngle: 0,
            tiltSpeed: Math.random() * 0.1 + 0.05,
            shape: Math.random() > 0.5 ? 'circle' : 'rect',
            speedX: Math.random() * 3 - 1.5
        });
    }
    
    function drawConfettiPiece(c) {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.tiltAngle);
        
        if (c.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, c.r, 0, Math.PI * 2);
            ctx.fillStyle = c.color;
            ctx.fill();
        } else {
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.r, -c.r/4, c.r*2, c.r/2);
        }
        
        ctx.restore();
    }
    
    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach(c => {
            drawConfettiPiece(c);
            c.tiltAngle += c.tiltSpeed;
            c.y += c.d;
            c.x += Math.sin(c.tiltAngle) * 2 + c.speedX;
            
            if (c.y > canvas.height) {
                c.x = Math.random() * canvas.width;
                c.y = Math.random() * -50;
                c.d = Math.random() * 4 + 2;
                c.speedX = Math.random() * 3 - 1.5;
            }
            
            if (c.x > canvas.width + 50 || c.x < -50) {
                c.x = Math.random() * canvas.width;
                c.y = Math.random() * -50;
            }
        });
        
        confettiAnimation = requestAnimationFrame(drawConfetti);
    }
    
    if (confettiAnimation) {
        cancelAnimationFrame(confettiAnimation);
    }
    
    drawConfetti();
    
    setTimeout(() => {
        if (confettiAnimation) {
            cancelAnimationFrame(confettiAnimation);
            confettiAnimation = null;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, 30000);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    notification.textContent = message;
    notification.className = `notification show ${type}`;
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.className = 'notification hidden';
        }, 300);
    }, 3000);
}

// ===== EVENT LISTENERS =====
mainHeart.addEventListener('click', () => {
    mainHeart.style.animation = 'none';
    mainHeart.parentElement.style.opacity = '0';
    mainHeart.parentElement.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        mainHeart.parentElement.classList.add('hidden');
        secretMessage.classList.remove('hidden');
        secretMessage.style.animation = 'fadeInUp 1s ease';
        
        isTyping = true;
        typeMessage();
    }, 800);
});

pauseBtn.addEventListener('click', () => {
    isPaused = true;
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'inline-flex';
});

resumeBtn.addEventListener('click', () => {
    isPaused = false;
    resumeBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-flex';
    if (isTyping) typeMessage();
});

skipBtn.addEventListener('click', () => {
    skipRequested = true;
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'none';
    skipBtn.style.display = 'none';
});

nextBtn.addEventListener('click', () => {
    if (isTyping && !skipRequested) {
        skipRequested = true;
        return;
    }
    
    secretMessage.classList.add('hidden');
    question.classList.remove('hidden');
    question.style.animation = 'fadeInUp 1s ease';
});

yesBtn.addEventListener('click', () => {
    response.innerHTML = `
        <h3 style="color: #96c93d;">🎉 YAYYY! TERIMA KASIH! 🎉</h3>
        <p>Aku nggak nyangka kamu bakal jawab iya! Ini bener-bener bikin hariku!</p>
        <p>Aku tunggu kabar baiknya ya Mich! 😊</p>
        <p style="margin-top: 15px;"><i>Website ini jadi kenangan pertama kita ya! 💝</i></p>
    `;
    response.classList.remove('hidden');
    launchConfetti();
    
    setTimeout(() => {
        question.classList.add('hidden');
        closing.classList.remove('hidden');
        closing.style.animation = 'fadeInUp 1s ease';
    }, 5000);
});

maybeBtn.addEventListener('click', () => {
    maybeBtn.innerHTML = '<i class="fas fa-running"></i> Tunggu dulu...';
    maybeBtn.style.background = 'linear-gradient(90deg, #ff416c, #ff4b2b)';
    
    setTimeout(() => {
        response.innerHTML = `
            <h3 style="color: #a5b4fc;">😊 Aku Hargai Kejujuranmu</h3>
            <p>Terima kasih udah jujur dan nggak langsung nolak.</p>
            <p>Aku ngerti kok kalau butuh waktu. Yang penting kita masih bisa berteman dulu.</p>
            <p style="margin-top: 15px;"><i>Tidak ada tekanan sama sekali, kok. Yang penting jujur 🌸</i></p>
        `;
        response.classList.remove('hidden');
        
        setTimeout(() => {
            question.classList.add('hidden');
            closing.classList.remove('hidden');
            closing.style.animation = 'fadeInUp 1s ease';
        }, 4000);
    }, 1500);
});

// ===== WINDOW RESIZE HANDLER =====
function handleResize() {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    const signatureName = document.querySelector('.signature-name');
    if (signatureName) {
        signatureName.textContent = "[Kak Laurennn]"; // GANTI NAMA LO
    }
    
    nextBtn.style.display = 'none';
    window.addEventListener('resize', handleResize);
    handleResize();
    
    console.log("💌 Website Confess for Mich loaded!");
    console.log("❤️ Good luck bro!");
});

window.addEventListener('beforeunload', () => {
    if (confettiAnimation) {
        cancelAnimationFrame(confettiAnimation);
    }
});
