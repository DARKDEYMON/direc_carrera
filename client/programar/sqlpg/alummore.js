
Template.alummore.onCreated(function(){
    this.more = new ReactiveVar(10);
    this.search = new ReactiveVar('');
    self = this;
    //this.search="";
    self.autorun(function() {
        //console.log(self.more.get());
        //console.log('param1');
        if(self.search.get()==''){
            self.subscribe('uatfdatPage',1,self.more.get());
            //console.log('param2');
        }
        else{
            self.subscribe('uatfdatPageSearch',0,self.more.get(),self.search.get());
            //console.log('param3');
        }
    });
});

Template.alummore.helpers({
    alum: function() {
      return uatfdat.find({});  
    }
});

Template.alummore.events({ 
    'click .dispmore' : function(event, template) {
        res = Template.instance().more.get();
        Template.instance().more.set(res + 10);
        //console.log(res);
    },
    'keyup .search' : function(event, template){
        search = event.target.value.trim();
        //console.log(event.target.value.trim());
        Template.instance().search.set(search);
        Template.instance().more.set(10);
    },
    'click .thismore' : function(event, template){
        console.log(this);
    }
});