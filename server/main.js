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

/* publicaciones  solo si se quita autopublish */
Meteor.publish('designacionDct',function(){
  return designacionDct.find({});
});
Meteor.publish('progra',function(){
  return progra.find({});
});
Meteor.publish('materias',function(){
  return materias.find({});
});
Meteor.publish('docentes',function(){
  return docentes.find({});
});
Meteor.publish('alumno',function(){
  return alumno.find({});
});
Meteor.publish('uatfdat',function(){
  return uatfdat.find({});
});
//para paginar --
Meteor.publish('uatfdatPage',function(pageNumber,nPerPage){
  return uatfdat.find({},{skip:pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0,limit : nPerPage });
});
Meteor.publish('uatfdatPageSearch',function(pageNumber,nPerPage,search){
  reg = new RegExp(search.toLocaleUpperCase());
  // /.*CARLA.*/
  return uatfdat.find({nombres:reg},{skip:pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0,limit : nPerPage});
});
//para paginar --
// consulta join coleccion, columna q contiene el dato para join, nombre de la columna nueva para el join, nombre en array de los datos a mostrar
// progra.join(materias,'materias_id','materia',['name']);

/*starup de meteor */
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

  /* prubas para migracion */
  /*
  if(uatfdat.find().count()===0){
    res = querys.select('select * from uatf_datos limit 5000');
    _.each(res.rows,function(datu){
      console.log(datu.paterno);
      uatfdat.insert({
        id_ra : datu.id_ra,
        paterno : datu.paterno,
        materno : datu.materno,
        nombres : datu.nombres,
        id_sexo : datu.id_sexo
      });
    });
  }
  */
  // hasta aqui

});


/* todo para postgres desde aqui */
Meteor.methods({
  /* !ofi */
  getAlumnosPgLimit(limit){
    return querys.select("select DISTINCT on (uatf_datos.id_ra) * from uatf_datos \
                          INNER JOIN alumnos ON (alumnos.id_ra = uatf_datos.id_ra)  where id_programa='SIS' limit "+limit)
  },
  getAlumnosPgLimitRu(ru,limit){
    return querys.select("select DISTINCT on (uatf_datos.id_ra) * from uatf_datos INNER JOIN \
                          alumnos ON (alumnos.id_ra = uatf_datos.id_ra)  where id_programa='SIS' \
                          and cast(id_alumno as TEXT) like '%"+ ru +"%' limit "+limit)
  },

  getMateriasProgra(ru,gestion,periodo){
    return querys.select("select * from consola.generar_programacion_completa("+ru+","+gestion+","+periodo+",0)");
  },
  getMateriasReprogramacion(ru,gestion,periodo){
    return querys.select("select * from consola.generar_programacion_completa_reprogramacion2("+ru+","+gestion+","+periodo+")");
  },
  /* -ofi */
  getAlumnosPg(){
    return querys.select("select DISTINCT on (uatf_datos.id_ra) * from uatf_datos INNER JOIN alumnos ON (alumnos.id_ra = uatf_datos.id_ra)  where id_programa='SIS'");
  },
  getAlumnosPgAlum(alum){
    //console.log(alum);
    alum = alum.toUpperCase();
    alum = alum.replace(' ','%');
    //console.log("select DISTINCT on (uatf_datos.id_ra) * from uatf_datos INNER JOIN alumnos ON (alumnos.id_ra = uatf_datos.id_ra) where id_programa='SIS' and (nombres||' '||paterno||' '||materno||' '||id_alumno) ILIKE '%"+alum+"%';");

    return querys.select("select DISTINCT on (uatf_datos.id_ra) * from uatf_datos INNER JOIN alumnos ON (alumnos.id_ra = uatf_datos.id_ra) where id_programa='SIS' and (nombres||' '||paterno||' '||materno||' '||id_alumno) ILIKE '%"+alum+"%';");
  },
  getDocentes(){
    return querys.select("select * from docentes where id_programa='SIS' AND estado='A';");
  },
  getKardex(ru,apro){
    add2 = " and iff(notas.nota_ex_mesa>50,notas.nota_ex_mesa,iff(notas.nota_2da>50,notas.nota_2da,notas.nota)) >50";
    add1 ="SELECT notas.id_gestion, notas.id_periodo, uatf_datos.nro_dip, \
    uatf_datos.paterno, uatf_datos.materno, uatf_datos.nombres, \
    alumnos.id_programa, pln_materias.sigla, pln_materias.materia,alumnos.id_alumno, \
    notas.nota, notas.nota_2da,notas.nota_ex_mesa, notas.observacion, \
    alm_programas.programa,alm_programas_facultades.facultad, \
    iff(notas.nota_ex_mesa>50,notas.nota_ex_mesa,iff(notas.nota_2da>50,notas.nota_2da,notas.nota)) as notafinal \
    FROM uatf_datos,alumnos,notas,pln_materias,alm_programas,alm_programas_facultades \
    WHERE   uatf_datos.id_ra = alumnos.id_ra \
        AND alumnos.id_alumno = notas.id_alumno \
        AND notas.id_materia = pln_materias.id_materia \
        AND alumnos.id_programa = alm_programas.id_programa \
        AND alm_programas.id_facultad = alm_programas_facultades.id_facultad \
        AND alumnos.id_alumno='"+ru+"' \
        AND pln_materias.sigla<>'PRE000' \
        AND pln_materias.mostrarnotas<>false \
          AND notas.observacion<>'C' \
          AND notas.observacion<>'H'"
    if(apro)
      return querys.select(add1)
    else
      return querys.select(add1 + add2)
  }
});

