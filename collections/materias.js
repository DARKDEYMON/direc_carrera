import SimpleSchema from 'simpl-schema';

/* coleccion de prueba para materias */
materias = new Mongo.Collection("materias");

materiasSchema = new SimpleSchema({
    name : {
        type : String,
        label : "NOMBRE DE MATERIA",
        max : 100
    },
    sigla : {
        type : String,
        label : "Sigla",
        max : 20
    }
});

materias.attachSchema(materiasSchema);