var Carousel = function ( $target )
{
	this.$ = {};
	this.$.container  	    = $target;
	this.$.carousel 		= this.$.container.find('.carousel');
	this.$.prev 	 		= this.$.container.find('.prev');
	this.$.next 		    = this.$.container.find('.next');
	this.$.play 		    = this.$.container.find('.play');
	this.$.slides_container = this.$.container.find('.slides .items');
	this.$.slides 			= this.$.slides_container.find('.item');
	this.$.seek_bar			= this.$.container.find('.seek-bar');
	this.$.progress_bar		= this.$.container.find('.progress-bar');

	this.$.choice			= this.$.container.find('.choice');
	this.$.tracks 			= this.$.choice.find('.tracks');
	this.$.track 			= this.$.tracks.find('.track');
	this.$.speakers			= this.$.track.find('.speakers');
	this.$.music			= this.$.container.find('.music');

	this.count = this.$.slides.length;
	this.init_events();
};

Carousel.prototype.index = 0;
Carousel.prototype.count = 0;
Carousel.prototype.progress_ratio = 0;
Carousel.prototype.swipe = 0;

Carousel.prototype.init_events = function (){
	var that = this;

	/* On click on the next and prev button, swipe the carousel */ 
	this.$.next.on('click', function(){
		that.next();
		return false;
	});
	this.$.prev.on('click', function(){
		that.prev();
		return false;
	});

	/* We click on one track name, change to that music and that image */ 
	this.$.track.each(function (data) {
       	$(this).on('click', function (){
       		
       		that.go_to( data, $carousel.index);
       	});
    });

	this.changeMusic();


	/* CHECK WHEN WE CHANGE MUSIC ON KEYBOARD */
	$(window).keydown(function(evt) {
		if (evt.which == 39) {
			that.next();
			return false;
	  	}
	  	if (evt.which == 37) {
			that.prev();
			return false;
	  	}
	  	if (evt.which == 32) {
	  		play = !play;
			that.changeMusic();
			return false;
	  	}
	});

	/* CHECK WHEN WE PAUSE BY CLICKING ON THE IMAGE */
	this.$.play.on('click', function(){
		play = !play;
		that.changeMusic();
		return false;
	});


	this.$.speakers.on('click', function(){
		if (that.$.music[0].volume == 1) {
			that.$.music[0].volume = 0;
			that.$.speakers.css({
				"background-image": "url(http://audeficheux.com/projects/carousel/src/images/mute.png)"
			});
		}
		else {
			that.$.music[0].volume = 1;
			that.$.speakers.css({
				"background-image": "url(http://audeficheux.com/projects/carousel/src/images/speaker.png)"
			});
		}
	});

	/* CHECK WHEN THE MUSIC ENDS */ 
	this.$.music.bind('ended', function(){
		that.next();
	});


	/* FOR THE TOUCH CONTROL */
	this.$.carousel.on('touchstart',function(e){
		that.swipe = e.originalEvent.touches[0].clientX;
	});

	this.$.carousel.on('touchend',function(e){
		if (e.originalEvent.changedTouches[0].clientX > that.swipe + 10)
			that.prev();
		else if (e.originalEvent.changedTouches[0].clientX < that.swipe - 10)
			that.next();
		/* The + / - 10 allows to not swipe when we touch the screen without purpose*/
	});


	/**** SEEK BAR ****/
	window.setInterval(function () {
		this.progress_ratio = that.$.music[0].currentTime / that.$.music[0].duration;
	    that.$.progress_bar.css({
		  transform: "scaleX(" + progress_ratio + ")"
		});
	}, 50);

	/* Allows to change the current time of the song */ 
	this.$.seek_bar.on('click', function (e) {
	        var x = e.clientX - that.$.seek_bar.offset().left,
	        ratio = x / that.$.seek_bar.width(),
	        time = ratio * that.$.music[0].duration;
	    that.$.music[0].currentTime = time;
	});

};


Carousel.prototype.next = function()
{
	this.go_to( this.index + 1, this.index);
};

Carousel.prototype.prev = function()
{
	this.go_to( this.index - 1, this.index);

};

Carousel.prototype.go_to = function( index, currentIndex )
{	
	if (currentIndex != index) { //Avoid to start over the audio by clicking on the current music and mute the audio

		index = index%this.count;
		if (index < 0)
			index = index + this.count;

		this.$.carousel.css({
			"background-image": "url(http://audeficheux.com/projects/carousel/src/images/background" + index + ".png)"
		});

		/* Make visible or invisible the speakers*/
		this.$.speakers[currentIndex].classList.add('invisible');
		this.$.speakers[index].classList.remove('invisible');

		/* Change the source of the music */
		this.$.music[0].setAttribute('src', 'https://raw.githubusercontent.com/andrewbiang888/bsidebookclub/master/media/' + index + '.mp3');
		this.changeMusic();

		/* Make the scroll follow the current music */
		$carousel.$.tracks.animate({scrollTop:50*index - 50},300);

		/* Animate the slider */ 
		this.$.slides_container.css({
		  transform: "translateX(" + (-225)*index + "px)"
		});
		this.index = index;

	}
};

Carousel.prototype.changeMusic = function()
{	
	/* Play or pause the music */ 	
	if (play == true) {
		this.$.play[0].classList.add('invisible');
		this.$.music[0].play();
	}
	else {
		this.$.play[0].classList.remove('invisible');
		this.$.music[0].pause();
	}
};

var $carousel = new Carousel( $('.container ') );

var play = false;
