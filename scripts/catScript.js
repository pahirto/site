
class Cat{
    constructor(cat){
        this._name = cat.name;
        this._counter = 0;
        this._img = cat.img;
    }

    get counter(){return this._counter;}
    get img(){return this._img;}
    get name(){return this._name;}

    set id(id){this._id = id;}
    get id(){return this._id;}

    set counter(counter){this._counter = counter;}
    set img(img){this._img = img;}
    set name(name){this._name = name;}

    increaseCounter(){this._counter++;}
}

var model = {
    lastId: 0,
    catStock: [],
    provideId: function(){
        ++this.lastId;
        return this.lastId;
    }
};

var octopus = {
    currentCat: null,
    isDisplayedAdmin: false,
    getCats: function(){
        return model.catStock;
    },

    add: function(obj){
        obj.id = model.provideId();
        model.catStock.push(obj);
        console.log("Init -> pushing: " + obj.name + " with img: " + obj.img);
    },
    init: function(){
        menuView.init();
        detailView.init();
        adminView.init();
    },
    displayAdminWindow: function(){
        if(this.isDisplayedAdmin){
            adminView.hide();
            this.isDisplayedAdmin = false;
        } else {
            if(isRealValue(this.currentCat)){
                adminView.render(this.currentCat);
                this.isDisplayedAdmin = true;
            } else{
                alert("Cat has not been chosen");
            }
        }
    },
    displayCat: function(cat){
        detailView.cleanDetailView();
        if(!isRealValue(this.currentCat) || this.currentCat !== cat){
            this.currentCat = cat;
            detailView.render(cat);
            if(this.isDisplayedAdmin)
                adminView.render(cat);
        } else {
            this.currentCat = null;
            adminView.hide();
            this.isDisplayedAdmin = false;
        }
    },
    adminSubmitButtonPressed: function(){
        var input = adminView.getValuesInForm();
        console.log("input name: " + input.name);
        if(input.name) this.currentCat.name = input.name;
        if(input.click) this.currentCat.counter = input.click;
        if(input.img) this.currentCat.img = input.img;
        console.log("New cat: " + this.currentCat.name);

        adminView.render(this.currentCat);
        menuView.init();
        detailView.cleanDetailView();
        detailView.render(this.currentCat);
    }
};

var adminView = {
    init: function(){
        var adminButton = document.getElementById("adminButton");
        adminButton.addEventListener("click", function(){octopus.displayAdminWindow();}, false);
        this.content = document.getElementById("admin-content");

        // var submitButton = document.getElementById("submit-button");
        // submitButton.addEventListener("click", function(){octopus.adminSubmitButtonPressed();}, false);
    },
    render: function(cat){
        this.content.style.display = "";
        var formHeading = document.getElementById("form-cat-name");
        formHeading.textContent = "Setting of " + cat.name;
    },
    hide: function(){
        this.content.style.display = "none";
    },
    getValuesInForm: function(){
        var name = document.getElementById("form-name-input");
        var stringName = name.value;
        name.value = "";
        var clicksNum = document.getElementById("form-click-input");
        var stringClick = clicksNum.value;
        clicksNum.value = "";
        var img = document.getElementById("form-img-input");
        var stringImg = img.value;
        img.value = "";
        return {name: stringName, click: stringClick, img: stringImg};
    }
    
};

var menuView = {
    init: function(){
        var cats = octopus.getCats();
        var menu = document.getElementById("menu");
        clearElement(menu);
        console.log("catStock: " + cats);
        cats.forEach(function(element) {
            var curButton = document.createElement("button"); //maybe problem with var
            curButton.id = "button" + element.id;
            curButton.className = "button";
            curButton.textContent = element.name;
            curButton.addEventListener("click", 
                                        function(){octopus.displayCat(element);}, 
                                        false);
            menu.appendChild(curButton);
        });
    }
};

var detailView = {
    init: function(){
        this.detail = document.getElementById("detail");
    },
    cleanDetailView: function(){
        clearElement(this.detail);
    },
    render: function(element){
       
        console.log(element);
        
        var name = document.createElement("h3");
        name.textContent = element.name;

        var counter = document.createElement("p");
        counter.id = "counter" + element.id;
        counter.textContent = element.counter;

        var img = document.createElement("img");
        img.id = "image" + element.id;
        img.src = element.img;
        img.className = "img";
        img.addEventListener("click", function(){increaseCounter({cat: element, counterId: counter.id});}, false);

        this.detail.appendChild(name);
        this.detail.appendChild(counter);
        this.detail.appendChild(img);
        
    }
};

function isRealValue(obj){
 return obj && obj !== 'null' && obj !== 'undefined';
}

function increaseCounter(obj){
    obj.cat.increaseCounter();
    var counter = document.getElementById(obj.counterId);
    if(!counter) console.log("Cannot find counter with id: " + obj.counterId);
    counter.textContent = obj.cat.counter;
}

function clearElement(element){
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function init(){
    octopus.add(new Cat({name: "Cat1", img:"source/cat_picture1.jpg"}));
    octopus.add(new Cat({name: "Cat2", img:"source/cat_picture2.jpeg"}));
    octopus.add(new Cat({name: "Cat3", img:"source/cat_picture3.jpeg"}));
    octopus.add(new Cat({name: "Cat4", img:"source/cat_picture4.jpeg"}));
    octopus.add(new Cat({name: "Cat5", img:"source/cat_picture5.jpeg"}));
}


init();
octopus.init();