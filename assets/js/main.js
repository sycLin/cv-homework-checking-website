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
	var forms = [{'formId': "hw7-thinning-form", "formType": "image", "benchmarkPath": "assets/img/thinned.bmp"}, {'formId': "hw7-thinning-512-form", "formType": "image", "benchmarkPath": "assets/img/thinned_512.bmp"}];
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
	console.log('inside setupTextForm() function... but not implemented yet!');
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

