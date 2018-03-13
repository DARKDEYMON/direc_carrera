import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

programas = new Mongo.Collection("programas");

programasSchema = new SimpleSchema({
    id_programa : {
        type : String,
        label : 'ID de programa',
        optional : false
    },
    programa : {
        type : String,
        label : 'Programa',
        optional : false
    },
    titulo : {
        type : String,
        label : 'Titulo',
        optional : false
    },
    activo : {
        type : String,
        label : 'Activo',
        optional : false,
        max : 1
    },
    fec_creacion : {
        type : String,
        label : 'Fecha de Creacion',
        optional : false
    },
    tipo : {
        type : String,
        label : 'Tipo',
        optional : false,
        max : 1
    },
    direccion : {
        type : String,
        label : 'Direccion',
        optional : true
    },
});

programas.attachSchema(programasSchema);