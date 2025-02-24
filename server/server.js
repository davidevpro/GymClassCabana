const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware para archivos estáticos
app.use(express.static('public'));

// Middleware para procesar datos JSON
app.use(bodyParser.json());

// Leer datos desde data.json
let data = JSON.parse(fs.readFileSync('server/data.json', 'utf8'));

// Ruta para obtener clases
app.get('/classes', (req, res) => {
    res.json(data.classes);
});

// Ruta para login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = data.users.find(u => u.username === username);
    if (!user) {
        return res.status(401).send('Usuario o contraseña incorrectos.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).send('Usuario o contraseña incorrectos.');
    }

    res.send('Login exitoso.');
});

// Ruta para registrar un nuevo usuario
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const existingUser = data.users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).send('El usuario ya existe.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    data.users.push({ username, password: hashedPassword });

    fs.writeFileSync('server/data.json', JSON.stringify(data, null, 2));
    res.send('Registro exitoso.');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});