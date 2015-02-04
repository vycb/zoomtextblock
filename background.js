// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function onClickHandler(info, tab){
	var nodeId;

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, info.menuItemId === "plus" ? "textBlockZoomPlus" : 'textBlockZoomMinus', function(response)
		{
			nodeId = response.elementId;

		});
	});

}

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function(){
	// Create some radio items.
	chrome.contextMenus.create({"title": "+ Plus", "id": "plus", "contexts": ['page', 'image', 'all']});

	chrome.contextMenus.create({"title": "- Minus", "id": "minus", "contexts": ['page', 'image', 'all']});
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

