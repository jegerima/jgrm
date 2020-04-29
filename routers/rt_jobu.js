/* eslint-disable max-len */
const express = require('express');
const formidable = require('formidable');
const utils = require('../utils/helpers');

// Helpers------>
const jparse = utils.jparse;
const isNullOrEmpty = utils.isNullOrEmpty;

module.exports.getRouter = function getRouter(m, logger) {
  const router = new express.Router();

  router.get(['/'], function dashboard(req, res) {
    res.send(jparse(true, 'JOBU'));
  });

  router.get('/getAllAds', function(req, res) {
    const ads = [
      {id: 1, title: 'Reparación de Casa', description: 'Hay una fuga de agua en la pared'},
      {id: 2, title: 'Limpieza de auto', description: 'Necesito lavar mi Audi Q5'},
      {id: 3, title: 'Desarrollo de app uber', description: 'Simple. Una app parecida a uber eats en menos de 4 meses'},
      {id: 3, title: 'Declaración de IVA Gran empresa', description: 'Realizar la declaración de impuestos desde el mes de Enero del 2020 hasta la fecha actual'},
    ];

    res.send(jparse(true, 'Anuncios', {ads: ads}));
  });

  router.get('/getAllCategories', function(req, res) {
    const categories = [
      {id: 1, name: 'Limpieza'},
      {id: 2, name: 'Plomeria'},
      {id: 3, name: 'Electricidad'},
      {id: 4, name: 'Vehículos'},
      {id: 5, name: 'Aires Acondicionados'},
      // {id: 6, name: 'Limpieza'},
      {id: 7, name: 'Jardinería'},
      {id: 8, name: 'Belleza'},
      {id: 9, name: 'Control de plagas'},
      {id: 10, name: 'Ropa y Textiles'},
      {id: 11, name: 'Cuidado de personas'},
      {id: 12, name: 'Mascotas'},
      {id: 13, name: 'Consulta médica'},
      {id: 14, name: 'Impuestos y Tributación'},
      {id: 15, name: 'Mantenimiento PC'},
      {id: 16, name: 'Clases particulares'},
      {id: 17, name: 'Electrónicos'},
      {id: 18, name: 'Pintura e interiores'},
      {id: 19, name: 'Planificación de eventos'},
      {id: 20, name: 'Ingeniería'},
    ];

    res.send(jparse(true, 'Categorías', {categories: categories}));
  });

  router.get('/categories/:id/getAllSubcategories', function(req, res) {
    const catID = parseInt(req.params.id);
    if (isNaN(catID)) {
      res.send(jparse(false, 'Categoria invalida'));
      return;
    }
    if (catID>20 || catID<0) {
      res.send(jparse(false, 'Categoria invalida'));
      return;
    }
    const subcategoriesRaw = [
      ['Zero'],
      ['Limpieza de casa', 'Limpieza de autos', 'Limpieza de muebles', 'Limpieza de cisternas', 'Limpieza de techo'],
      ['Baños'],
      ['Instalación electrica', 'Revisión de cableado', 'Prueba de potencia'],
      ['Cambio de llantas', 'Revision de frenos', 'Sistema de escape', 'Accesorios', 'Mantenimiento preventivo', 'Pulida de vidrios'],
      ['Instalación de aires', 'Mantenimiento de aires'],
      ['Nada'],
      ['Mantenimiento de jardín', 'Fumigación de jardín', 'Abono de jardín'],
      ['Manicure', 'Pedicure', 'Corte de Cabello', 'Peinado y cepillado', 'Maquillaje', 'Tratamientos'],
      ['Fumigación de insectos', 'Aplicación de químicos'],
      ['Lavado de ropa', 'Planchado de ropa', 'Tintado de ropa'],
      ['Cuidado de niños', 'Cuidado de adultos mayores', 'Cuidado de personas especiales'],
      ['Paseo de Mascotas', 'Cuidado de mascotas', 'Veterinarios a casa'],
      ['Medico General', 'Oftalmologo', 'Cardiologo', 'Otorrinolaringologo', 'Enfermeria', 'Pediatria', 'Dermatologo', 'Traumatologo', 'Psicologo', 'Psiquiatra', 'Geriatra'],
      ['Declaración de impuestos', 'Retencion del IVA'],
      ['Instalacion de software', 'Ensamblaje de computadores', 'Reparacion de computadores'],
      ['Ingles', 'Fisica', 'Matematica', 'Quimica', 'Lenguaje'],
      ['Mantenimiento de tvs, minicomponentes', 'Consulta y reparacion'],
      ['Pintado de fachadas', 'Pintado de interiores', 'Decoracion de interiores'],
      ['Decoracion de eventos', 'Planificacion de bodas', 'Planificacion de bautizo'],
      ['Proyectos industriales', 'Proyectos de Software', 'Proyectos de mecánica', 'Consultoría'],
      ['Pos21'],
    ];

    const subcategories = [];
    for (let z = 0; z<subcategoriesRaw[catID].length; z++) {
      const subCat = subcategoriesRaw[catID][z];
      subcategories.push({id: catID*100 + z, name: subCat});
    }

    res.send(jparse(true, 'Subcategorias', {subcategories: subcategories}));
  });

  router.post('/login', function(req, res) {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, function(error, fields, files) {
        try {
          console.log(fields, error);
          if (error) {
            res.send(jparse(false, error.message, error));
            logger.error(error.message);
          } else {
            if (isNullOrEmpty(fields.email)) {
              res.send(jparse(false, 'Email is empty'));
              return;
            }

            if (isNullOrEmpty(fields.password)) {
              res.send(jparse(false, 'Password is empty'));
              return;
            }

            const email = fields.email;
            const password = fields.password;

            if (email == 'test@test.com' && password=='1234567890') {
              res.send(jparse(true, 'Login', {
                id: 2,
                name: 'Usuario Test',
                mail: 'test@test.com',
                token: 'j0but35t1ngph453',
                phone: '0991121987',
                docid: '0987654321',
              }));
            } else {
              res.send(jparse(false, 'Credenciales Incorrectas'));
            }
          }
        } catch (err) {
          res.send(jparse(false, 'Error parsing form: login'));
          logger.error(err.message);
        }
      });
    } catch (err) {
      res.send(jparse(false, 'Error in post request: login'));
      logger.error(err.message);
    }
  });

  return router;
};
