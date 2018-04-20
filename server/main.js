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
  //los sis cambian en produccion
  getAlumnosPgLimit(limit,progra){
    return querys.select("select DISTINCT on (uatf_datos.id_ra) * from uatf_datos \
                          INNER JOIN alumnos ON (alumnos.id_ra = uatf_datos.id_ra)  where id_programa='"+ progra +"' limit "+limit)
  },
  getAlumnosPgLimitRu(ru,limit,progra){
    /*
    select DISTINCT on (u.id_ra) * from uatf_datos u INNER JOIN 
    alumnos ON (alumnos.id_ra = u.id_ra)  where id_programa='SIS' 
    and concat(u.nombres||' '||u.paterno||' '||u.materno) like '%REYNALDO%PEREIRA%HEREDIA%'
    */
    return querys.select("select DISTINCT on (uatf_datos.id_ra) * from uatf_datos INNER JOIN \
                          alumnos ON (alumnos.id_ra = uatf_datos.id_ra)  where id_programa='"+ progra +"' \
                          and cast(id_alumno as TEXT) like '%"+ ru +"%' limit "+limit)
  },
  //no en uso aun
  getMateriasProgra(ru,gestion,periodo){
    return querys.select("select * from consola.generar_programacion_completa("+ru+","+gestion+","+periodo+",0)");
  },
  getMateriasReprogramacion(ru,gestion,periodo){
    return querys.select("select * from consola.generar_programacion_completa_reprogramacion2("+ru+","+gestion+","+periodo+")");
  },
  getMateria(id){
    //console.log("Aqui el id"+id);
    return querys.select("select * from pln_materias where id_materia="+id);
  },
  getCertiValid(ru,clave){
    return querys.select("SELECT * from consola.estudianteloginkey("+ru+",'"+clave+"')");
  },
  //verificar esto
  getGruposMateria(idMateria,gestion,periodo){
    return querys.select("SELECT count(*) as grupos FROM pln_materias m, dct_asignaciones a where m.id_materia=a.id_materia and m.id_materia="+ idMateria +" and id_gestion="+ gestion +" and id_periodo="+ periodo)
  },
  getMateriasFaltantes(malla,ru,progra){
    return querys.select("select * from consola._grafica_materias("+ malla +",'"+ progra +"') \
                             where r_id_materia not in(select r_id_materia from consola._grafica_materias_estado_completo("+ ru +","+ malla +",'"+ progra +"'))")
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
  },
  getPensun(ru){
    return querys.select("SELECT pln_materias.nivel_academico ,notas.id_gestion, notas.id_periodo, uatf_datos.nro_dip, \
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
        AND alumnos.id_alumno='"+ ru +"'\
        AND pln_materias.sigla<>'PRE000' \
        AND pln_materias.mostrarnotas<>false \
          AND notas.observacion<>'C' \
          AND notas.observacion<>'H' and iff(notas.nota_ex_mesa>50,notas.nota_ex_mesa,iff(notas.nota_2da>50,notas.nota_2da,notas.nota)) >50 order by pln_materias.nivel_academico")
  },
  getRanking(ru){
    return querys.select("select n.id_materia,m.sigla,m.materia,n.nota,n.nota_2da,n.id_gestion,n.id_periodo,consola._materia_ranking("+ru+",n.id_materia,n.id_gestion,n.id_periodo) from notas_planilla n \
                            left join pln_materias m \
                              on m.id_materia=n.id_materia \
                          where n.id_alumno="+ru+" and (n.nota>=51 or n.nota_2da>=51) and m.sigla<>'PRE000' \
                          order by n.id_gestion,n.id_periodo");
  },
  getAlumPlan(ru){
    return querys.select("SELECT id_plan FROM alumnos WHERE id_alumno="+ru);
  },
  getCanPlanes(progra){
    return querys.select("select * from consola.director_planes_cantidades('"+ progra +"') order by r_id_plan desc");
  },
  getVeriFechaLimiteProEspecial(gest,peri,progra){
    return querys.select("select * from consola.verificarfechaprogramacionespecial('"+ progra +"',"+gest+","+peri+")");
  },
  getMallaCurricular(idplan, progra){
    return querys.select("select m.sigla::character varying,m.materia::character varying,m.hrs_teoricas::integer,m.hrs_practicas::integer,m.hrs_laboratorio::integer,m.nivel_academico::integer,m.ciclo::integer,p.id_materia_eqv::integer, array_agg((select sigla from pln_materias where id_materia=p2.id_materia_ant and p2.tipo<>'C')::character varying) as requisitos from planes p \
            left join planes p2 \
              on p.id_materia_eqv=p2.id_materia_eqv and p.id_plan=p2.id_plan and p.id_programa=p2.id_programa \
            left join pln_materias m \
              on m.id_materia=p.id_materia_eqv \
            where p.id_plan="+ idplan +" and p.id_programa='"+progra+"' and p.id_materia_ant=p.id_materia_eqv and p.tipo='P' and p2.tipo!='P' and m.id_dpto='1' \
            group by m.sigla,m.materia,m.hrs_teoricas,m.hrs_practicas,m.hrs_laboratorio,m.nivel_academico,m.ciclo,p.id_materia_eqv \
            order by nivel_academico,sigla;");
  },
  getProgramas(){
    return querys.select("select id_programa,programa from alm_programas where activo='A';");
  },
  //Estadisticas
  getMejorEstudiante(progra,gestion,periodo){
    return querys.select("select * from consola.director_mejores_alumno('"+ progra +"',"+ gestion +","+ periodo  +",10);")
  },
  getMatriculadosCant(progra, gestion, periodo){
    return querys.select("select coalesce(count(*),0) as can from consola.director_lista_matriculados('"+ progra +"',"+ gestion +","+ periodo +");");
  },
  getMatriculados(progra, gestion, periodo, limit,ru){
    if(ru===''){
      return querys.select("select * from consola.director_lista_matriculados('"+ progra +"',"+ gestion +","+ periodo +") limit " + limit);
    }else{
      return querys.select("select * from consola.director_lista_matriculados('"+ progra +"',"+ gestion +","+ periodo +") where r_id_alumno::Text like'%"+ ru +"%' limit " + limit);
    }
  },
  getProgramaciones(progra, gestion, periodo, limit, ru){
    if(ru===''){
      return querys.select("select r_nro_dip,r_id_alumno,r_paterno,r_materno,r_nombres,array_length(r_programacion,1) as \
        r_cantidad, array_to_json(r_programacion) as r_materias from consola.director_lista_programaciones('"+ progra +"',"+ gestion +","+ periodo +") limit "+limit)
    }else{
      return querys.select("select r_nro_dip,r_id_alumno,r_paterno,r_materno,r_nombres,array_length(r_programacion,1) as \
        r_cantidad, array_to_json(r_programacion) as r_materias from consola.director_lista_programaciones('"+ progra +"',"+ gestion +","+ periodo +") where r_id_alumno::Text like'%"+ ru +"%' limit "+limit)
    }
  },
  getPromedioEstudiantes(progra, gestion, periodo, limit, ru){
    if(ru===''){
      return querys.select("select * from consola.director_promedio_estudiantes_('"+ progra +"',"+ gestion +","+ periodo +") limit "+limit)
    }else{
      return querys.select("select * from consola.director_promedio_estudiantes_('"+ progra +"',"+ gestion +","+ periodo +") where r_id_alumno::Text like'%"+ ru +"%' limit "+limit)
    }
  },
  getMateriasEstado(gestion, periodo, progra){
    return querys.select("SELECT (d.paterno||' '||d.materno||' '||d.nombres) as doc ,f.facultad, pr.programa, p.id_materia, m.sigla,m.materia, p.id_grupo, count (p.id_alumno) as total, est.pr1, est.pr2, est.pr3, est.abandono  \
            FROM alm_programaciones p, alumnos a, pln_materias m,alm_programas pr, alm_programas_facultades f, dct_asignaciones asi, docentes d,\
          ( \
            SELECT  \
                id_materia,id_grupo, \
                COUNT(case when pparcial=0 then 1 else null end)as pr1, \
                COUNT(case when sparcial=0 then 1 else null end)as pr2, \
                COUNT(case when tparcial=0 then 1 else null end)as pr3, \
                COUNT(case nota_final when 0 then 1 else null end) as abandono  \
            from ( \
            SELECT DISTINCT m.id_materia, m.sigla, m.materia,a.id_alumno,n.id_grupo as id_grupo,m.nivel_academico,n.pparcial,n.sparcial,n.tparcial, \
                    iff(n.nota > n.nota_2da,n.nota,iff(n.nota_2da > n.nota_ex_mesa,n.nota_2da,n.nota_ex_mesa)) as nota_final  \
                    FROM  alm_programas p,pln_materias m, alumnos a, alm_programaciones n \
                    WHERE p.id_programa  =  a.id_programa \
                    AND   a.id_alumno    =  n.id_alumno    AND   p.id_programa =  a.id_programa \
                    AND   m.id_materia   =  n.id_materia   AND   n.id_periodo  =  "+ periodo +" \
                    AND   n.id_gestion   =  "+ gestion +"  AND   p.id_programa =  '"+ progra +"' \
                    GROUP BY a.id_alumno,m.id_materia, m.sigla,m.materia, n.id_grupo, n.nota,nota_final,m.nivel_academico,n.pparcial,n.sparcial,n.tparcial,n.id_gestion \
                    ORDER BY nota_final ASC) as pr1 group by id_materia, id_grupo  \
          ) as est \
          WHERE d.id_docente=asi.id_docente \
          AND est.id_materia = p.id_materia \
          AND est.id_grupo = p.id_grupo \
          AND a.id_alumno  = p.id_alumno \
            AND m.id_materia = p.id_materia	  \
            AND pr.id_programa =  a.id_programa \
            AND pr.id_facultad =  f.id_facultad	  \
            AND p.id_gestion   =  "+ gestion +" \
            AND p.id_periodo   =  "+ periodo +"	 \
            AND a.id_programa  =  '"+ progra +"'  \
          AND p.id_materia = asi.id_materia \
          AND asi.id_grupo = p.id_grupo \
          AND asi.id_gestion=p.id_gestion and asi.id_periodo=p.id_periodo \
                  AND p.id_materia not in(8021,8022,8023,8024,8025,8026,8027,8028,8029,8030,8031,8032,8033,8034) \
          GROUP BY f.facultad,pr.programa,p.id_materia,m.sigla,m.materia,p.id_grupo,d.nombres,d.paterno,d.materno, est.pr1, est.pr2, est.pr3, est.abandono \
          ORDER BY m.sigla,p.id_grupo;")
  },
  //aqui estoy
  /*
  getMateriasEstado(gestion, periodo, progra){
    return querys.select("SELECT (d.paterno||' '||d.materno||' '||d.nombres) as doc ,f.facultad, pr.programa, p.id_materia, m.sigla,m.materia, p.id_grupo, count (p.id_alumno) as total \
              FROM alm_programaciones p, alumnos a, pln_materias m,alm_programas pr, alm_programas_facultades f, dct_asignaciones asi, docentes d \
            WHERE d.id_docente=asi.id_docente \
            AND a.id_alumno  = p.id_alumno \
              AND m.id_materia = p.id_materia	\
              AND pr.id_programa =  a.id_programa \
              AND pr.id_facultad =  f.id_facultad	 \
              AND p.id_gestion   =  2017 \
              AND p.id_periodo   =  1	\
              AND a.id_programa  =  'SIS' \
            AND p.id_materia = asi.id_materia \
            AND asi.id_grupo = p.id_grupo \
            AND asi.id_gestion=p.id_gestion and asi.id_periodo=p.id_periodo \
                    AND p.id_materia not in(8021,8022,8023,8024,8025,8026,8027,8028,8029,8030,8031,8032,8033,8034) \
            GROUP BY f.facultad,pr.programa,p.id_materia,m.sigla,m.materia,p.id_grupo,d.nombres,d.paterno,d.materno \
            ORDER BY m.sigla,p.id_grupo;")
  },
  getEstadoParciales(progra, gestion, periodo, materia, grupo){
    return querys.select("SELECT \
            id_materia,\
            COUNT(case when pparcial=0 then 1 else null end)as pr1,\
            COUNT(case when sparcial=0 then 1 else null end)as pr2,\
            COUNT(case when tparcial=0 then 1 else null end)as pr3,\
            COUNT(case nota_final when 0 then 1 else null end) as abandono \
        from (\
        SELECT DISTINCT m.id_materia, m.sigla, m.materia,a.id_alumno,n.id_grupo as id_grupo,m.nivel_academico,n.pparcial,n.sparcial,n.tparcial,\
                      iff(n.nota > n.nota_2da,n.nota,iff(n.nota_2da > n.nota_ex_mesa,n.nota_2da,n.nota_ex_mesa)) as nota_final\
                      FROM  alm_programas p,pln_materias m, alumnos a, alm_programaciones n\
                      WHERE p.id_programa  =  a.id_programa\
                      AND   a.id_alumno    =  n.id_alumno    AND   p.id_programa =  a.id_programa\
                      AND   m.id_materia   =  n.id_materia   AND   n.id_periodo  = "+ periodo +" \
                      AND   n.id_gestion   =  "+ gestion +"  AND   p.id_programa =  '"+ progra +"'\
                      AND   m.id_materia   =  "+ materia +"  AND   n.id_grupo    = "+ grupo +"\
                      GROUP BY a.id_alumno,m.id_materia, m.sigla,m.materia, n.id_grupo, n.nota,nota_final,m.nivel_academico,n.pparcial,n.sparcial,n.tparcial\
                      ORDER BY nota_final ASC) as pr1 group by id_materia");
  },*/
  getDocentes(progra, gestion, periodo){
    return querys.select("SELECT DISTINCT (d.paterno||' '||d.materno||' '||d.nombres) as doc , d.ci, d.email, d.telefono_per \
            FROM alm_programaciones p, alumnos a, pln_materias m,alm_programas pr, alm_programas_facultades f, dct_asignaciones asi, docentes d \
          WHERE d.id_docente=asi.id_docente \
          AND a.id_alumno  = p.id_alumno \
            AND m.id_materia = p.id_materia	\
            AND pr.id_programa =  a.id_programa \
            AND pr.id_facultad =  f.id_facultad	 \
            AND p.id_gestion   =  "+ gestion +" \
            AND p.id_periodo   =  "+ periodo +" \
            AND a.id_programa  =  '"+ progra +"' \
          AND p.id_materia = asi.id_materia \
          AND asi.id_grupo = p.id_grupo \
          AND asi.id_gestion=p.id_gestion and asi.id_periodo=p.id_periodo \
                  AND p.id_materia not in(8021,8022,8023,8024,8025,8026,8027,8028,8029,8030,8031,8032,8033,8034) \
          GROUP BY f.facultad,pr.programa,p.id_materia,m.sigla,m.materia,p.id_grupo,d.nombres,d.paterno,d.materno,d.ci,d.email,d.telefono_per")
  },
  //alimentacion
  getPostulantes(progra, gestion){
    return querys.select("SELECT 	\
                utf.nro_dip \
              , bp.id_alumno \
              , trim(trim(utf.paterno || ' ' || utf.materno) || ', ' || utf.nombres) as nombres \
              , f.puntaje AS ps \
              , e.puntaje AS pe \
              , p.puntaje AS pp \
              , vf.puntaje AS pvf \
              , ve.puntaje AS pve \
              , bp.sit_social \
              , (SELECT COUNT(id_materia) FROM notas_planilla \
                WHERE id_alumno = bp.id_alumno AND observacion <> 'C' AND id_gestion > '1993' AND iff(nota_ex_mesa>0,nota_ex_mesa,iff(nota_2da>0,nota_2da,nota))>=51 \
                ) as maprov \
              , (SELECT COUNT(id_materia) FROM notas_planilla \
                WHERE id_alumno = bp.id_alumno AND observacion <> 'C' AND id_gestion > '1993' \
                ) as mtotal \
              , bp.sit_acad \
              , (bp.sit_social + bp.sit_acad) as total \
              , bp.obs \
              , bp.estado \
              , bi.* \
            FROM bc_postulantes bp \
              INNER JOIN alumnos				       alm ON alm.id_alumno = bp.id_alumno \
              INNER JOIN uatf_datos 				       utf ON utf.id_ra     = alm.id_ra \
              INNER JOIN bc_items_becas 				bi ON bi.id_programa = alm.id_programa AND bi.id_gestion = bp.id_gestion AND bi._estado <> 'X' \
              LEFT OUTER JOIN o_bc_puntaje_familiar  			f  ON    f.id_p_fam::integer = bp.familiar::integer		AND  f.id_gestion = bp.id_gestion \
              LEFT OUTER JOIN o_bc_puntaje_economico 			e  ON    e.id_p_eco::integer = bp.economico::integer		AND  e.id_gestion = bp.id_gestion \
              LEFT OUTER JOIN o_bc_puntaje_procedencia 		p  ON    p.id_p_pro::integer = bp.procedencia::integer		AND  p.id_gestion = bp.id_gestion \
              LEFT OUTER JOIN o_bc_puntaje_vivienda_familiar 		vf ON vf.id_p_viv_f::integer = bp.vivienda_familiar::integer	AND vf.id_gestion = bp.id_gestion \
              LEFT OUTER JOIN o_bc_puntaje_vivienda_estudiante 	ve ON ve.id_p_viv_e::integer = bp.vivienda_estudiante::integer	AND ve.id_gestion = bp.id_gestion \
            WHERE \
                alm.id_programa = '"+ progra +"' \
              AND bp.id_gestion  = "+ gestion +" \
              AND bp.tipo_post   = 'A' \
            ORDER BY bp.estado, total DESC, nombres ASC;");
  },
  //indicadores
  inFamiliar(gestion){
    return querys.select("SELECT * FROM o_bc_puntaje_familiar WHERE id_gestion = "+ gestion +" AND _estado <> 'X' ORDER BY puntaje DESC;")
  },
  inEconomico(gestion){
    return querys.select("SELECT * FROM o_bc_puntaje_economico WHERE id_gestion = "+ gestion +" AND _estado <> 'X' ORDER BY puntaje DESC;")
  },
  inProcedencia(gestion){
    return querys.select("SELECT * FROM o_bc_puntaje_procedencia WHERE id_gestion = "+ gestion +" AND _estado <> 'X' ORDER BY puntaje DESC;")
  },
  inVivienda(gestion){
    return querys.select("SELECT * FROM o_bc_puntaje_vivienda_familiar WHERE id_gestion = "+ gestion +" AND _estado <> 'X' ORDER BY puntaje DESC;")
  },
  getDatPersonalesBa(ru,gestion){
    return querys.select("SELECT 		bp.*, \
            pro.id_programa, \
            pro.programa, \
            utf.id_ra, \
            utf.nro_dip, \
            utf.nombres, \
            utf.paterno, \
            utf.materno, \
            utf.fec_nacimiento, \
            utf.id_sexo, \
            per.estado_civil, \
            per.zona, \
            per.direccion, \
            per.telefono, \
            per.tel_per, \
            f.facultad \
            FROM bc_postulantes bp \
              LEFT OUTER JOIN alumnos       alm ON   alm.id_alumno = bp.id_alumno \
              LEFT OUTER JOIN uatf_datos    utf ON       utf.id_ra = alm.id_ra \
              LEFT OUTER JOIN o_bc_persona  per ON       per.id_ra = alm.id_ra \
              LEFT OUTER JOIN alm_programas pro ON pro.id_programa = alm.id_programa \
              LEFT OUTER JOIN alm_programas_facultades f ON f.id_facultad=pro.id_facultad \
              WHERE bp.id_alumno = "+ ru +"   AND \
                bp.tipo_post <> 'I' AND \
                bp.id_gestion = "+ gestion +"   AND \
                  bp._estado <> 'X' LIMIT 1;");
  },
  getAcademicoBa(ru){
    return querys.select("SELECT 	mtr.fec_registro AS ingreso, \
                (date_part('year',now())::integer - date_part('year',mtr.fec_registro)::integer) as permanencia, \
                _getlastmaterias(alm.id_alumno) as materias, \
                _getlastmatricula(alm.id_alumno) as matricula, \
                EdadPorIdRa(alm.id_ra) as edad, \
                binvestigacion.promedio_materias_aprobadas(alm.id_alumno) as avance, \
                _get_anios_becasa(alm.id_alumno) as beneficio \
                FROM alumnos alm \
                INNER JOIN matriculas mtr on mtr.id_alumno = alm.id_alumno \
              WHERE alm.id_alumno = "+ ru +" ORDER BY id_matricula ASC LIMIT 1;");
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
  /*
  getDocentes(){
    return querys.select("select * from docentes where id_programa='SIS' AND estado='A';");
  },
  */
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
  insert :function(query){
    const pool = new Pool({
      connectionString : 'postgres://postgres:postgres@localhost:5432/jachasun'
    });
    return Promise.await(
      pool.connect()
        .then(client => {
          return client.query(query+" RETURNING *")
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
      /* borrar en la base de datos de postgres */
      querys.insert("delete from academico.alm_programaciones where id="+ doc.postgre_id);
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
progra.after.insert(function(userId, doc){
  
  id=doc._id.toString();
  //console.log(id);
  //console.log(progra.find({_id:id}).fetch());
  
  var inser = "insert into academico.alm_programaciones ( \
        id_alumno, \
        id_materia, \
        id_gestion, \
        id_periodo, \
        id_grupo, \
        ult_usuario, \
        estado, \
        metodo_programacion) \
          values("+ doc.alumno_id +","+ doc.materias_id +","+ doc.gestion_id +","+ doc.periodo_id +","+ doc.id_grupo +",'DIR','A','"+ doc.metodo_programacion +"')";
  
  //console.log(inser);
  /* esta funsionara con el insert oficial añade id de postgres*/
  res = querys.insert(inser);
  //res = querys.insert("insert into progra(_id,alumno_id,metodo_programacion,materias_id,dateinsert) values('"+ doc._id +"','"+ doc.alumno_id +"','"+ doc.metodo_programacion +"','"+ doc.materias_id +"','"+ doc.dateInsert +"')");
  //console.log(res)
  id_po = Number(res.rows[0].id)
  
  /*modificacion de prueva */
  // progra.update(id, {$set:{postgre_id: id_po }});

  mat = querys.select("select * from pln_materias where id_materia="+res.rows[0].id_materia);

  progra.update(id, {$set:{postgre_id: id_po, materia_aux: mat.rows[0].materia ,sigla_aux: mat.rows[0].sigla}});
});