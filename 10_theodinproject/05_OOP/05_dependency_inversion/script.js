/*
    The Dependency inversion Principle

    Realates to the stability and reusability of higher-level components within
    an application. The principle states:

    a| High-level modules should not depend on low-level modules. Both should
       depend on abstractions
    b| Abstractions should not depend upon details. Details should depend
       upon Abstractions

    The primary concern of Dependency Inversion Principle is ot ensure that
    the main components of an application or framework remain decoupled from the
    ancillarty components providing low-level implementation details.
    This ensures that the important parts of an application or framework aren't
    affected when the low level components need to change
*/

$.fn.trackMap = function(options) {
    var defaults = {
        /* defaults */
    }
    options = $.extend({}, defaults, options);

    var mapOptions = {
        center: new google.maps.LatLng(options.latitude,options.longitude),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    },
        map = new google.maps.Map(this[0], mapOptions),
        pos = new google.maps.LatLng(options.latitude,options.longitude);

    var marker = new google.maps.Marker({
        position: pos,
        title: options.title,
        icon: options.icon
    });

    marker.setMap(map);

    options.feed.update( function( latitude, longitude ) {
        marker.setMap(null);
        var newLatLng = new google.maps.LatLng(latitude, longitude);
        marger.position = newLatLng;
        marker.setMap(map);
        map.setCenter(newLatLng);
    } )

    return this;
}

var updater = ( function() {
    // private properties

    return {
        update: function( callback ) {
            updateMap = callback;
        }
    }
} )();

$('#map_canvas').trackMap({
    latitude: 35.044640193770725,
    longitude: -89.98193264007568,
    icon: 'http://bit.ly/zjnGDe',
    title: 'Tracking Number: 12345',
    feed: updater
})

/*
    Since the trackMap function is semantically coupled to the Google Maps API,
    switching to a different mapping provider would require the trackMap function
    to be rewritten or an adapter to be written to adapt another mapping provider
    to Google's specific interface

    To inver the semantic coupling to the Google Maps lib, we need to redesign
    the trackMap function to have semantic coupling to an implicit interface
    which abstractly represents the functionality needed by mapping provider
    We would then need to implement an object witch adapts this interface to the
    Google Maps API.
*/
$.fn.trackMap = function(options) {
    var defaults = {
        // defaults
    }

    options = $.extend({}, defaults, option)

    options.provider.showMap(
        this[0],
        options.latitude,
        options.longitude,
        options.icon,
        options.title
    )

    options.feed.update( function( latitude, longitude) {
        options.provider.updateMap(latitude, longitude);

    } );

    return this;
}

$("#map_canvas").trackMap({
    latitude: 35.044640193770725,
    longitude: -89.98193264007568,
    icon: 'http://bit.ly/zjnGDe',
    title: 'Tracking Number: 12345',
    feed: updater,
    provider: trackMap.googleMapsProvider
});

/*
    In this version we've redesinged the trackMap function express its needs in terms
    of a generic mapping provider interface and have moved implementation details
    out into a separate googleMapsProvider component which can be bundeld as
    a separate Javascript module.
*/
trackMap.googleMapsProvider = (function() {
    var marker, map;

    return {
        showMap: function(element, latitude, longitude, icon, title) {
            var mapOptions = {
                center: new google.maps.LatLng(latitude, longitude),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            },
                pos = new google.maps.LatLng(latitude, longitude);

            map = new google.maps.Map(element, mapOptions);

            marker = new google.maps.Marker({
                position: pos,
                title: title,
                icon: icon
            });

            marker.setMap(map);
        },
        updateMap: function(latitude, longitude) {
            marker.setMap(null);
            var newLatLng = new google.maps.LatLng(latitude,longitude);
            marker.position = newLatLng;
            marker.setMap(map);
            map.setCenter(newLatLng);
        }
    };
})();