/* querys a db postgres */
querys = {
  /* coneccion a postgres npm promised-postgres promesas incorporadas*/
  select1 : function(query){
    ourDbInstance = new Postgres('postgres://postgres:postgres@localhost:5432/jachasun');
    var rollback;

    const promiseREs = Promise.await(
      ourDbInstance.getNewClient()
        .then(function(client) {
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
      /* aqui db ofi */
      connectionString : 'postgres://postgres:postgres@localhost:5432/jachasun'
    });
    return Promise.await(
      pool.connect()
        .then(client => {
          return client.query(query)
          .then(res => {
            client.release();
            return res;
          })  
          .catch(e => {
            client.release()
          });
        })
    );
  },
  /* con otro server prueba de guardado */
  insert :function(query){
    const pool = new Pool({
      connectionString : 'postgres://postgres:123456789@localhost:5431/pruebas'
    });
    return Promise.await(
      pool.connect()
        .then(client => {
          return client.query(query)
          .then(res => {
            client.release()
            //console.log(res);
            return res;
          })
          .catch(e => {
            client.release()
          });
        })
    );
  },
  delete :function(query){
    const pool = new Pool({
      connectionString : 'postgres://postgres:123456789@localhost:5431/pruebas'
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


/* parte de seguridad para insecure desde aqui */
progra.allow({
  insert: function(userId, doc) {
      //console.log(doc);
      return true; 
  }, 
  update: function() {
      return true; 
  }, 
  remove: function(userId, doc) {
      //console.log(doc);
      querys.insert("delete from progra where _id='"+ doc._id +"'")
      return true;
  } 
});

designacionDct.allow({
  insert: function(userId, doc) {
    //console.log(doc);
    return true;
  }, 
  update: function() {
    return true;
  }, 
  remove: function() {
    return true;
  } 
});

/* before mongo */
progra.before.insert(function(userId, doc){
  //console.log(doc);
  res = querys.insert("insert into progra values('"+ doc._id +"','"+ doc.alumno_id +"','"+ doc.metodo_programacion +"','"+ doc.materias_id +"','"+ doc.dateInsert +"')");
  //console.log(res.rows);
});