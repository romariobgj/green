let currentOption = '';

function openModal(option) {
    currentOption = option;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    resetForm();
}

function resetForm() {
    document.getElementById('applicationForm').reset();
    document.getElementById('validation').classList.add('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('applicationForm').classList.remove('hidden');
    document.getElementById('modal-title').classList.remove('hidden');
    document.getElementById('validation-steps').innerHTML = '';
    document.getElementById('email-suggestions').classList.add('hidden');
}

function suggestEmailProviders() {
    const emailInput = document.getElementById('email');
    const suggestionsDiv = document.getElementById('email-suggestions');
    const emailValue = emailInput.value.trim();
    const providers = [
        '@gmail.com',
        '@yahoo.com',
        '@hotmail.com',
        '@outlook.com',
        '@aol.com',
        '@icloud.com'
    ];

    // Clear previous suggestions
    suggestionsDiv.innerHTML = '';
    suggestionsDiv.classList.add('hidden');

    // If the email input is empty or already contains an @, don't show suggestions
    if (!emailValue || emailValue.includes('@')) {
        return;
    }

    // Show suggestions
    suggestionsDiv.classList.remove('hidden');
    providers.forEach(provider => {
        const suggestion = document.createElement('div');
        suggestion.textContent = emailValue + provider;
        suggestion.addEventListener('click', () => {
            emailInput.value = emailValue + provider;
            suggestionsDiv.classList.add('hidden');
        });
        suggestionsDiv.appendChild(suggestion);
    });
}

function validateForm(event) {
    event.preventDefault();
    const validationDiv = document.getElementById('validation');
    const validationSteps = document.getElementById('validation-steps');
    const resultDiv = document.getElementById('result');
    const modalTitle = document.getElementById('modal-title');

    // Get the user's name from the form
    const userName = document.getElementById('name').value.toUpperCase();
    document.getElementById('user-name').textContent = userName;

    // Hide the form and title
    document.getElementById('applicationForm').classList.add('hidden');
    modalTitle.classList.add('hidden');
    validationDiv.classList.remove('hidden');

    const steps = [
        { title: 'Verifying your identity...', description: 'Checking basic information', icon: 'fa-magnifying-glass' },
        { title: 'Checking criminal background...', description: 'Reviewing prior records', icon: 'fa-file-lines' },
        { title: 'Validating citizenship status...', description: 'Analyzing immigration records', icon: 'fa-passport' },
        { title: 'Reviewing financial records...', description: 'Ensuring compliance with regulations', icon: 'fa-money-bill' },
        { title: 'Cross-referencing international databases...', description: 'Verifying global records', icon: 'fa-globe' },
        { title: 'Finalizing your approval...', description: 'Confirming eligibility', icon: 'fa-check-circle' }
    ];

    let i = 0;
    function showNextStep() {
        if (i < steps.length) {
            const li = document.createElement('li');

            const stepDiv = document.createElement('div');
            stepDiv.classList.add('validation-step');

            const icon = document.createElement('i');
            icon.classList.add('fa', steps[i].icon);
            stepDiv.appendChild(icon);

            const textDiv = document.createElement('div');
            textDiv.classList.add('validation-step-text');

            const title = document.createElement('div');
            title.classList.add('title');
            title.textContent = steps[i].title;
            textDiv.appendChild(title);

            const description = document.createElement('div');
            description.classList.add('description');
            description.textContent = steps[i].description;
            textDiv.appendChild(description);

            stepDiv.appendChild(textDiv);
            li.appendChild(stepDiv);

            const progressBar = document.createElement('div');
            progressBar.classList.add('progress-bar');
            const progress = document.createElement('div');
            progress.classList.add('progress');
            progressBar.appendChild(progress);

            li.appendChild(progressBar);
            validationSteps.appendChild(li);

            setTimeout(() => {
                li.classList.add('visible');
                progress.style.width = '100%'; // Fill the progress bar
                setTimeout(() => {
                    i++;
                    showNextStep();
                }, 3000); // 3 seconds per step
            }, 100);
        } else {
            setTimeout(() => {
                validationDiv.classList.add('hidden');
                resultDiv.classList.remove('hidden');
            }, 1000);
        }
    }
    showNextStep();
}