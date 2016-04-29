function template(Name,Last_Name,Email){
    var link = document.querySelector('link[rel="import"]').import;
    console.log();

    var template = link.querySelector('#profileTemplate').content;//document.querySelector('#profileTemplate').content;

    template.querySelector('.name').textContent = Name;
    template.querySelector('.last_name').textContent = Last_Name;
    template.querySelector('.email').textContent = Email;

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

function Model(){
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
    
    $.ajax({
      url: 'http://api.randomuser.me/?results=50',
      dataType: 'json',
      success: function(data){
        console.log(data);
      }
    });

    for (i = 0; i < people.length; i++) {
        var userPr = document.createElement('user-profile');
        userPr.init(people[i].name,people[i].last_name,people[i].email);
        document.body.appendChild(userPr);
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