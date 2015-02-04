// Saves options to chrome.storage.sync.
function save_options(){
	var changeStep = document.getElementById('changeStep').value,
			scale = document.getElementById('scale').value;
			defFontSize = document.getElementById('defFontSize').value;

	chrome.storage.sync.set({
		changeStep: changeStep,
		defFontSize: defFontSize,
		scale: scale
	},
		function(){
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved';
		setTimeout(function(){
			status.textContent = '';
		}, 750);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options(){
	// Use default value color = 'red' and likesColor = true.
	chrome.storage.sync.get({
		changeStep: 4,
		defFontSize: 22,
		scale: 1.5
	}, function(items){
		document.getElementById('changeStep').value = items.changeStep;
		document.getElementById('scale').value = items.scale;
		document.getElementById('defFontSize').value = items.defFontSize;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
	save_options);