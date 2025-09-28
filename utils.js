//Utils

function getDate() {
    const now = new Date();
    return now.toISOString().split('T')[0];
}

function escapehtml(str) {
    return String(str).replace(/[&<>"']/g, c =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
}

module.exports = { getDate, escapehtml };