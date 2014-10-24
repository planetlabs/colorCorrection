
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
		    imageExtent: extent
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

}


