// Copyright (c) 2009 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var textBlockZoom = {};

document.addEventListener("mousedown", function(event){
	//right click
	if(event.button == 2) {
		textBlockZoom.clickedEl = event.target;
	}
}, true);


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
		zoom(textBlockZoom.clickedEl, request === "textBlockZoomPlus"?"plus":"minus");

		sendResponse({elementId: textBlockZoom.clickedEl.id});
	});


chrome.storage.sync.get({
	changeStep: 4,
	defFontSize: 22,
	scale: 1.5
}, function(items){
	textBlockZoom.changeStep = items.changeStep;
	textBlockZoom.scale = items.scale;
	textBlockZoom.defFontSize = items.defFontSize;
});

chrome.storage.onChanged.addListener(function(changes, namespace){
	for(key in changes){
		var storageChange = changes[key];

		switch(key){
			case "changeStep":
				textBlockZoom.changeStep = storageChange.newValue;
				break;
			case "scale":
				textBlockZoom.scale = storageChange.newValue;
				break;
			case "defFontSize":
				textBlockZoom.defFontSize = storageChange.newValue;
				break;
		}
	}
});

function zoom(node, opval){
	var op = opval === 'plus' ? 1: -1,
		scale = textBlockZoom.scale,
		changeStep = textBlockZoom.changeStep,
		defFontSize = textBlockZoom.defFontSize;



	scale = opval === 'plus' ? scale: scale / 2;

	if(node instanceof HTMLImageElement)
	{
		if(!node.hasAttribute("width"))
			node.setAttribute("width", node.naturalWidth);
		if(!node.hasAttribute("height"))
			node.setAttribute("height", node.naturalHeight);
		if(!node.hasAttribute("originalWidth")){
			node.setAttribute("originalWidth", node.width);
			node.setAttribute("originalHeight", node.height);
		}
		node.width *= scale;
		node.height *= scale;
	}
	else
	{
		if(node){
			var fontSize = parseInt(node.style.fontSize);

			if(isNaN(fontSize) || !fontSize){
				fontSize = defFontSize;
			}else{
				fontSize = fontSize + changeStep * op;
			}

			//node.parentNode.style.fontSize =
			node.style.fontSize = (fontSize + "px");
			//node.parentNode.style.lineHeight =
			node.style.lineHeight = 'initial';
		}
	}

}