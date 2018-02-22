import SimpleSchema from 'simpl-schema';

docentes = new Mongo.Collection('docentes');


docenteShema = new SimpleSchema({
    nombre : {
        type : String,
        label : "Nombre",
        max : 100
    },
    paterno : {
        type : String,
        label : "Paterno",
        max : 100
    },
    materno : {
        type : String,
        label : "Materno",
        max : 100
    }
},{tracker : Tracker});

docentes.attachSchema(docenteShema);

import { Index, MinimongoEngine } from 'meteor/easy:search'

docenteIndex = new Index({
    collection: docentes,
    fields: ['nombre','paterno','materno'],
    engine: new MinimongoEngine(),
});