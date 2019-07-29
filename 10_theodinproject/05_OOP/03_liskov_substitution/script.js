function Vehicle(my)
{
    my = my || {}
    my.speed = 0;
    my.running = false;

    this.speed = function() {
        return my.speed;
    }

    this.start = function() {
        my.running = true;
    }

    this.stop = function() {
        my.running = false;
    }

    this.accelerate = function() {
        my.speed++;
    }

    this.decelerate = function() {
        my.speed--;
    }

    this.state = function() {
        if( !my.running ) {
            return "parked";
        }
        else if ( my.running && my.speed ) {
            return "moving";
        }
        else if( my.running ) {
            return "idle";
        }
    }
}

function FastVehicle(my) {
    my = my || {};

    var that = new Vehicle(my);
    that.accelerate = function() {
        my.speed += 3;
    }
    return that;
}
