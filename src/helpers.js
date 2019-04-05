const hbs = require('hbs');
const fs = require('fs');

cursos = [];
inscritos = [];

const listarCursos = () => {
    try {
        cursos = require('../cursos.json');
    } catch (error) {
        cursos = []
    }
}

const listarInscritos = () => {
    try {
        inscritos = require('../inscritos.json');
    } catch (error) {
        inscritos = []
    }
}

const guardarCurso = () => {
    let datos = JSON.stringify(cursos);
    fs.writeFile('cursos.json', datos, (err) => {
        if (err) throw (err);
        console.log('Archivo creado con éxito');
    });
}

const guardarInscrito = () => {
    let datos = JSON.stringify(inscritos);
    fs.writeFile('inscritos.json', datos, (err) => {
        if (err) throw (err);
        console.log('Archivo creado con éxito');
    });
}


hbs.registerHelper('crearCurso', (id, nombre, descripcion, precio, modalidad = '', intensidad = '', estado = 'Disponible') => {
    listarCursos();
    let nCurso = {
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        modalidad: modalidad,
        intensidad: intensidad,
        estado: estado
    };
    console.log(nCurso);
    let duplicado = cursos.find(cur => cur.id == nCurso.id);
    if (!duplicado) {
        cursos.push(nCurso);
        guardarCurso();
        let texto = '<h1>Fue creado con éxito</h1>';
        return texto;
    } else {
        let texto = '<h1>El id ya pertenece a un curso</h1>';
        return texto;
    }
});

hbs.registerHelper('listarC', () => {
    listarCursos();
    let texto = '<option></option>';
    cursos.forEach(cur => {
        texto = texto +
            '<option>' + cur.nombre+ '</option>';
    });
    return texto;
});

hbs.registerHelper('listar', () => {
    listaCursos = require('../cursos.json');
    let cursos = listaCursos.filter(cur => cur.estado == 'Disponible');
    if (cursos.length > 0) {
        let i = 1;
        let texto = "<form action='/actualizar' method='POST'>\
                <table class='table table-striped'>\
                <thead>\
                    <tr>\
                        <th scope='col'>#</th>\
                        <th scope='col'>ID</th>\
                        <th scope='col'>Nombre</th>\
                        <th scope='col'>Descripcion</th>\
                        <th scope='col'>Precio</th>\
                        <th scope='col'>Modalidad</th>\
                        <th scope='col'>Intensidad Horaria</th>\
                    </tr>\
                </thead>\
                <tbody>";

        cursos.forEach(curso => {
            texto = texto +
                '<tr>' +
                '<th scope="row">'+ i +'</th>'+
                '<td>' + curso.id + '</td>' +
                '<td>' + curso.nombre + '</td>' +
                '<td>' + curso.descripcion + '</td>' +
                '<td>' + curso.precio + '</td>' +
                '<td>' + curso.modalidad + '</td>' +
                '<td>' + curso.intensidad + '</td>';
                i = i+1;
        });

        texto = texto + '</tbody></table></form>';
        return texto;
    } else {
        texto = '<h1> NO HAY CURSOS DISPONIBLES </h1>';
        return texto;
    }
});

hbs.registerHelper('listar1', () => {
    listaCursos = require('../cursos.json');
    let cursos = listaCursos.filter(cur => cur.estado == 'Disponible');
    if (cursos.length > 0) {
        let i = 1;
        let texto = "<form action='/actualizar' method='POST'>\
                <table class='table table-striped'>\
                <thead>\
                    <tr>\
                        <th scope='col'>#</th>\
                        <th scope='col>ID</th>\
                        <th scope='col>Nombre</th>\
                        <th scope='col>Descripcion</th>\
                        <th scope='col>Precio</th>\
                        <th scope='col>Modalidad</th>\
                        <th scope='col>Intensidad Horaria </th>\
                    </tr>\
                </thead>\
                <tbody>";

        cursos.forEach(curso => {
            texto = texto +
                '<tr>' +
                '<th scope="row">'+ i +'</th>'+
                '<td>' + curso.id + '</td>' +
                '<td>' + curso.nombre + '</td>' +
                '<td>' + curso.descripcion + '</td>' +
                '<td>' + curso.precio + '</td>' +
                '<td>' + curso.modalidad + '</td>' +
                '<td>' + curso.intensidad + '</td>' +
                '<td><button class="submit" name="id" value ="' + curso.id +'">Actualizar</button></td></tr>';
                i = i+1;
        });

        texto = texto + '</tbody></table></form>';
        return texto;
    } else {
        texto = '<h1> NO HAY CURSOS DISPONIBLES </h1>';
        return texto;
    }
});

