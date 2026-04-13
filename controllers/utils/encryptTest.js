const crypto = require('crypto');

// AES-256 expects a 32-byte key and a 16-byte IV
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // Store this key securely
const iv = crypto.randomBytes(16);  // Store this IV securely

// Encryption function
const encrypt = async (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        encryptedData: encrypted,
        key: key.toString('hex'), // Return key and IV along with the encrypted data
        iv: iv.toString('hex')
    };
}

module.exports = encrypt;
