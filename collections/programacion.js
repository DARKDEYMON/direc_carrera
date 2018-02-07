import SimpleSchema from 'simpl-schema';

progra = new Mongo.Collection("progra");

prograShema = new SimpleSchema({
    alumno_id :{
        type : String,
        label : "ID DE ALUMNO",
        regEx: SimpleSchema.RegEx.Id
    },
    materias_id :{
        type : String,
        label : "MATERIAS",
        regEx: SimpleSchema.RegEx.Id
    }
});

progra.attachSchema(prograShema);