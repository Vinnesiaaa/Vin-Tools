// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const icon = document.querySelector('.theme-toggle i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
}

// Error Message
function showError(elementId, message) {
    const errorDiv = document.getElementById(`${elementId}-error`);
    errorDiv.textContent = message;
    setTimeout(() => (errorDiv.textContent = ''), 3000);
}

// Copy to Clipboard
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).value;
    if (text) {
        navigator.clipboard.writeText(text).then(() => {
            showError(elementId, 'Copied to clipboard!');
        });
    } else {
        showError(elementId, 'Nothing to copy!');
    }
}

// Clear Text
function clearText(inputId, outputId) {
    document.getElementById(inputId).value = '';
    document.getElementById(outputId).value = '';
    showError(inputId, 'Cleared!');
}

// Save to History
function saveToHistory(tool, input, output) {
    let history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    history.push({ tool, input, output, timestamp: new Date().toISOString() });
    localStorage.setItem('conversionHistory', JSON.stringify(history));
}

// Text Converter
function convertText(type) {
    const input = document.getElementById('text-input').value;
    const output = document.getElementById('text-output');
    if (!input) {
        showError('text-input', 'Please enter some text');
        return;
    }
    const result = type === 'uppercase' ? input.toUpperCase() : input.toLowerCase();
    output.value = result;
    saveToHistory('Text Converter', input, result);
}

// Base64 Encoder/Decoder
function base64Encode() {
    const input = document.getElementById('base64-input').value;
    const output = document.getElementById('base64-output');
    if (!input) {
        showError('base64-input', 'Please enter some text');
        return;
    }
    try {
        const result = btoa(input);
        output.value = result;
        saveToHistory('Base64 Encoder', input, result);
    } catch (e) {
        showError('base64-input', 'Invalid input for encoding');
    }
}

function base64Decode() {
    const input = document.getElementById('base64-input').value;
    const output = document.getElementById('base64-output');
    if (!input) {
        showError('base64-input', 'Please enter a Base64 string');
        return;
    }
    try {
        const result = atob(input);
        output.value = result;
        saveToHistory('Base64 Decoder', input, result);
    } catch (e) {
        showError('base64-input', 'Invalid Base64 string');
    }
}

// URL Encoder/Decoder
function urlEncode() {
    const input = document.getElementById('url-input').value;
    const output = document.getElementById('url-output');
    if (!input) {
        showError('url-input', 'Please enter a URL');
        return;
    }
    const result = encodeURIComponent(input);
    output.value = result;
    saveToHistory('URL Encoder', input, result);
}

function urlDecode() {
    const input = document.getElementById('url-input').value;
    const output = document.getElementById('url-output');
    if (!input) {
        showError('url-input', 'Please enter an encoded URL');
        return;
    }
    try {
        const result = decodeURIComponent(input);
        output.value = result;
        saveToHistory('URL Decoder', input, result);
    } catch (e) {
        showError('url-input', 'Invalid URL encoding');
    }
}

// JSON Formatter
function formatJSON() {
    const input = document.getElementById('json-input').value;
    const output = document.getElementById('json-output');
    if (!input) {
        showError('json-input', 'Please enter a JSON string');
        return;
    }
    try {
        const parsed = JSON.parse(input);
        const result = JSON.stringify(parsed, null, 2);
        output.value = result;
        saveToHistory('JSON Formatter', input, result);
    } catch (e) {
        showError('json-input', 'Invalid JSON: ' + e.message);
    }
}

// CSV to JSON Converter
function convertCSVtoJSON() {
    const input = document.getElementById('csv-input').value;
    const output = document.getElementById('csv-output');
    if (!input) {
        showError('csv-input', 'Please enter a CSV string');
        return;
    }
    try {
        const rows = input.split('\n').map(row => row.split(','));
        if (rows.length < 1) {
            showError('csv-input', 'CSV must have at least a header row');
            return;
        }
        const headers = rows[0];
        const result = rows.slice(1).map(row => {
            let obj = {};
            headers.forEach((header, i) => {
                obj[header.trim()] = row[i] ? row[i].trim() : '';
            });
            return obj;
        });
        const jsonResult = JSON.stringify(result, null, 2);
        output.value = jsonResult;
        saveToHistory('CSV to JSON', input, jsonResult);
    } catch (e) {
        showError('csv-input', 'Invalid CSV format');
    }
}

// HTML Minifier/Beautifier
function minifyHTML() {
    const input = document.getElementById('html-input').value;
    const output = document.getElementById('html-output');
    if (!input) {
        showError('html-input', 'Please enter HTML code');
        return;
    }
    const result = input.replace(/\s+/g, ' ').trim();
    output.value = result;
    saveToHistory('HTML Minifier', input, result);
}

function beautifyHTML() {
    const input = document.getElementById('html-input').value;
    const output = document.getElementById('html-output');
    if (!input) {
        showError('html-input', 'Please enter HTML code');
        return;
    }
    try {
        const result = html_beautify(input, { indent_size: 2 });
        output.value = result;
        saveToHistory('HTML Beautifier', input, result);
    } catch (e) {
        showError('html-input', 'Invalid HTML');
    }
}
