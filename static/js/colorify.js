
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

	imageLayer.on("postcompose", function(event) {
		console.log("POST", event);

		var resolution = event.frameState.viewState.resolution;
		var context = event.context;
		var canvas = context.canvas;
		var width = canvas.width;
		var height = canvas.height;

		var imageData = context.getImageData(0, 0, width, height);
  		var data = imageData.data;

  		var threshold = 157;
  		var offset, r, g, b, a, m;
  		for (var i = 0; i < width; ++i) {
		    for (var j = 0; j < height; ++j) {
			    offset = 4 * (j * width + i);
			    a = data[offset + 3];
			    if (a > 0) {
			        r = data[offset] / 255;
			        g = data[offset + 1] / 255;
			        b = data[offset + 2] / 255;
			        m = (r + g + b) / 3;
			        if (m < .5) {
			            data[offset] = 0;
			            data[offset + 1] = 155;
			            data[offset + 2] = 0;
			            data[offset + 3] = 255;
			        }
			    }
		    }
    	}

  		context.putImageData(imageData, 0, 0);

	})

}


