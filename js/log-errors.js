const logContainer = document.getElementById('logContainer');
const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

// Function to add log to div
function addLog(type, args) {
    const logElement = document.createElement('div');
    logElement.className = type;
    logElement.textContent = `[${type.toUpperCase()}] ${args.join(' ')}`;
    logContainer.appendChild(logElement);
    logContainer.scrollTop = logContainer.scrollHeight; // Auto-scroll to the bottom
}

console.log = function(...args) {
    addLog('log', args);
    originalLog.apply(console, args);
};

console.warn = function(...args) {
    addLog('warn', args);
    originalWarn.apply(console, args);
};

console.error = function(...args) {
    addLog('error', args);
    originalError.apply(console, args);
};

window.onerror = function(message, source, lineno, colno, error) {
    addLog('error', [`${message} at ${source}:${lineno}:${colno}`, error ? error.stack : '']);
};