;(function($){
  
  var defaults={
    "maximum" :"5",
    "copyfrom" : "row",
    "custommessage" : "Maximum Number Exceed",
    "dynamicname"   : true,
    "removeclass"   : "delete"
  };


  function CopyRow(element,options)
  {
    
    this.config=$.extend({},defaults,options);
    this.rowclassname='.'+this.config.copyfrom;
    this.element=element.closest(this.rowclassname);
    this.getindex=$(this.rowclassname).length+1;
    this.specialclass='__remove';
    this.button=element;
   
    
    this.init();
    
   

     
    
    
  }
  

  CopyRow.prototype.getAttributes=function(inputelem){
    
       var attributes = {}; 

        if( inputelem.length ) {
            $.each( inputelem[0].attributes, function( index, attr ) {
                            attributes[ attr.name ] = attr.value;
            } ); 
        }

        return attributes;
  };
  
  CopyRow.prototype.dynamicAttribute=function(attribute,element)
  {
               var checkattr=$(element).attr(attribute);
             
               if(checkattr!=undefined && checkattr!='')
               {
               
                    newname=$(element).attr(attribute).split("_");
                    lastvalue=newname.pop();
                    namelength=newname.length;
                     
                    if(namelength>1)
                    {
                        
                       /*if(isNaN(lastvalue)==true)
                       {
                       
                        newname=$(this).attr("name")+'_'+$self.getindex;
                       }  
                       else
                       { */                  
                        newname[namelength-1] = String(this.getindex);
                        newname=newname.join("_");
                       //}
                       
                        
                        
                        
                    }
                    else
                    {
                        
                       newname=$(element).attr(attribute)+'_'+this.getindex;
                    
                    }
               }
             return (newname) ? newname : element ;
    
  }
  
  CopyRow.prototype.init=function()
  {
   
     var lastbutton=$(this.button).attr("class"); 
      $self=this;
  if(this.config.maximum>this.getindex)
  {
       
        
      if(this.element.length>0)
      {
        
      var currentElm=this.element.clone();
      currentElm.find("."+this.specialclass).remove();
      
      currentElm.find('.'+lastbutton).attr({"class":this.config.removeclass,"value":"-"});
      
    
      
       
    
      
     
        if(this.config.dynamicname==true)
        {
                
                
                $(currentElm).find("input[type='text'],select,checkbox").each(function(){
                    
                 
                    newname=$self.dynamicAttribute("name",this);
                    $(this).attr("name",newname);
                        
                    newid=$self.dynamicAttribute("id",this);
                    $(this).attr("id",newid);
                    
                    
                    
                    
                   
                    
                    
                    
                });
        }
  
       

       $(currentElm).children().each(function(){
        
            $(this).addClass($self.specialclass);
       })
    
            

        var attributes=this.getAttributes(currentElm);
        attributes['html'] = currentElm.html();
        
        
         var obj=$("<"+$(currentElm).get(0).tagName+"/>",attributes).on("click","."+this.config.removeclass,function(){
            
            $(this).closest($self.rowclassname).remove();             
        });
        
           
         
            $(this.button).after(obj);
        
        /*$("<"+$(currentElm).get(0).tagName+"/>",attributes).insertAfter(this.rowclassname+':last').on("click","."+this.config.removeclass,function(){
            
            $(this).closest($self.rowclassname).remove();             
        });  */
        
        
        //this.removeRow(currentElm);
       
           
      
      }
      else
      return;
  }
  else
  {
    alert(this.config.custommessage)
  }
      
  };

  $.fn.copyrow=function(options){
    
    
    new CopyRow(this,options);
       
    
  
 };
  
  
  
  }(jQuery));