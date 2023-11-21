function updateProgressBar(remainingAmount) {
    var totalDue = 118040.00; // Total amount due
    var paidAmount = totalDue - remainingAmount;
    var progressPercentage = (paidAmount / totalDue) * 100;

    var progressBar = document.getElementById('progressBar');
    progressBar.style.width = progressPercentage.toFixed(2) + '%';
    progressBar.innerHTML = progressPercentage.toFixed(2) + '%';

    if (remainingAmount <= 0) {
        triggerConfetti();
    }
}


function triggerConfetti() {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
}



function calculateCharge() {
    var remainingAmount = parseFloat(document.getElementById('remainingAmount').value);
    var repaymentRate = 0.20; // 20%
    var totalCharge = remainingAmount / repaymentRate;
    document.getElementById('result').innerHTML = '$' + totalCharge.toFixed(2);

    updateMotivation();
    updateProgressBar(remainingAmount);
}

function updateMotivation() {
    var today = new Date();
    var saharBirthday = new Date('2024-06-01');
    var diffInTime = saharBirthday.getTime() - today.getTime();
    var diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

    var countdownText = 'Days until Sahar\'s Birthday: ' + diffInDays;
    document.getElementById('countdown').innerHTML = countdownText;

    var motivationText = diffInDays > 30 ?
        "You're doing great! Keep up the pace to reach your goal!" :
        "Almost there! A little more effort to make Sahar's birthday special!";
    document.getElementById('motivation').innerHTML = motivationText;
}

window.onload = function() {
    updateMotivation();
    updateProgressBar(118040.00); // Initialize with full amount due
};
