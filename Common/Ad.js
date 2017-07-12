var Ad = function(options) {
    this.setup(options, {
        width: 300,
        height: 250
    });
}

Ad.prototype.setup = function(options, defaultOptions) {
    // setup options
    for (var i in defaultOptions)
        this[i] = options[i] || defaultOptions[i];

    // setup time
    this.time = {
        total: 0,
        previous: 0,
        delta: null
    }

    // start main loop
    requestAnimationFrame(this.update.bind(this));
}

Ad.prototype.update = function(currentTime) {
    requestAnimationFrame(this.update.bind(this));
    this.time.delta = currentTime - this.time.previous;
    this.time.previous = currentTime;
    console.log(this.time.delta);
}