import CryptoJS from 'crypto-js';

const secretKey = "gizliAnahtar123"; 

export const encryptMessage = (message:string) => {
    return CryptoJS.AES.encrypt(message, secretKey).toString();
}

export const decryptMessage = (encryptedMessage: string) => {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
}