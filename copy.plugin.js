;(function($){
  
  var defaults={
    "maximum" :"5",
    "copyfrom" : "row",
    "custommessage" : "Maximum Number Exceed",
    "dynamicname"   : true,
    "removeclass"   : "delete",
    "parentclass"   : "parent"
  };


  function CopyRow(element,options)
  {
    
    this.config=$.extend({},defaults,options);
    this.rowclassname='.'+this.config.copyfrom;
    this.parentrow=this.config.parentclass;
    this.element=element.closest('.'+this.parentrow).find(this.rowclassname).first();
    this.button=element;
    this.totalindex=$(this.rowclassname).length+1;
    this.getindex=$(this.button).closest('.'+this.parentrow).find('>*:not(.'+this.parentrow+')'+this.rowclassname).length;
    this.specialclass='__remove';
    
     
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
                                   
                    newname=$(element).attr(attribute)+this.totalindex;
                    newname=newname.split("_");
                  
                    namelength=newname.length;
                     
                    if(namelength>1)
                    {
                        
                         
                                     
                        newname[namelength] = String(this.getindex);
                        
                        newname=newname.join("_");
                       
                       
                        
                        
                        
                    }
                    else
                    {
                        
                       newname=$(element).attr(attribute)+this.totalindex+'_'+this.getindex;
                    
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
        
      var currentElm=this.element.clone(true, true);
      currentElm.find("."+this.specialclass).remove();
      
     
      
      //currentElm.find('.'+lastbutton).attr({"class":this.config.removeclass,"value":"-"});
   
         
        $("<input/>",{
            value : "-",
            type  : "button",
            "class" : this.config.removeclass
            
        }).insertAfter(currentElm.find('.'+lastbutton)).addClass(this.specialclass);
        
        
       
    
    
       
       
    
      
     
        if(this.config.dynamicname==true)
        {
                
                
                $(currentElm).find("input[type='text'],select,checkbox").each(function(){
                    
                 
                    newname=$self.dynamicAttribute("name",this);
                    $(this).attr("name",newname);
                        
                    newid=$self.dynamicAttribute("id",this);
                    $(this).attr("id",newid);
                    
                    
                    
                    
                   
                    
                    
                    
                });
        }
  
        
       

      $(currentElm).find(this.rowclassname).each(function(){
        
            $(this).addClass($self.specialclass);
       })
    
            

        var attributes=this.getAttributes(currentElm);
        attributes['html'] = currentElm.html();
       
        
        
         var obj=$("<"+$(currentElm).get(0).tagName+"/>",attributes).on("click","."+this.config.removeclass,function(){
            
            $(this).closest($self.rowclassname).remove();             
        }).addClass(this.specialclass);
        
           
         $(obj).appendTo($(this.button).closest('.'+this.parentrow));
          
        
           
           
      
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