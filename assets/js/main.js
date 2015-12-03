// for now, divId could be: About, FAQ, hw1~hw10.
var navLink = function(divId) {
	// hide sideNav, it's necessary when on medium or small screen
	$('.button-collapse').sideNav('hide');
	// hide all other sections
	var sections = document.getElementsByClassName('sections');
	for(var i=0; i<sections.length; i++) {
		sections[i].style.display = "none";
	}
	// display the desirable div
	document.getElementById(divId).style.display = "block";
}

// set up all the forms in every homework
var setupForms = function() {
	// TODO: we can improve extendibility by getting "forms" information from file?
	var forms = [
		{'formId': "hw1-upside-down-form", "formType": "image", "benchmarkPath": "assets/img/hw1/upside_down.bmp"},
		{'formId': "hw1-rightside-left-form", "formType": "image", "benchmarkPath": "assets/img/hw1/rightside_left.bmp"},
		{'formId': "hw1-diagonally-mirrored-form", "formType": "image", "benchmarkPath": "assets/img/hw1/diagonally_mirrored.bmp"},
		{'formId': "hw5-dilation-form", "formType": "image", "benchmarkPath": "assets/img/hw5/Dilation.bmp"},
		{'formId': "hw5-erosion-form", "formType": "image", "benchmarkPath": "assets/img/hw5/Erosion.bmp"},
		{'formId': "hw5-opening-form", "formType": "image", "benchmarkPath": "assets/img/hw5/Opening.bmp"},
		{'formId': "hw5-closing-form", "formType": "image", "benchmarkPath": "assets/img/hw5/Closing.bmp"},
		{'formId': "hw6-yokoi-form", "formType": "text", "benchmarkPath": "assets/text/hw6/yokoi_result.txt"},
		{'formId': "hw7-thinning-2014-512-form", "formType": "image", "benchmarkPath": "assets/img/hw7/thinned_512.bmp"},
		{'formId': "hw7-thinning-2014-64-form", "formType": "image", "benchmarkPath": "assets/img/hw7/thinned_64.bmp"},
		{'formId': "hw7-thinning-2015-512-form", "formType": "image", "benchmarkPath": "assets/img/hw7/thinned_ver2_512.bmp"},
		{'formId': "hw7-thinning-2015-64-form", "formType": "image", "benchmarkPath": "assets/img/hw7/thinned_ver2_64.bmp"}
	];
	console.log('inside setupForms(), and there are ' + forms.length + ' forms!');
	for(var i=0; i<forms.length; i++) {
		if(forms[i].formType == "image")
			setupImageForm(forms[i].formId, forms[i].benchmarkPath);
		else if(forms[i].formType == "text")
			setupTextForm(forms[i].formId, forms[i].benchmarkPath);
		else
			console.log('special form: ' + forms[i].formId + ' found.');
	}
}

var setupImageForm = function(formId, benchmarkPath) {
	var f = document.getElementById(formId);
	f.addEventListener('submit', function(e) {
		e.preventDefault();
		var formData = new FormData(f);
		formData.append('benchmarkPath', benchmarkPath);
		doAJAX("POST", "check.php", formData, function(res) {
			console.log('getting response: ' + res);
			// write response to result div
			var resultDiv = document.getElementById(formId + '-result');
			if(res.indexOf('output: False') >= 0) {
				resultDiv.children[0].children[0].innerHTML = "Result: False";
			} else if(res.indexOf('output: True') >= 0) {
				resultDiv.children[0].children[0].innerHTML = "Result: True";
			} else {
				resultDiv.children[0].children[0].innerHTML = "Result: Unknown...";
			}
			resultDiv.children[0].children[1].innerHTML = res;
		}, true);
	});
}

var setupTextForm = function(formId, benchmarkPath) {
	var f = document.getElementById(formId);
	f.addEventListener('submit', function(e) {
		e.preventDefault();
		var formData = new FormData(f);
		formData.append('benchmarkPath', benchmarkPath);
		doAJAX("POST", "check_text.php", formData, function(res) {
			console.log('getting response: ' + res);
			// write response to result div
			var resultDiv = document.getElementById(formId + '-result');
			if(res.indexOf('output: False') >= 0) {
				resultDiv.children[0].children[0].innerHTML = "Result: False";
			} else if(res.indexOf('output: True') >= 0) {
				resultDiv.children[0].children[0].innerHTML = "Result: True";
			} else {
				resultDiv.children[0].children[0].innerHTML = "Result: Unknown...";
			}
			resultDiv.children[0].children[1].innerHTML = res;
		}, true);
	});
}

var setupHW8form = function() {
	var f = document.getElementById('hw8-form');
	f.addEventListener('submit', function(e) {
		e.preventDefault();
		// check if any of the checkboxes is checked
		if(!document.getElementById('box3').checked
			&& !document.getElementById('box5').checked
			&& !document.getElementById('med3').checked
			&& !document.getElementById('med5').checked
			&& !document.getElementById('otc').checked
			&& !document.getElementById('cto').checked) {
			console.log('none of the checkboxes is checked...');
			alert('None of the checkboxes is checked! Aborting execution.');
			return;
		}
		var formData = new FormData(f);
		// put a preloader into result section
		var resultDiv = document.getElementById('hw8-result');
		resultDiv.innerHTML = '<div class="preloader-wrapper big active"><div class="spinner-layer spinner-blue"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-red"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-yellow"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-green"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>';
		// do the AJAX call
		doAJAX("POST", "checkHW8.php", formData, function(res) {
			console.log("getting response: " + res);
			var resultDiv = document.getElementById('hw8-result');
			var inner = '<span class="card-title">Result:</span>';
			if(res == "Error." || res.indexOf('[ERROR]') >= 0) {
				inner += '<p>' + res + '</p>';
			} else {
				parsed = JSON.parse(res);
				inner += '<p>';
				for(var k in parsed)
					if(parsed[k] != '(not found)')
						inner += (k + ': yes.<br />');
					else
						inner += (k + ': ' + parsed[k] + '<br />');
				inner += '</p>';
			}
			resultDiv.innerHTML = inner;
		}, true);
	});
}

var doAJAX = function(method, url, data, funcOnSuc, asyncOrNot) {
	// asyncOrNot is an optional parameter
	if(asyncOrNot == undefined)
		asyncOrNot = true; // default asynchronous!
	var req;
	if(window.XMLHttpRequest) {
		// for IE7+, Firefox, Chrome, Opera, Safari
		req = new XMLHttpRequest();
	} else{
		// for IE6- and ... worse
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}
	req.onreadystatechange = function() {
		if(req.readyState == 4 && req.status == 200) { // success
			var res = req.responseText;
			for(var i=0; i<res.length; i++) {
				if(res[i] != "" && res[i] != "\n" && res[i] != "\r")
					break;
			}
			res = res.substring(i);
			funcOnSuc(res);
		}
	}
	if(method == "GET") {
		req.open("GET", url, asyncOrNot);
		req.send();
	} else if(method == "POST") {
		req.open("POST", url, asyncOrNot);
		//req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.send(data);
	} else {
		console.log("doAJAX(): ERROR!!");
	}
}

