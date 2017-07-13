var Ad = function(options) {
    this.setInlineStyle = gwd.actions.events.setInlineStyle;

    this.setup(options, {
        width: 300,
        height: 250,
        numPictures: 4,
        effects: {
            overlayFadeOut: {delay: 2000, transition: '0.5s ease-in'},
            arrowsSlideIn: {delay: 1500, transition: '1.0s ease-out'}
        },
    });

    this.start();
}

Ad.prototype.setup = function(options, defaultOptions) {
    for (var i in defaultOptions)
        this[i] = options[i] || defaultOptions[i];
    this.setupTexts();
    this.setupPhotos();
    this.setupArrows();
}

Ad.prototype.setupPhotos = function() {
    for (var i = 1; i < this.numPictures; i++)
        this.setInlineStyle('pic-' + i, 'transform: translateX(' + this.width + 'px)');
}

Ad.prototype.setupTexts = function() {
    for (var i = 0; i < this.numPictures; i++)
        this.setInlineStyle('txt-' + i, 'opacity: 0');
}

Ad.prototype.setupArrows = function() {
    this.setInlineStyle('arr-left', 'transform: translateX(-' + this.width + 'px)');
    this.setInlineStyle('arr-right', 'transform: translateX(' + this.width + 'px)');
}

Ad.prototype.start = function() {
    this.fadeOut('overlay-img', this.effects.overlayFadeOut);
    this.fadeOut('overlay-txt', this.effects.overlayFadeOut);
    this.slideIn('arr-right', this.effects.arrowsSlideIn);
    this.slideIn('arr-left', this.effects.arrowsSlideIn);
}

Ad.prototype.slideIn = function(element, options) {
    this.animate(element, options.transition, {
        transform: 'translateX(0px)'
    }, options.delay);
}

Ad.prototype.slideOutLeft = function(element, options) {
    this.animate(element, options.transition, {
        transform: 'translateX(-' + this.width + 'px)'
    }, options.delay);
}

Ad.prototype.slideOutRight = function(element, options) {
    this.animate(element, options.transition, {
        transform: 'translateX(' + this.width + 'px)'
    }, options.delay);
}

Ad.prototype.fadeOut = function(element, options) {
    this.animate(element, options.transition, {opacity: 0}, options.delay);
}

Ad.prototype.animate = function(element, transition, properties, delay) {
    setTimeout(function() {
        var style = ['transition:all ' + transition];
        for (var i in properties)
            style.push(i + ':' + properties[i]);
        this.setInlineStyle(element, style.join(';'));
    }.bind(this), delay);
}