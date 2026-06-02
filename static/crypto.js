async function generateRSAKeys() {

    return await crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",

            modulusLength: 2048,

            publicExponent:
                new Uint8Array([1, 0, 1]),

            hash: "SHA-256"
        },

        true,

        ["encrypt", "decrypt"]
    );
}


async function exportPublicKey(publicKey) {

    const exported =
        await crypto.subtle.exportKey(
            "spki",
            publicKey
        );

    return btoa(
        String.fromCharCode(
            ...new Uint8Array(exported)
        )
    );
}


async function importPublicKey(key) {

    const binary =
        Uint8Array.from(
            atob(key),
            c => c.charCodeAt(0)
        );

    return await crypto.subtle.importKey(

        "spki",

        binary,

        {
            name: "RSA-OAEP",
            hash: "SHA-256"
        },

        true,

        ["encrypt"]
    );
}


async function generateAESKey() {

    return await crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256
        },

        true,

        ["encrypt", "decrypt"]
    );
}


async function exportAESKey(key) {

    const exported =
        await crypto.subtle.exportKey(
            "raw",
            key
        );

    return new Uint8Array(exported);
}


async function importAESKey(rawKey) {

    return await crypto.subtle.importKey(

        "raw",

        rawKey,

        {
            name: "AES-GCM"
        },

        true,

        ["decrypt"]
    );
}


async function encryptAESKey(aesKey, publicKey) {

    const rawKey =
        await exportAESKey(aesKey);

    const encrypted =
        await crypto.subtle.encrypt(

            {
                name: "RSA-OAEP"
            },

            publicKey,

            rawKey
        );

    return Array.from(
        new Uint8Array(encrypted)
    );
}


async function decryptAESKey(encryptedKey, privateKey) {

    const decrypted =
        await crypto.subtle.decrypt(

            {
                name: "RSA-OAEP"
            },

            privateKey,

            new Uint8Array(encryptedKey)
        );

    return importAESKey(
        new Uint8Array(decrypted)
    );
}


async function encryptMessage(message, aesKey) {

    const iv =
        crypto.getRandomValues(
            new Uint8Array(12)
        );

    const encrypted =
        await crypto.subtle.encrypt(

            {
                name: "AES-GCM",
                iv: iv
            },

            aesKey,

            new TextEncoder().encode(message)
        );

    return {

        ciphertext:
            Array.from(
                new Uint8Array(encrypted)
            ),

        iv:
            Array.from(iv)
    };
}


async function decryptMessage(ciphertext, iv, aesKey) {

    const decrypted =
        await crypto.subtle.decrypt(

            {
                name: "AES-GCM",
                iv: new Uint8Array(iv)
            },

            aesKey,

            new Uint8Array(ciphertext)
        );

    return new TextDecoder().decode(decrypted);
}
