/* BUGS
//this is version 5 of A-frame, in version 8, the cursur selection doesn't work
//
*/
AFRAME.registerComponent("set-image",{ // creating a component called "set-image" that can be reused, now acting like a primitive . More about components: https://aframe.io/docs/0.8.0/core/component.html
	schema: {
			on: { type:"string"},//event to listen for
			target: {type:"selector"},//what will be changed
			src: {type: "string"}, //src of image to use for texture
			dur: {type: "number", default: 300},//duration of change
		},
			
			init: function(){ //called once to set up initial state and create a real instance (instantiate)
				var data =this.data;// data from scheme
				var el= this.el; //this element
				
				this.setupFadeAnimation(); // we're creating this below
				
				el.addEventListener(data.on, function(){
					data.target.emit("set-image-fade"); //fade out image (set-image +fade from animation ?)
					
					setTimeout(function(){
						data.target.setAttribute("material", "src", data.src); //set material src to the src value requests in scheme
					}, data.dur);//timeout = dur set requested in schema or default
				});
			},
			
			setupFadeAnimation: function() {//?????????this wasn't in the tutorial. I found it here: https://github.com/aframevr/360-image-gallery-boilerplate/blob/master/components/set-image.js
				//appends an <a-animation> that fades to black. it will fade to black and swap image during this. 
			
			 var data = this.data;
    		var targetEl = this.data.target;

    // Only set up once.
    if (targetEl.dataset.setImageFadeSetup) { return; }
    targetEl.dataset.setImageFadeSetup = true;

    // Create animation.
    targetEl.setAttribute('animation__fade', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '#FFF',
      to: '#000'
    });
			}
		});


