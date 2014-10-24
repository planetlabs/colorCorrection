
function makeImage(url) {
	var extent = [0, 0, 3072, 2600];
    var pixelProjection = new ol.proj.Projection({
        code: 'image',
        units: 'pixels',
        extent: extent
    });

	var imageLayer = new ol.layer.Image({
	  	source: new ol.source.ImageStatic({
		    url: url,
		    projection: pixelProjection,
		    imageExtent: extent,
		    crossOrigin: 'anonymous'
	  	})
	});

	imageMap = new ol.Map({
	    target:'olImage',
	    view: new ol.View({
		    projection: pixelProjection,
		    center:ol.extent.getCenter(extent),
		    zoom: 1.5
	    })
	});
	imageMap.addLayer(imageLayer);

	imageLayer.on("postcompose", postcompose);
}


function identityCurve(originalValue) {
	return originalValue;
}

function levelCurve(min, max) {
	// Returns a function that takes in and returns 1 float, that maps
	// an intensity value from the space [0-255] back into the space [0-255]
	// but thresholding below the min and above the max, with linear
	// interpolation between. This is known as color level adjustment

	// This is the gain/offset that describes our linear interpolation
	var m = 255.0 / (max - min);
	var b = -m * min;

	function newCurve(originalValue) {
		if (originalValue > max) {
			return 255;
		}
		else if (originalValue < min) {
			return 0;
		}
		else {
			return originalValue * m + b;
		}
	}

	return newCurve
}


redCurve = levelCurve(50, 225);
greenCurve = levelCurve(50, 225);
blueCurve = levelCurve(50, 225);


function postcompose(event) {
	var resolution = event.frameState.viewState.resolution;
	var context = event.context;
	var canvas = context.canvas;
	var width = canvas.width;
	var height = canvas.height;

	var imageData = context.getImageData(0, 0, width, height);
	var data = imageData.data;

	var offset, a;
	for (var i = 0; i < width; ++i) {
	    for (var j = 0; j < height; ++j) {
		    offset = 4 * (j * width + i);
		    a = data[offset + 3];
		    if (a > 0) {
		    	// r
		        data[offset] = redCurve(data[offset]);

		        // g
		        data[offset + 1] = greenCurve(data[offset + 1]);

		        // b
		        data[offset + 2] = blueCurve(data[offset + 2]);
		    }


	    }
	}

	context.putImageData(imageData, 0, 0);
}

