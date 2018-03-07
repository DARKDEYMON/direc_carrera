import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

uatfdat = new Mongo.Collection("uatfdat");

uatfdatShema = new SimpleSchema({
    id_ra : {
        type : String,
        label : 'RA'
    },
    paterno : {
        type : String,
        label: 'Paternio',
        optional: true
    },
    materno : {
        type : String,
        label : 'Materno',
        optional: true
    },
    nombres : {
        type : String,
        label : 'Nombres'
    },
    id_sexo : {
        type : String,
        label : 'Sexo',
        optional: true
    },
});

uatfdat.attachSchema(uatfdatShema);

import { Index, MinimongoEngine } from 'meteor/easy:search'

uatfdatIndex = new Index({
    collection: uatfdat,
    fields: ['id_ra','paterno','materno','nombres'],
    engine: new MinimongoEngine(),
});