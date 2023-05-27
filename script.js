document.addEventListener('DOMContentLoaded', () => {
    const jsonInput = document.getElementById('jsonInput');
    const prettifyBtn = document.getElementById('prettifyBtn');
    const jsonOutput = document.getElementById('jsonOutput');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Event listener for the Prettify button
    prettifyBtn.addEventListener('click', async () => {
        const input = jsonInput.value.trim();

        if (input === '') {
            jsonOutput.value = ''; // Clear the output textarea
            return;
        }

        try {
            const response = await fetch('/prettify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: input
            });

            if (response.ok) {
                const prettifiedJson = await response.text();
                jsonOutput.value = prettifiedJson;

                // Enable the Download button
                downloadBtn.disabled = false;
                downloadBtn.addEventListener('click', () => {
                    const blob = new Blob([prettifiedJson], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'prettified.json';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
            } else {
                const message = await response.text();
                jsonOutput.value = `Error: ${message}`;
            }
        } catch (err) {
            console.error('Error:', err);
            jsonOutput.value = 'An error occurred. Please try again.';
        }
    });

    // Event listener for the Clear button
    clearBtn.addEventListener('click', () => {
        jsonInput.value = ''; // Clear the input textarea
        jsonOutput.value = ''; // Clear the output textarea
        downloadBtn.disabled = true; // Disable the Download button
    });
});
$(document).ready(function() {
    $('.faq-question').click(function() {
        $(this).next('.faq-answer').slideToggle();
    });
});
