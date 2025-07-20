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

// Loading Indicator
function showLoading(elementId) {
    const loadingDiv = document.getElementById(`${elementId}-loading`);
    loadingDiv.classList.add('active');
    setTimeout(() => loadingDiv.classList.remove('active'), 1000); // Simulasi delay
}

// Copy to Clipboard
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).value;
    if (!text) {
        showError(elementId, 'Nothing to copy!');
        return;
    }
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showError(elementId, 'Copied to clipboard!');
        }).catch(() => {
            showError(elementId, 'Failed to copy!');
        });
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showError(elementId, 'Copied to clipboard!');
        } catch (e) {
            showError(elementId, 'Failed to copy!');
        }
        document.body.removeChild(textarea);
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
    if (history.length > 50) history.shift(); // Batasi hingga 50 entri
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
    showLoading('text');
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
    showLoading('base64');
    try {
        const result = btoa(unescape(encodeURIComponent(input)));
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
    showLoading('base64');
    try {
        const result = decodeURIComponent(escape(atob(input)));
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
    showLoading('url');
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
    showLoading('url');
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
    showLoading('json');
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
    showLoading('csv');
    try {
        Papa.parse(input, {
            complete: result => {
                if (result.errors.length) {
                    showError('csv-input', 'Invalid CSV format: ' + result.errors[0].message);
                    return;
                }
                const jsonResult = JSON.stringify(result.data, null, 2);
                output.value = jsonResult;
                saveToHistory('CSV to JSON', input, jsonResult);
            },
            header: true,
            skipEmptyLines: true
        });
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
    showLoading('html');
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
    showLoading('html');
    try {
        const result = html_beautify(input, { indent_size: 2 });
        output.value = result;
        saveToHistory('HTML Beautifier', input, result);
    } catch (e) {
        showError('html-input', 'Invalid HTML');
    }
}
