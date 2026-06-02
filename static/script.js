const socket = io();

let username = "";

let rsaKeys;

const publicKeys = {};

async function registerUser() {

    username =
        document.getElementById("username").value;

    rsaKeys =
        await generateRSAKeys();

    const exportedPublicKey =
        await exportPublicKey(
            rsaKeys.publicKey
        );

    socket.emit("register", {

        username: username,

        public_key: exportedPublicKey
    });

    alert("Secure E2EE Connected");
}


async function sendMessage() {

    const receiver =
        document.getElementById("receiver").value;

    const message =
        document.getElementById("message").value;

    socket.emit(
        "get_public_key",
        { username: receiver }
    );

    socket.once("public_key", async function(data){

        const receiverPublicKey =
            await importPublicKey(
                data.public_key
            );

        const aesKey =
            await generateAESKey();

        const encryptedMessage =
            await encryptMessage(
                message,
                aesKey
            );

        const encryptedAESKey =
            await encryptAESKey(
                aesKey,
                receiverPublicKey
            );

        socket.emit("send_message", {

            sender: username,

            receiver: receiver,

            encrypted_message:
                JSON.stringify(encryptedMessage),

            encrypted_key:
                JSON.stringify(encryptedAESKey)
        });
    });
}


socket.on("receive_message", async function(data){

    if(data.receiver !== username)
        return;

    const encryptedMessage =
        JSON.parse(data.encrypted_message);

    const encryptedKey =
        JSON.parse(data.encrypted_key);

    const aesKey =
        await decryptAESKey(
            encryptedKey,
            rsaKeys.privateKey
        );

    const decrypted =
        await decryptMessage(

            encryptedMessage.ciphertext,

            encryptedMessage.iv,

            aesKey
        );

    const chat =
        document.getElementById("chat");

    chat.innerHTML += `

        <div class="message">

            <b>${data.sender}</b>

            <br><br>

            ${decrypted}

        </div>
    `;
});