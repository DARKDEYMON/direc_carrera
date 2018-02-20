import SimpleSchema from 'simpl-schema';

alumno = new Mongo.Collection("alumno");

/* coleccion de prueba alumno */

alumnoShema = new SimpleSchema({
    /* de prueba */
    name : {
        type : String,
        label : "Nombre",
        max : 30
    },
    lastName : {
        type : String,
        label : "Apellido",
        max : 30
    },
    /* de prueba */
    /*
    id_ra : {
        type : String,
        label : "id ra",
    },
    fecInscripcion : {
        type : Date,
        label : "Fecha de Inscipcion", 
    },
    fecEgreso : {
        type : Date,
        label : "Fecha de Egreso",
    },
    plan_id : {
        type : String,
        label : "Plan"
    },
    grado_id : {
        type : String,
        label : "Grado",
        max : 1
    },
    id_tipo_aprobacion_bk : {
        type : Number,
        label : "tipo de Aprobacion"
    },
    estado : {
        type : String,
        label : "Estado",
        max : 1
    },
    tipo_alumno : {
        type : String,
        label : "Tipo de Alumno",
        max : 1
    },
    observacion : {
        type : String,
        label : "Observacion",
    },
    ult_usuario : {
        type : String,
        label : "Ultimo Usuario",
    },
    clave_cert : {
        type : String,
        label : "Clave de Certificado"
    },
    carrera : {
        type : Number,
        label :"Carerra"
    },
    reprogramar : {
        type : String,
        label :"Reprogramar",
        max : 1
    },
    tipo_aprobacion_id : {
        type : Number,
        label : "Id de Aprobacion"
    },
    fec_anulacion : {
        type : Date,
        label : "Fecha de Anulacion"
    },
    id_usuario_r : {
        type : String,
        label : "quien registro"
    },
    bloqueado : {
        type : String,
        label : "Bloqueado",
        max : 1
    }
    */
});

alumno.attachSchema(alumnoShema);

import { Index, MinimongoEngine } from 'meteor/easy:search'

alumnoIndex = new Index({
    collection: alumno,
    fields: ['name','lastName'],
    engine: new MinimongoEngine(),
});