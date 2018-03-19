Template.kardexPdf.onCreated(function(){
    this.resKardex = new ReactiveVar([]);
    ru = FlowRouter.getParam('id');
    self = this;
    //console.log(ru);
    self.autorun(function() { 
        Meteor.call('getKardex',ru,true,(error, result) => {
            //console.log(result);
            self.resKardex.set(result.rows);
        });
    });
});

Template.kardexPdf.events({ 
    'click .myButton': function(event, template) {
        var res = Template.instance().resKardex.get();
        b =[];
        res.forEach(function(element){
            a =[];
            a.push(element.materia.toString());
            a.push(element.notafinal.toString());
            b.push(a);
        });

        console.log(b);

        var docDefinition = {
                content: [
                    {
                        image: imagesStatic.logo,
                        alignment: 'lefth',
                        width: 50
                    },
                    {
                        
                        table: {
                            // headers are automatically repeated if the table spans over multiple pages
                            // you can declare how many rows should be treated as headers
                            headerRows: 1,
                            widths: [ '*', '*' ],
                            body: b
                        }
                    }
                ]
            }
        pdfMake.createPdf(docDefinition).getDataUrl(function(data){
            var iframe = '<embed width="100%" height="100%" name="puglin" id="plugin" src="'+ data +'" type="application/pdf" internalinstanceid="10" title>'
            //var iframe = "<iframe width='100%' title='reporte' height='100%' src='" + data + "'></iframe>"
            var x = window.open();
            x.document.open();
            x.document.write(iframe);
            x.document.close();
        });
    } 
});