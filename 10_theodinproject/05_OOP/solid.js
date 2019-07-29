// Clean Code: S.O.L.I.D.

/*
    ** Single Responsibility Principle (SRP)
        A class should only have a single responsibility, that is, only changes
        to one part of the software's specification should be able to affect the
        specification of the class.

    ** Open/Closed Principle (OCP)
        Software entities ( classes, modules, functions, etc.) should be open for
        extension, but closed for modification

        Basically states that you should allow users to add new functionalities
        without changing existing code

    ** Liskov Substitution Principle (LSP)
        Objects in a program should be replaceable with instances of their subtypes
        without altering the correctness of that program

    ** Interface Segregation Principle (ISP)
        Clients should not be forced to depend upon interfaces that they do not use.

    ** Dependency Inversion Principle
        High-level modules should not depend on low-level modules. Both should
        depend on abstractions.
        Abstractions should not depend upon details. Details should depend on abstractions.
*/



// Single Responsibility Principle

// bad

class UserSettings {
    constructor(user) {
        this.user = user;
    }

    changeSettings(settings) {
        if(this.verifyCredentials()) {
            //...
        }
    }

    verifyCredentials() {
        //...
    }
}

// good

class UserAuth {
    constructor(user) {
        this.user = user;
    }

    verifyCredentials() {
        //...
    }
}

class UserSettings {
    constructor(user) {
        this.user = user;
        this.auth = new UserAuth(user);
    }

    changeSettings(settings) {
        if(this.auth.verifyCredentials()) {
            //...
        }
    }
}


// Open/Closed Principle

// bad
var iceCreamFlavors = ['chocolate', 'vanulla'];
var iceCreamMaker = {
    makeIceCream(flavor) {
        if( iceCreamFlavors.indexOf(flavor)>-1 ) {
            console.log('Great success. You now have ice cream.')
        } else {
            console.log('Epic fail. No ice cream for you.')
        }
    }
}
export default iceCreamMaker;

// good
var iceCreamFlavors = ['chocolate', 'vanilla'];
var iceCreamMaker = {
    makeIceCream(flavor) {
        if( iceCreamFlavors.indexOf(flavor)>-1 ) {
            console.log('Great success. You now have ice cream.')
        } else {
            console.log('Epic fail. No ice cream for you.')
        }
    }
    addFlavor(flavor) {
        iceCreamFlavors.push(flavor);
    }
}


// Liskov Substitution Principle

// bad

class Rectangle {
    constructor() {
        this.width = 0;
        this.height = 0;
    }

    setColor(color) {
        //..
    }

    render(area) {
        //..
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    setWidth(width) {
        this.width = width;
        this.height = width;
    }

    setHeight(height) {
        this.width = height;
        this.height = height;
    }

    function renderLargeRectangles(rectangles) {
        rectangles.forEach((rectangle) => {
            rectangle.setWidth(4);
            rectangle.setHeight(5);
            const area = rectangle.getArea(); // BAD:: Returns 25 for square. Should be 20.
            rectangle.render(area);
        })
    }
}
const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderLargeRectangles(rectangles);

// good

class Shape {
    setColor(color) {
        //..
    }
    render(area) {
        //..
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}

class Square extends Shape {
    constructor(length) {
        super();
        this.length = length;
    }
    getArea() {
    return this.length * this.length;
    }
}

function  renderLargeShapes(shapes) {
    shapes.forEach((shape) => {
        const area = shape.getArea();
        shape.render(area);
    })
}

const shapes = [new Rectangle(4,5), new Rectangle(4,5), new Square(5)];
renderLargeShapes(shapes);


// Interface Segregation Principle

// bad

class DOMTraverser {
    constructor(settings) {
        this.settings = settings;
        this.setup();
    }

    setup() {
        this.rootNode = this.settings.rootNode;
        this.animationModule.setup();
    }

    traverser() {
        //..
    }
}

const $ = new DOMTraverser({
    rootNode: document.getElementByTagName('body');
    animationModule() {
        // Most of the time, we won't need to animate when traversing
        //...
    }
})

// good

class DOMTraverser {
    constructor(settings) {
        this.settings = settings;
        this.options = settings.options;
        this.setup();
    }

    setup() {
        this.rootNode = this.settings.rootNode;
        this.setupOptions();
    }

    setupOptions() {
        if( this.options.animationModule ) {
            //..
        }
    }

    traverse() {
        //..
    }
}

const $ = new DOMTraverser({
    rootNode: document.getElementByTagName('body'),
    options: {
        animationModule() {}
    }
});

// Dependency Inversion Principle

// bad
class InventoryRequester {
    constructor() {
        this.REQ_METHODS = ['HTTP']
    }

    requestItem(item) {
        //..
    }
}

class InventoryTracker {
    constructor(items) {
        this.items = items;

        // BAD: We have created a dependency on a specific request implementation
        // We should just have requestItems demand on a request method: `request`
        this.requester = new InventoryRequester();
    }

    requestItems() {
        this.items.forEach((item) => {
            this.requester.requestItem(item);
        })
    }
}
const inventoryTracker = new InventoryTracker(['apples', 'bananas']);
inventoryTracker.requestItems();

// good
class InventoryTracker {
    constructor(items, request) {
        this.items = items;
        this.requester = requester;
    }
    requesterItems() {
        this.items.forEach((item) => {
            this.requester.requestItem(item);
        })
    }
}
class InventoryRequesterV1 {
    constructor() {
        this.REQ_METHODS = ['HTTP'];
    }
    requestItem(item) {
        //...
    }
}
class InventoryRequesterV2 {
    constructor() {
        this.REQ_METHODS = ['WS'];
    }
    requestItem(items) {
        //...
    }
}
// By constucting our dependencies externally and injecting them, we can easily
// substitute our request module for a fancy new one that uses WebScokets.
const inventoryTracker = new InventoryTracker(['apples', 'bananas'], new InventoryRequesterV2());
inventoryTracker.requestItems();
