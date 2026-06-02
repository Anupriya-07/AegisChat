# 🔐 AegisChat

AegisChat is a secure real-time messaging application that implements End-to-End Encryption (E2EE) using RSA and AES cryptography. The application ensures that only the intended recipient can decrypt and read messages, while the server only forwards encrypted data.

---

##  Features

- Real-time messaging using Flask-SocketIO
- End-to-End Encryption (E2EE)
- RSA-2048 based secure key exchange
- AES-256-GCM message encryption
- Client-side encryption and decryption
- Secure public key sharing
- Encrypted message storage
- Modern responsive user interface
- Browser-based cryptography using Web Crypto API

---

##  System Architecture

Sender
↓
Generate AES Session Key
↓
Encrypt Message (AES-256-GCM)
↓
Encrypt AES Key (RSA Public Key)
↓
Send Encrypted Data
↓
Flask Server
(Forwards only encrypted data)
↓
Receiver
↓
Decrypt AES Key (RSA Private Key)
↓
Decrypt Message

---

##  Technologies Used

### Backend
- Python
- Flask
- Flask-SocketIO
- Flask-SQLAlchemy

### Frontend
- HTML
- CSS
- JavaScript

### Database
- SQLite

### Cryptography
- RSA-2048
- AES-256-GCM
- SHA-256
- Web Crypto API

---

##  Project Structure

```text
SecureChatE2EE/
│
├── app.py
├── models.py
├── requirements.txt
├── Procfile
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   ├── script.js
│   ├── crypto.js
│   └── logo.png
│
└── README.md
```

##  Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/AegisChat.git

cd AegisChat
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

Windows:

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Application

```bash
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

---

##  Security Features

- End-to-End Encryption (E2EE)
- RSA Public/Private Key Infrastructure
- AES Session-Based Encryption
- Secure Key Exchange
- Client-Side Message Decryption
- Server Cannot Read Plaintext Messages
- Encrypted Data Storage

---

##  Screenshots

Add screenshots of:
- Login/Join Screen
- Chat Interface
- Encrypted Message Flow
- Database Encryption Example

---

##  Project Objective

The objective of AegisChat is to demonstrate secure communication using modern cryptographic techniques. The system protects user privacy by ensuring that messages remain encrypted throughout transmission and can only be decrypted by the intended recipient.

---

##  Learning Outcomes

- Public Key Cryptography
- Symmetric Encryption
- Hybrid Encryption Architecture
- Secure Key Management
- Real-Time Web Communication
- Flask Web Development
- Browser Cryptography APIs

---

##  Author

Anupriya A

Cybersecurity & Software Development Project

