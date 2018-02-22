import { Meteor } from 'meteor/meteor';
Postgres = require('promised-postgres');
const { Pool, Client } = require('pg')


/*
var PORT = 5432 // From test/settings/test.pg.json

var CONN_STR = Meteor.settings.connStr ||
  'postgres://' // Using numtel:pg-server to run tests
  + 'postgres' + ':' // Default user is same as system user
  + 'postgres'               // From defaultpw file in NPM package
  + '@localhost:' + PORT   // Port as specified in .pg.json file (default: 5432)
  + '/jachasun'           // Default database

console.log(CONN_STR);
var CHANNEL = Meteor.settings.channel || 'test_channel';
liveDb = new LivePg("postgresql://postgres:postgres@127.0.0.1:5432/jachasun", CHANNEL);
*/


/*
//esto es prueba
alumnopg = new SQL.Collection('alumno','postgres://postgres:123456789@localhost/pruebas'); // postgres

alumnopg.createTable({name: ['$string'],lastname: ['$string']}).save();

alumnopg.insert({
  name:'Reynaldo',
  lastname:'Pereira'
}).save();
*/

Meteor.startup(() => {
  // code to run on server at startup

  /* insersion de prueba materias*/
  if(materias.find().count()===0){
    var sampleMaterias = [
      {
        name : "CALCULO I",
        sigla : "MAT-100"
      },
      {
        name : "CALCULO II",
        sigla : "MAT-200"
      },
      {
        name : "CALCULO III",
        sigla : "MAT-300"
      },
      {
        name : "FISICA I",
        sigla : "FIS-100"
      }
    ];
    _.each(sampleMaterias,function(dat){
      materias.insert(dat);
    });
  }

  if(alumno.find().count()===0){
    var sampleAlumnos = [
      {
        name : "Reynaldo",
        lastName : "Pereira"
      },
      {
        name : "Daner",
        lastName : "castillo"
      },
      {
        name : "Flec",
        lastName : "Esponja"
      },
      {
        name : "Aguida",
        lastName : "Paucara"
      }
    ];
    _.each(sampleAlumnos,function(dat){
      alumno.insert(dat);
    });
  }

  if(docentes.find().count()===0){
    var sampleDocentes = [
      {
        nombre : "Alfredo",
        paterno : "Peñaranda",
        materno : "Loza"
      },
      {
        nombre : "Gabriel",
        paterno : "Rene",
        materno : "Calvo"
      },
      {
        nombre : "Mariscal",
        paterno : "Campo",
        materno : "Isla"
      },
      {
        nombre : "Roberto",
        paterno : "Bohorquez",
        materno : "Ayala"
      }
    ];
    _.each(sampleDocentes,function(dat){
      docentes.insert(dat);
    });
  }
  //console.log(querys.select('select * from alumnos limit 1'));
});


/* todo para postgres desde aqui */
Meteor.methods({
  getAlumnosPg(){
    return querys.select('select * from alumnos limit 1');
  }
});

querys = {
  /* coneccion a postgres npm promised-postgres promesas incorporadas*/
  select1 : function(query){
    ourDbInstance = new Postgres('postgres://postgres:postgres@localhost:5432/jachasun');
    var rollback;

    const promiseREs = Promise.await( 
      ourDbInstance.getNewClient()
        .then( function ( client) {
          rollback = client.roolback;
          return client.begin()
        })
        .then(function(client){
          return client.query(query);
        })
        .then(function(result){
          //console.log(result);
          return result;
        })
        .catch(function(error) {
          console.log(error);
        })
    );
    return promiseREs;
  },

  /* pg con promesas mas estable */
  select :function(query){
    const pool = new Pool({
      connectionString : 'postgres://postgres:postgres@localhost:5432/jachasun'
    });
    return Promise.await(
      pool.connect()
        .then(client => {
          return client.query(query)
          .then(res => {
            client.release()
            return res;
          })
          .catch(e => {
            client.release()
          });
        })
    );
  }
};