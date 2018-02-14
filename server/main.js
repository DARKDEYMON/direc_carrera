import { Meteor } from 'meteor/meteor';
/*
alumnopg = new SQL.Collection('alumno','postgres://postgres:123456789@localhost/pruebas'); // postgres

alumnopg.createTable({name: ['$string'],lastname: ['$string']}).save();

alumnopg.insert({
  name:'Reynaldo',
  lastname:'Pereira'
}).save();
*/

/*
a = new pg.Client({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'pruebas',
  password: '123456789',
  port: 5432
});

a.connect();

a.query('select * from alumno', (err, res) => {
  console.log(err, res)
  a.end()
});
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
    var sampleMaterias = [
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
    _.each(sampleMaterias,function(dat){
      alumno.insert(dat);
    });
  }
});