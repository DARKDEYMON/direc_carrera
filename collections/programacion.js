import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

progra = new Mongo.Collection("progra");

prograShema = new SimpleSchema({
    alumno_id :{
        type : String,
        label : "ID DE ALUMNO",
        regEx: SimpleSchema.RegEx.Id,
        optional: false
    },
    materias_id :{
        type : String,
        label : "MATERIAS",
        regEx: SimpleSchema.RegEx.Id,
        optional: false,
        autoform: {
            firstOption : '(Seleccione una materia)',
        }
    }
},{tracker: Tracker});

progra.attachSchema(prograShema);