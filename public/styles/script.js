document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById('toggleButton');
    const answer = document.getElementById('answer');

    toggleButton.addEventListener('click', function() {
        if (answer.classList.contains('hidden')) {
            answer.classList.remove('hidden');
            toggleButton.textContent = 'Hide Answer';
        } else {
            answer.classList.add('hidden');
            toggleButton.textContent = 'View Answer';
        }
    });
});
