/*
    This listing presents a library named exampleBinder whose purpose is
    to facilitate two-way data-binding. The public interface of the library is
    represented by the bind method. The responsibilities of change notification
    and view interaction have been separated into the object modelObserver and
    viewAdaptor respectively to allow for alternate implementations of the
    interfaces expected by the bind method
    Any object adhereing to semantic behavior represented by these interfaces
    may be substituted for default implementations.

    Thought the JavaScript language may not provide interface types to aid in
    specifying the contract of an object, the object's implicit interface
    still serves as a contract to clients within an application
*/

var exampleBinder = {};

exampleBinder.modelObserver = ( function() {
    // private variables
    return {
        observe: function(model) {
            // code
            return newModel;
        },
        onChange: function(callback) {
            // code
        }
    }
} )();

exampleBinder.viewAdaptor = (function() {
    // private variables
    return {
        bind: function(model) {
            // code
        }
    }
})();

exampleBinder.bind = function(model) {
    // private variables
    exampleBinder.modelObserver.onChange(/*callback*/);
    var om = exampleBinder.modelObserver.observe(model);
    exampleBinder.viewAdaptor.bind(om);

    return om;
}
