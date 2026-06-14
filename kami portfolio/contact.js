document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const formSuccess = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Button loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';

    // Collect form data
    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        // Show success message
        submitBtn.style.display = 'none';
        formSuccess.classList.add('show');
        form.reset();
      } else {
        // Show error on button
        btnText.textContent = 'Something went wrong. Try again.';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }

    } catch (error) {
      // Network error
      btnText.textContent = 'Network error. Try again.';
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }
  });

  // Input focus animations
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });

});