function encryptMessage() {
    var message = document.getElementById("message").value;
    var key = generateKey();

    var encryptedMessage = simpleEncrypt(message, key);

    localStorage.setItem("encryptedData", JSON.stringify({message: encryptedMessage, key: key}));

    document.getElementById("encryptedMessage").innerText = "Encrypted message saved. Key: " + key;
}

function decryptMessage() {
    var encryptedData = JSON.parse(localStorage.getItem("encryptedData"));
    if (!encryptedData) {
        alert("No encrypted message found.");
        return;
    }

    var encryptedMessage = encryptedData.message;
    var key = document.getElementById("key").value;
    var decrypted = simpleDecrypt(encryptedMessage, key);
    if (decrypted === null) {
        alert("Decryption failed. Incorrect key or message.");
        return;
    }
    document.getElementById("decryptedMessage").innerText = decrypted;
}
function simpleEncrypt(message, key) {
    var result = '';
    for (var i = 0; i < message.length; i++) {
        var charCode = message.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        result += String.fromCharCode(charCode);
    }
    return result;
}

function simpleDecrypt(encryptedMessage, key) {
    var result = '';
    try {
        for (var i = 0; i < encryptedMessage.length; i++) {
            var charCode = encryptedMessage.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode);
        }
        return result;
    } catch (error) {
        return null; 
    }
}
function generateKey() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var key = '';
    for (var i = 0; i < 16; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}
