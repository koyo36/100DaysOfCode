function Product( id, description )
{
    this.getId = function() {
        return id;
    }

    this.getDescription = function() {
        return description;
    }
}

function Cart( eventAggregator )
{
    var items = [];

    this.addItem = function( item ) {
        this.push(item);
    }
}

var products = [
    new Product(1, "Star Wars Lego Ship"),
    new Product(2, "Barbie Doll"),
    new Product(3, "Remote Control Airplane")
]
cart = new Cart();

( function() {

    function addToCart()
    {
        var productId = $(this).attr('id');
        var product = $.grep(products, function(x) {
            return x.getId() == productId;
        })[0]

        cart.addItem(product);

        var newItem = $('<li></li>')
            .html(product.getDescription())
            .attr('id-cart', product.getId())
            .appendTo('#cart')
    }

    product.forEach( function(product) {
        var newItem = $('<li></li>')
            .html(product.getDescription())
            .attr('id', product.getId())
            .dblclick(addToCart)
            .appendTo('#products');
    } );

} )();



// Single Responsibility


/*
    We removed anonymous function and replace it with objects to coordinate each
    of the separate set of responsibilities.

    A cartView was introduced to coordinate the population of the cart model,
    and a productView was introduced to coordinate the population of the products
    display

    We also introduced an EventAggregator to facilitate communication
    between the objects in a loosely-coopled way.

    While this design results in a larger number of objects, each object
    now focuses on fulfilling a specific role within the overall orcherstration
    with minimal coupling between the objects
*/
function Event(name)
{
    this._handlers = [];
    this.name = name;
}

Event.prototype.addHandler = function(handler)
{
    this._handlers.push(handler);
}

Event.prototype.removeHandler = function(handler)
{
    for( let i = 0; i < handlers.length; i++ )
    {
        if( this._hanlers(i) == handler )
        {
            this._handlers.splice(i, 1);
            break;
        }
    }
}

Event.prototype.fire = function(eventArgs)
{
    this._handlers.forEach( function(h) {
        h(eventArgs);
    } )
}

var eventAggregator = ( function() {

    var events = [];

    function getEvent(eventName)
    {
        return $.grep( events, function(event) {
            return event.name === eventName;
        } )[0]
    }

    return {

        publish: function( eventName, eventArgs )
        {
            let event = getEvent(eventName);

            if( !event )
            {
                event = new Event(eventName);
                events.push(event);
            }
            event.fire(eventArgs);
        },

        subscribe: function( eventName, handler )
        {
            let event = getEvent( eventName );

            if( !event ) {
                event = new Event( eventName )
                events.push(event);
            }

            event.addHandler(handler);
        }
    }

})();

function Cart()
{
    var items = [];

    this.addItem = function( item )
    {
        items.push(item);
        eventAggregator.publish('itemAdded', item);
    }
}

var cartView = (function() {

    event.eventAggregator.subscribe('itemAdded', function(eventArgs) {
        var newItem = $('<li></li>')
            .html(eventArgs.getDescription())
            .attr('id-cart', eventArgs.getId())
            .appendTo('#cart')
    })

})();

var cartView = (function() {

    eventAggregator.subscribe('itemAdded', function(eventArgs) {
        var newItem = $('<li></li>')
            .html(eventArgs.getDescription)
            .attr('id-cart', eventArgs.getId())
            .appendTo('#cart');
    });

})();

var cartController = (function(cart) {

    eventAggregator.subscribe('productSelected', function(eventArgs) {
        cart.addItem(eventArgs.product);
    })

})( new Cart());

function Product( id, description )
{
    this.getId = function() {
        return id;
    };
    this.getDescription = function() {
        return description;
    }
}

var products = [
    new Product( 1, 'Star Wars Lego Ship' ),
    new Product( 2, 'Barbie Doll'),
    new Product( 3, 'Remote Control Airplane')
];

var productView = (function(){

    function onProductSelected()
    {
        var productId = $(this).attr(id);
        var product = $.grep(products, function(x) {
            return x.getId() == productId;
        })[0];
        eventAggregator.publish('productSelected', {
            product: product
        });
    }

    products.forEach( function(product) {
        var newItem = $('<li></li>')
            .html(product.getDescription())
            .attr('id', product.getId())
            .dblclick(onProductSelected)
            .appendTo('#products');
    } );

})();
