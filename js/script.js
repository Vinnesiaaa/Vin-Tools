document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded and DOM ready');

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const icon = themeToggle.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
            console.log('Theme toggled');
        });
    } else {
        console.error('Theme toggle button not found');
    }

    // Error Message
    function showError(elementId, message) {
        const errorDiv = document.getElementById(`${elementId}-error`);
        if (errorDiv) {
            errorDiv.textContent = message;
            setTimeout(() => (errorDiv.textContent = ''), 3000);
            console.log(`Error shown for ${elementId}: ${message}`);
        } else {
            console.error(`Error div not found for ${elementId}`);
        }
    }

    // Loading Indicator
    function showLoading(elementId) {
        const loadingDiv = document.getElementById(`${elementId}-loading`);
        if (loadingDiv) {
            loadingDiv.classList.add('active');
            setTimeout(() => loadingDiv.classList.remove('active'), 1000);
            console.log(`Loading shown for ${elementId}`);
        } else {
            console.error(`Loading div not found for ${elementId}`);
        }
    }

    // Copy to Clipboard
    function copyToClipboard(elementId) {
        const textarea = document.getElementById(elementId);
        if (textarea && textarea.value) {
            navigator.clipboard.writeText(textarea.value).then(() => {
                showError(elementId, 'Copied to clipboard!');
            }).catch(err => {
                showError(elementId, 'Failed to copy!');
                console.error('Clipboard error:', err);
            });
        } else if (textarea) {
            showError(elementId, 'Nothing to copy!');
        } else {
            console.error(`Textarea not found for ${elementId}`);
        }
    }

    // Clear Text
    function clearText(inputId, outputId) {
        const input = document.getElementById(inputId);
        const output = document.getElementById(outputId);
        if (input && output) {
            input.value = '';
            output.value = '';
            showError(inputId, 'Cleared!');
            console.log(`Cleared ${inputId} and ${outputId}`);
        } else {
            console.error(`Input or output not found for ${inputId}/${outputId}`);
        }
    }

    // Save to History
    function saveToHistory(tool, input, output) {
        let history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
        history.push({ tool, input, output, timestamp: new Date().toISOString() });
        localStorage.setItem('conversionHistory', JSON.stringify(history));
        console.log(`Saved to history: ${tool}`);
    }

    // Text Converter
    const textUppercase = document.getElementById('text-uppercase');
    const textLowercase = document.getElementById('text-lowercase');
    if (textUppercase && textLowercase) {
        textUppercase.addEventListener('click', () => {
            const input = document.getElementById('text-input').value;
            const output = document.getElementById('text-output');
            if (input && output) {
                showLoading('text');
                const result = input.toUpperCase();
                output.value = result;
                saveToHistory('Text Converter', input, result);
                console.log(`Converted to uppercase: ${result}`);
            } else {
                showError('text-input', 'Input or output not found');
            }
        });
        textLowercase.addEventListener('click', () => {
            const input = document.getElementById('text-input').value;
            const output = document.getElementById('text-output');
            if (input && output) {
                showLoading('text');
                const result = input.toLowerCase();
                output.value = result;
                saveToHistory('Text Converter', input, result);
                console.log(`Converted to lowercase: ${result}`);
            } else {
                showError('text-input', 'Input or output not found');
            }
        });
    } else {
        console.error('Text converter buttons not found');
    }

    // Base64 Encoder/Decoder
    const base64EncodeBtn = document.getElementById('base64-encode');
    const base64DecodeBtn = document.getElementById('base64-decode');
    if (base64EncodeBtn && base64DecodeBtn) {
        base64EncodeBtn.addEventListener('click', () => {
            const input = document.getElementById('base64-input').value;
            const output = document.getElementById('base64-output');
            if (input && output) {
                showLoading('base64');
                try {
                    const result = btoa(unescape(encodeURIComponent(input)));
                    output.value = result;
                    saveToHistory('Base64 Encoder', input, result);
                } catch (e) {
                    showError('base64-input', 'Invalid input for encoding');
                }
            } else {
                showError('base64-input', 'Input or output not found');
            }
        });
        base64DecodeBtn.addEventListener('click', () => {
            const input = document.getElementById('base64-input').value;
            const output = document.getElementById('base64-output');
            if (input && output) {
                showLoading('base64');
                try {
                    const result = decodeURIComponent(escape(atob(input)));
                    output.value = result;
                    saveToHistory('Base64 Decoder', input, result);
                } catch (e) {
                    showError('base64-input', 'Invalid Base64 string');
                }
            } else {
                showError('base64-input', 'Input or output not found');
            }
        });
    } else {
        console.error('Base64 buttons not found');
    }

    // URL Encoder/Decoder
    const urlEncodeBtn = document.getElementById('url-encode');
    const urlDecodeBtn = document.getElementById('url-decode');
    if (urlEncodeBtn && urlDecodeBtn) {
        urlEncodeBtn.addEventListener('click', () => {
            const input = document.getElementById('url-input').value;
            const output = document.getElementById('url-output');
            if (input && output) {
                showLoading('url');
                const result = encodeURIComponent(input);
                output.value = result;
                saveToHistory('URL Encoder', input, result);
            } else {
                showError('url-input', 'Input or output not found');
            }
        });
        urlDecodeBtn.addEventListener('click', () => {
            const input = document.getElementById('url-input').value;
            const output = document.getElementById('url-output');
            if (input && output) {
                showLoading('url');
                try {
                    const result = decodeURIComponent(input);
                    output.value = result;
                    saveToHistory('URL Decoder', input, result);
                } catch (e) {
                    showError('url-input', 'Invalid URL encoding');
                }
            } else {
                showError('url-input', 'Input or output not found');
            }
        });
    } else {
        console.error('URL buttons not found');
    }

    // JSON Formatter
    const jsonFormatBtn = document.getElementById('json-format');
    if (jsonFormatBtn) {
        jsonFormatBtn.addEventListener('click', () => {
            const input = document.getElementById('json-input').value;
            const output = document.getElementById('json-output');
            if (input && output) {
                showLoading('json');
                try {
                    const parsed = JSON.parse(input);
                    const result = JSON.stringify(parsed, null, 2);
                    output.value = result;
                    saveToHistory('JSON Formatter', input, result);
                } catch (e) {
                    showError('json-input', 'Invalid JSON: ' + e.message);
                }
            } else {
                showError('json-input', 'Input or output not found');
            }
        });
    } else {
        console.error('JSON format button not found');
    }

    // CSV to JSON Converter
    const csvConvertBtn = document.getElementById('csv-convert');
    if (csvConvertBtn) {
        csvConvertBtn.addEventListener('click', () => {
            const input = document.getElementById('csv-input').value;
            const output = document.getElementById('csv-output');
            if (input && output) {
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
            } else {
                showError('csv-input', 'Input or output not found');
            }
        });
    } else {
        console.error('CSV convert button not found');
    }

    // HTML Minifier/Beautifier
    const htmlMinifyBtn = document.getElementById('html-minify');
    const htmlBeautifyBtn = document.getElementById('html-beautify');
    if (htmlMinifyBtn && htmlBeautifyBtn) {
        htmlMinifyBtn.addEventListener('click', () => {
            const input = document.getElementById('html-input').value;
            const output = document.getElementById('html-output');
            if (input && output) {
                showLoading('html');
                const result = input.replace(/\s+/g, ' ').trim();
                output.value = result;
                saveToHistory('HTML Minifier', input, result);
            } else {
                showError('html-input', 'Input or output not found');
            }
        });
        htmlBeautifyBtn.addEventListener('click', () => {
            const input = document.getElementById('html-input').value;
            const output = document.getElementById('html-output');
            if (input && output) {
                showLoading('html');
                try {
                    const result = html_beautify(input, { indent_size: 2 });
                    output.value = result;
                    saveToHistory('HTML Beautifier', input, result);
                } catch (e) {
                    showError('html-input', 'Invalid HTML');
                }
            } else {
                showError('html-input', 'Input or output not found');
            }
        });
    } else {
        console.error('HTML buttons not found');
    }

    // Copy and Clear Buttons
    ['text', 'base64', 'url', 'json', 'csv', 'html'].forEach(tool => {
        const copyBtn = document.getElementById(`${tool}-copy`);
        const clearBtn = document.getElementById(`${tool}-clear`);
        if (copyBtn) {
            copyBtn.addEventListener('click', () => copyToClipboard(`${tool}-output`));
        } else {
            console.error(`${tool}-copy button not found`);
        }
        if (clearBtn) {
            clearBtn.addEventListener('click', () => clearText(`${tool}-input`, `${tool}-output`));
        } else {
            console.error(`${tool}-clear button not found`);
        }
    });
});
