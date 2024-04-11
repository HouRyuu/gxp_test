// public/script.js

async function calculate() {
    const input1 = document.getElementById('input1').value;
    const input2 = document.getElementById('input2').value;

    try {
        const response = await fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `input1=${input1}&input2=${input2}`
        });
        const data = await response.json();
        document.getElementById('result').innerText = data.result;
    } catch (error) {
        console.error('Error calculating:', error);
    }
}
