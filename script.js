document.addEventListener('DOMContentLoaded', function () {
    // Romantic messages in Burmese
    const messages = [
        "ချစ်ရတဲ့သူလေးရေ...",
        "မင်းအကြောင်းကိုတွေးရတာ ပျော်တယ်...",
        "မင်းနဲ့အတူရှိနေရတာ ကျေးဇူးတင်တယ်...",
        "မင်းမျက်လုံးလေးတွေက ကြယ်တွေလို တောက်ပလိုက်တာ...",
        "အချိန်တိုင်း မင်းကိုပဲ တွေးနေမိတယ်...",
        "မင်းနဲ့ဆုံရတာ ကံကောင်းတယ်...",
        "အချစ်ဆိုတာ မင်းနဲ့အတူရှိနေတာပါ...",
        "နေ့တိုင်း မင်းကိုပိုချစ်မိတယ်...",
        "မင်းရယ်တဲ့အခါ ကမ္ဘာကြီးတစ်ခုလုံး လှပနေသလိုပဲ...",
        "မင်းနဲ့အတူနေရတဲ့အချိန်တိုင်းက အဖိုးတန်တယ်...",
        "ငါနဲ့အမြဲတမ်းအတူရှိနေပါ...",
        "မင်းအပြုံးက ငါ့ရဲ့နေ့တစ်နေ့လုံးကိုပြင်ဆင်ပေးတယ်...",
        "မင်းနဲ့အတူရှိရတာက ငါ့ဘဝရဲ့အကောင်းဆုံးအချိန်တွေပါ...",
        "မင်းကိုသတိရနေတယ်...",
        "မင်းနဲ့လက်တွဲပြီးဘဝကိုဖြတ်သန်းချင်တယ်...",
        "ငါ့စိတ်ထဲမှာ မင်းပဲအမြဲရှိနေမယ်..."
    ];

    // DOM elements
    const letterClosed = document.getElementById('letter-closed');
    const letterOpened = document.getElementById('letter-opened');
    const seal = document.getElementById('seal');
    const messageElement = document.getElementById('message');
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    const flowerPetals = document.querySelector('.flower-petals');

    // State variables
    let isOpen = false;
    let currentMessage = 0;
    let musicPlaying = false;
    let messageInterval;
    let petalsInterval;

    // Initialize the app
    function init() {
        updateMessage();

        // Event listeners
        letterClosed.addEventListener('click', toggleLetter);
        letterOpened.addEventListener('click', toggleLetter);
        musicBtn.addEventListener('click', toggleMusic);

        // Start with a random message
        currentMessage = Math.floor(Math.random() * messages.length);
    }

    // Toggle letter open/close
    function toggleLetter() {
        isOpen = !isOpen;

        if (isOpen) {
            // Open the letter
            letterClosed.style.transform = 'rotateY(180deg)';
            letterOpened.style.transform = 'rotateY(0deg)';
            letterOpened.classList.add('show');

            // Start changing messages
            messageInterval = setInterval(updateMessage, 3000);

            // Start creating petals
            petalsInterval = setInterval(createPetals, 1000);

        } else {
            // Close the letter
            letterClosed.style.transform = 'rotateY(0deg)';
            letterOpened.style.transform = 'rotateY(180deg)';
            letterOpened.classList.remove('show');

            // Stop changing messages
            clearInterval(messageInterval);

            // Stop creating petals
            clearInterval(petalsInterval);
        }
    }

    // Update the message
    function updateMessage() {
        // Fade out
        messageElement.style.opacity = 0;

        setTimeout(() => {
            messageElement.textContent = messages[currentMessage];
            currentMessage = (currentMessage + 1) % messages.length;

            // Fade in
            setTimeout(() => {
                messageElement.style.opacity = 1;
            }, 100);
        }, 500);
    }

    // Create falling petals
    function createPetals() {
        if (!isOpen) return;

        const petal = document.createElement('div');
        petal.classList.add('petal');

        // Random properties
        const size = Math.random() * 15 + 10;
        const leftPos = Math.random() * window.innerWidth;
        const rotation = Math.random() * 360;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 5;

        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${leftPos}px`;
        petal.style.transform = `rotate(${rotation}deg)`;
        petal.style.animation = `petalFall ${duration}s linear ${delay}s forwards`;

        flowerPetals.appendChild(petal);

        // Remove petal after animation
        setTimeout(() => {
            petal.remove();
        }, (duration + delay) * 1000);
    }

    // Toggle background music
    function toggleMusic() {
        if (musicPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.play().catch(e => {
                console.log("Audio playback failed:", e);
                alert('ကျေးဇူးပြု၍ page ကို အရင်နှိပ်ပေးပါ');
            });
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        musicPlaying = !musicPlaying;
    }

    // Initialize the app
    init();
});
