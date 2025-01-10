const gameBoard = document.querySelector('.game-board')
const timerElement = document.getElementById('timer')
const celebrationElement = document.querySelector('.celebration')
const playAgainButton = document.getElementById('play-again')
const winSound = document.getElementById('win-sound')
let startTime, timerInterval

// الصور (أضف الصور في نفس مجلد المشروع)
const images = [
    'img-2.png',
    'img-3.png',
    'img-4.png',
    'img-5.png',
    'img-6.png',
    'img-2.png',
    'img-3.png',
    'img-4.png',
    'img-5.png',
    'img-6.png',
]

// ترتيب الصور عشوائيًا
images.sort(() => Math.random() - 0.5)

// إنشاء البطاقات
images.forEach((image) => {
  const card = document.createElement('div')
  card.classList.add('card')
  card.innerHTML = `
    <div class="front"></div>
    <div class="back">
      <img src="${image}" alt="Memory Image">
    </div>
  `
  gameBoard.appendChild(card)
})

// المتغيرات لحالة اللعبة
let flippedCards = []
let matchedCount = 0

// بدء المؤقت
function startTimer() {
  startTime = Date.now()
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000)
    timerElement.textContent = `⏱ Time: ${elapsed}s`
  }, 1000)
}

// إيقاف المؤقت
function stopTimer() {
  clearInterval(timerInterval)
}

// إعادة تشغيل اللعبة
function resetGame() {
  window.location.reload()
}

// منطق اللعبة
gameBoard.addEventListener('click', (e) => {
  const card = e.target.closest('.card')

  if (
    !card ||
    card.classList.contains('flipped') ||
    card.classList.contains('matched')
  ) {
    return
  }

  if (!startTime) startTimer()

  // قلب البطاقة
  card.classList.add('flipped')
  flippedCards.push(card)

  if (flippedCards.length === 2) {
    const [firstCard, secondCard] = flippedCards
    const firstImage = firstCard.querySelector('img').src
    const secondImage = secondCard.querySelector('img').src

    if (firstImage === secondImage) {
      // مطابقة البطاقات
      firstCard.classList.add('matched')
      secondCard.classList.add('matched')
      matchedCount += 2
    } else {
      // إخفاء البطاقات غير المتطابقة بعد 0.5 ثانية
      setTimeout(() => {
        firstCard.classList.remove('flipped')
        secondCard.classList.remove('flipped')
      }, 500)
    }

    flippedCards = []
  }

  // التحقق من الفوز
  if (matchedCount === images.length) {
    stopTimer()
    winSound.play() // تشغيل صوت الفوز
    celebrationElement.classList.remove('hidden') // إظهار الاحتفالات
  }
})

// إعادة اللعب عند الضغط على "Play Again"
playAgainButton.addEventListener('click', resetGame)
