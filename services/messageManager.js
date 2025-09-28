class MessageManager {
    constructor(defaultLocale = 'en') {
        this.currentLocale = defaultLocale;
        this.messages = new Map();
        this.loadMessages();
    }

    loadMessages() {
        try {
            const messages = require(`../lang/messages/${this.currentLocale}/user`);
            this.messages.set(this.currentLocale, messages);
        } catch (error) {
            console.error(`Error loading messages for locale ${this.currentLocale}:`, error);
            if (this.currentLocale !== 'en') {
                this.currentLocale = 'en';
                this.loadMessages();
            }
        }
    }

    setLocale(locale) {
        const oldLocale = this.currentLocale;
        this.currentLocale = locale;

        if (!this.messages.has(locale)) {
            this.loadMessages();
        }

        return oldLocale;
    }

    getMessage(key, replacements = {}) {
        const localeMessages = this.messages.get(this.currentLocale) || {};

        if(!localeMessages || !localeMessages[key]) {
            console.warn(`Message key "${key}" not found for locale "${this.currentLocale}".`);
            return `Message key "${key}" not found.`;
        }

        let message = localeMessages[key];

        for (const [placeholder, value] of Object.entries(replacements)) {
            const regex = new RegExp(`{${placeholder}}`, 'g');
            message = message.replace(regex, value);
        }
        return message;
    }

    t(key, replacements = {}) {
        return this.getMessage(key, replacements);
    }
}

module.exports = new MessageManager();
