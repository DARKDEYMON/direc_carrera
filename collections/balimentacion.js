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

postulantesba = new Mongo.Collection("postulantesba");

postulantesbaSchema = new SimpleSchema({
    id_alumno:{
        type: Number,
        label: "R. U.",
        optional: false
    },
    id_gestion:{
        type: Number,
        label: "Gestion",
        optional: false
    },
    id_periodo:{
        type: Number,
        label:"Periodo",
        optional: false
    },
    familiar:{
        type: Number,
        label: "Grupo Familiar",
        optional: false,
        autoform:{
            firstOption : '(Seleccione uno)',
        },
        custom : function(){
            modifi = this.obj;
            if(!(postulantesba.find({ id_alumno:modifi.id_alumno, id_gestion:modifi.id_gestion }).count()===0)){
                return "yaExisteRegistro";
            }
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
    vivienda_familiar:{
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
    },
    sit_social:{
        type: Number,
        label: "P. Social",
        optional: true
    },
    sit_acad:{
        type: Number,
        label:"S. Academica",
        optional: true
    },
    _isbeca:{
        type: String,
        label: "isbeca",
        optional: false,
        //defaultValue: "S",
        autoValue:function(){
            if(this.field("estado").value===undefined)
                return;
            if(this.field("estado").value==='P')
                return 'S';
            else
                return 'N';
        }
    },
    tipo_beca:{
        type: String,
        label: "Tipo beca",
        optional: false,
        //defaultValue: "P",
        autoValue:function(){
            if(this.field("estado").value===undefined)
                return;
            if(this.field("estado").value==='P')
                return 'S';
            else
                return 'N';
        }
    }
},{tracker: Tracker});

postulantesba.attachSchema(postulantesbaSchema);