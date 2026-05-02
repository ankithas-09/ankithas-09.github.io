(function () {
  'use strict';

  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-messages');
  var submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  // Mirror email into hidden _replyto field so Formspree replies go to sender
  var emailField = document.getElementById('email');
  var replyTo = document.getElementById('reply-to-field');
  if (emailField && replyTo) {
    emailField.addEventListener('input', function () {
      replyTo.value = emailField.value;
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var data = new FormData(form);
    var originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending&hellip;';
    status.className = 'form-status';
    status.textContent = '';

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          status.className = 'form-status success';
          status.textContent = "Thanks! Your message has been sent. I'll get back to you soon.";
          form.reset();
          if (replyTo) replyTo.value = '';
        } else {
          return response.json().then(function (json) {
            throw new Error(json.errors ? json.errors.map(function (e) { return e.message; }).join(', ') : 'Submission failed.');
          });
        }
      })
      .catch(function (err) {
        status.className = 'form-status error';
        status.textContent = 'Oops! Something went wrong. Please email me directly at s.ankitha0904@gmail.com';
        console.error(err);
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
  });
})();