hbs.registerHelper('listarInscritos', () => {
    listaAspirantes = require('../inscritos.json');
    listaCursos = require('../cursos.json');
    if (listaAspirantes.length == 0) {
        let texto = '<h1> No hay inscritos en ningun curso </h1>';
        return texto;
    } else {
        let texto = "<form action='/eliminarAsp' method='POST'>\
                    <table class='table table-striped'>\
                        <thead>\
                            <tr>\
                                <th scope='col'>#</th>\
                                <th scope='col'> Nombre del curso</th>\
                                <th scope='col'> Nombre del aspirante</th>\
                                <th scope='col'> Documento del aspirante</th>\
                                <th scope='col'> Correo del aspirante</th>\
                                <th scope='col'> Telefono del aspirante</th>\
                            </tr>\
                    </thead>\
                    <tbody>";
        listaCursos.forEach(curso => {
            let aspirante = listaAspirantes.filter(as => as.id == curso.id);
            if (!aspirante) {
                texto = texto + '<h2> No hay aspirantes en este curso';
                return texto;
            } else {
                let i = 1;
                aspirante.forEach(asp => {
                    texto = texto +
                    '<tr>' +
                    '<th scope="row">'+ i +'</th>'+
                    '<td>' + curso.nombre + '</td>' +
                    '<td>' + asp.nombre + '</td>' +
                    '<td><label for="doc">' + asp.docIdentidad + '</label></td>' +
                    '<td>' + asp.correo + '</td>' +
                    '<td>' + asp.telefono + '</td>' +
                    '<td><button class="submit" name="id"' + 'value=' + curso.id + '>Eliminar</button></td>';
                    i = i + 1;
                });
            }
        });

        texto = texto + '</tbody></table></form>';
        return texto;
    }
});

hbs.registerHelper('eliminarAsp', (id) => {
    var id1 = id;
    control = id1.split('-');
    let id2 = control[0];
    let doc = control[1];
    listarInscritos();
    let curso1 = inscritos.find(cur => cur.id == id2);
    if(curso1){
        let asp = inscritos.find(aux => aux.docIdentidad == doc);
        if(asp){
            var i = inscritos.indexOf(asp);
            inscritos.splice(i,1);
            guardarInscrito();
        } else {
            console.log("El documento ingresado no pertenece a un aspirante de este curso");
        }
    } else {
        console.log("No hay un curso con este id");
    }
    
    return '<h1>Eliminado con éxito</h1>';
});

hbs.registerHelper('inscribir', (name, documento, nombre, email, telefono) => {
    listarCursos();
    listarInscritos();
    let curso = cursos.find(cur => cur.nombre == name);
    let id=curso.id;
    console.log(id);
    let nInscrito = {
        id: id,
        docIdentidad: documento,
        nombre: nombre,
        correo: email,
        telefono: telefono
    }
    let aux = inscritos.find(ins => ins.id == id);
    if (aux) {
        let duplicado = inscritos.find(ins1 => ins1.docIdentidad == documento);
        if (!duplicado) {

            inscritos.push(nInscrito);
            guardarInscrito();
            return '<h1>Inscrito con éxito</h1>';

        } else {
            return '<h1>Ya estás matriculado en este curso</h1>';
        }
    } else {
        inscritos.push(nInscrito);
        guardarInscrito();
        return '<h1>Inscrito con éxito</h1>';
    }
});

hbs.registerHelper('actualizar', (id) => {
    listarCursos();
    let nuevo = cursos.find(cur => cur.id == id);
    var i = cursos.indexOf(nuevo);
    cursos.splice(i,1);
    nuevo.estado = "Cerrado";
    cursos.push(nuevo);
    guardarCurso();

    return '<h1> Actualizado con éxito</h1>';
});