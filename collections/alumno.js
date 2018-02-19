import SimpleSchema from 'simpl-schema';

alumno = new Mongo.Collection("alumno");

/* coleccion de prueba alumno */

alumnoShema = new SimpleSchema({
    name : {
        type : String,
        label : "NOMBRE",
        max : 30
    },
    lastName : {
        type : String,
        label : "APELLIDO",
        max : 30
    }
});

alumno.attachSchema(alumnoShema);

import { Index, MinimongoEngine } from 'meteor/easy:search'

alumnoIndex = new Index({
    collection: alumno,
    fields: ['name','lastName'],
    engine: new MinimongoEngine(),
});