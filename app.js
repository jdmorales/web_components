function template(person){
    var link = document.querySelector('link[rel="import"]').import;

    var template = link.querySelector('#profileTemplate').content;//document.querySelector('#profileTemplate').content;

    template.querySelector('.name').textContent = person.name;
    template.querySelector('.cell').textContent= person.cell;
    template.querySelector('.last_name').textContent = person.last_name;
    template.querySelector('.email').textContent = person.email;
    //var wrapperImg=template.querySelector('wrapper-img');
    var img=template.querySelector('img');
    //var htmlSpinner='<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>';
    img.src= person.photo;
    
    img.onload=function(){
      //var spinner=template.querySelector('i.fa');
      //spinner.style.display="none";
    }
    

    var clone = document.importNode(template, true); //Creates a copy of a node (node_template,deeps)

    //document.body.appendChild(clone);
    return clone;
}

function customElement(){
    var userProfileProto = Object.create(HTMLElement.prototype);

    userProfileProto.init = function(name,last_name,company) {
        var element = template(name,last_name,company);
        //this.appendChild(element);
        this.createShadowRoot().appendChild(element);
    };

    /*
     userProfileProto.attributeChangedCallback=function(name,oldVal,newVal){
     console.log(name);
     console.log(newVal);
     };
     */

    var userProfile = document.registerElement('user-profile', {
        prototype: userProfileProto
    });
}


function appendElement(person){
    var userPr = document.createElement('user-profile');
    userPr.init(person);
    document.body.appendChild(userPr);
}

function Model(){
    /*
    var people=[
        {
            name: "john",
            last_name:"morales",
            email:"john@rockalabs.com"
        },
        {
            name: "sergio",
            last_name:"florez",
            email:"sergio@rockalabs.com"
        }
    ];
    */
    
    var numPeople=50;
    
    for (i = 0; i < numPeople; i++) {
        $.ajax({
              url: 'https://randomuser.me/api/?inc=email,phone,gender,name,picture,cell',
              dataType: 'json',
              success: function(data){
                var result=data.results[0];
                var person={
                    name: result.name.first,
                    last_name: result.name.last,
                    email: result.email,
                    cell:result.cell,
                    photo:result.picture.large,
                }
                //console.log(person);
                appendElement(person);
              }
        });
    }
}

window.onload=function(){
    //template("John","Morales","john@rockalabs.com");
    //template("Sergio","Florez","sergio@rockalabs.com");
    customElement();
    Model();
    
    /*
     var userPr = document.createElement('user-profile');
     userPr.init("John","Morales","john@rockalabs.com");
     document.body.appendChild(userPr);
     */
};