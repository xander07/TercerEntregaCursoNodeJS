const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
require('./helpers');

const port = process.env.PORT || 3000;

const dirNode_modules = path.join(__dirname , '../node_modules')
const directoriopublico = path.join(__dirname, '../public');
const directoriopartials = path.join(__dirname, '../partials');

app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));
app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/crear_curso', (req, res) => {
    res.render('crear');
});

app.post('/crearCurso', (req, res) => {
    res.render('creado', {
        id: parseInt(req.body.id),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: parseInt(req.body.precio),
        modalidad: req.body.modalidad,
        intensidad: parseInt(req.body.intensidad),
        estado: "Disponible"
    });
});

app.post('/eliminarAsp', (req, res) => {
    res.render('eliminarAsp', {
        id: req.body.id
    });
});

app.get('/verCursos', (req, res) => {
    res.render('ver');
});

app.get('/VerInscritos', (req, res) => {
    res.render('verInscritos');
});

app.get('/inscribirCurso', (req, res) => {
    res.render('inscribirCurso.hbs');
});

app.post('/inscribir', (req, res) => {
    res.render('inscribir', {
        name: req.body.name,
        documento: req.body.doc,
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono
    });
});

app.post('/actualizar', (req,res) => {
    res.render('actualizar', {
        id: req.body.id
    });
});

app.get('*', (req ,res) => {
    res.render('error');
});

app.listen(port, () => {

    console.log('servidor en el puerto' + port);
}); 