document.getElementById('checkStatus').addEventListener('click', async function () {
    // Show the loader and hide the button text
    document.getElementById('buttonText').style.display = 'none';
    document.getElementById('buttonLoader').style.display = 'inline-block';

    let usernameInput = document.getElementById('usernameInput').value.trim().toLowerCase();
    // console.log(usernameInput);

    if (!usernameInput) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Please enter a username or profile link!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });

        // Hide the loader and show the button text again
        document.getElementById('buttonLoader').style.display = 'none';
        document.getElementById('buttonText').style.display = 'inline-block';
        return;
    }

    // Extract username if input is a URL
    if (usernameInput.includes('instagram.com/')) {
        const parts = usernameInput.split('/');
        usernameInput = parts.find(part => part && !part.includes('instagram.com') && !part.includes('www') && !part.includes('?') && !part.includes('https'));
    }

    // Ensure the username is properly trimmed and cleaned
    usernameInput = usernameInput ? usernameInput.split('?')[0] : '';

    // Remove any leading '@' from the username
    usernameInput = usernameInput.startsWith('@') ? usernameInput.slice(1) : usernameInput;

    if (!usernameInput) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Invalid username or URL!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });

        // Hide the loader and show the button text again
        document.getElementById('buttonLoader').style.display = 'none';
        document.getElementById('buttonText').style.display = 'inline-block';
        return;
    }

    // Format the result as "PS (username)"
    const formattedUsername = `PS (${usernameInput})`;

    // console.log(formattedUsername);

    // Automatically copy the formatted username to the clipboard
    try {
        await navigator.clipboard.writeText(formattedUsername);
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: `Username copied: ${formattedUsername}`,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    } catch (err) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Failed to copy the username!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    }

    // Hide the loader and show the button text again
    document.getElementById('buttonLoader').style.display = 'none';
    document.getElementById('buttonText').style.display = 'inline-block';

    document.getElementById('statusResult').innerHTML = `<span class="result">${formattedUsername}</span>`;
});
