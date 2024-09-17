const crypto = require('crypto');

// Decryption function
const decryptText = async (encryptedText, keyHex, ivHex) => {
    const key = Buffer.from(keyHex, 'hex'); // Convert the key from hex back to a buffer
    const iv = Buffer.from(ivHex, 'hex');   // Convert the IV from hex back to a buffer
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = decryptText;
