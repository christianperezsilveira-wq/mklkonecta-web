const apiKey = process.env.RESEND_API_KEY;

fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'test@example.com', // Intentional dummy email to force the restriction error
        subject: 'Test',
        html: '<p>Test</p>'
    })
})
    .then(res => res.json())
    .then(data => console.log(JSON.stringify(data)))
    .catch(err => console.error(err));
