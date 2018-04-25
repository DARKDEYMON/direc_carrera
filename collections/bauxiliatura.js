import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

SimpleSchema.setDefaultMessages({
    initialLanguage: 'en',
    messages: {
        en: {
            required: '{{label}} es requerido',
            yaExisteRegistro : "Ya existe el registro"
        },
        es: {
            required: '{{label}} es requerido',
            yaExisteRegistro: "Ya existe el registro"
        },
    },
});

postulantesaux = new Mongo.Collection("postulantesaux");

postulantesauxSchema = new SimpleSchema({
    id_alumno:{
        type: String,
        label: "id alumno",
        optional: false
    },
    id_materia:{
        type: String,
        label: "id materia",
        optional: false
    },
    id_gestion:{
        type: String,
        label: "id gestion",
        optional: false
    },
    _nota:{
        type: Number,
        label: "Nota Final",
        optional : false,
        defaultValue: 0
    },
    estado:{
        type: String,
        label: "Estado",
        optional: true,
        autoform:{
            firstOption : "(Seleccione uno)",
            options:function(){
                return [{label:"REGISTRADO",value:"A"},{label:"RECHAZADO",value:'X'}];
            }
        }
    }
},{tracker: Tracker});

postulantesaux.attachSchema(postulantesauxSchema);