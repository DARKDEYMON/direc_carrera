import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

SimpleSchema.setDefaultMessages({
    initialLanguage: 'en',
    messages: {
      en: {
        yaProgramado : "Materia ya Programada"
      },
      es: {
        required: '{{label}} es requerido',
      },
    },
});

postulantesba = new Mongo.Collection("postulantesba");

postulantesbaSchema = new SimpleSchema({
    familiar:{
        type: Number,
        label: "Grupo Familiar",
        optional: false,
        autoform:{
            firstOption : '(Seleccione uno)',
        }
    },
    economico:{
        type: Number,
        label: "Ingreso Economico",
        optional: false,
        autoform:{
            firstOption : '(Seleccione uno)',
        }
    },
    procedencia:{
        type: Number,
        label: "Procedencia",
        optional: false,
        autoform:{
            firstOption : '(Seleccione uno)',
        }
    },
    vivienda:{
        type: Number,
        label: "Vivienda Familiar",
        optional: false,
        autoform:{
            firstOption : '(Seleccione uno)',
        }
    },
    observacion:{
        type: String,
        label: "Observaciones por parte de la comicion",
        optional: true
    },
    estado:{
        type: String,
        label: "Calificacion",
        optional: false,
        autoform:{
            firstOption : "(Seleccione uno)",
            options:function(){
                return [{label:"ACEPTADO (BECA PARCIAL)",value:"P"},{label:"RECHAZADO",value:'R'}];
            }
        }
    }
},{tracker: Tracker});

postulantesba.attachSchema(postulantesbaSchema);