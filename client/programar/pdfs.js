
Template.pdfTemplate.events({
	'click .myButton': function() {
		// Define the pdf-document 
		var docDefinition = { 
            content: [
                'My Text',
                {
                    image: imagesStatic.logo,
                    alignment: 'center'
                }
            ] 
        };
		
        // Start the pdf-generation process
        //console.log("pdf");
        
        pdfMake.createPdf(docDefinition).getDataUrl(function(data){
            var iframe = '<embed width="100%" height="100%" name="puglin" id="plugin" src="'+ data +'" type="application/pdf" internalinstanceid="10" title>'
            //var iframe = "<iframe width='100%' title='reporte' height='100%' src='" + data + "'></iframe>"
            var x = window.open();
            x.document.open();
            x.document.write(iframe);
            x.document.close();
        });
        
		//pdfMake.createPdf(docDefinition).open();
	}
});