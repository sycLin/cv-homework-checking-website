var config = function() {
	// after getting response
	var onResponse = function(raw) {
		var config = JSON.parse(raw);
		/* deal with website title */
		document.getElementsByTagName('title')[0].innerHTML = config.title;
		/* deal with navigation bar */
		// 1) navigaion title
		document.getElementById('nav-title').innerHTML = config['nav-title'];
		document.getElementById('nav-title').setAttribute('href', window.location.origin + window.location.pathname);
		// 2) navigation links
		var navNode = document.getElementById('nav-mobile');
		while(navNode.children.length > 0) navNode.removeChild(navNode.children[0]);
		for(var key in config.structure.pages) {
			var newLi = document.createElement('li');
			var newA = document.createElement('a');
			var newText = document.createTextNode(key);
			newA.setAttribute('onclick', 'navLink(this, \'' + config.structure.pages[key] + '\')');
			newA.setAttribute('href', '#');
			newA.appendChild(newText);
			newLi.appendChild(newA);
			navNode.appendChild(newLi);
		}
		// 3) side navigation links
		var sideNavNode = document.getElementById('mobile-demo');
		while(sideNavNode.children.length > 0) sideNavNode.removeChild(sideNavNode.children[0]);
		for(var key in config.structure.pages) {
			var newLi = document.createElement('li');
			var newA = document.createElement('a');
			var newText = document.createTextNode(key);
			newA.setAttribute('onclick', 'navLink(this, \'' + config.structure.pages[key] + '\')');
			newA.setAttribute('href', '#');
			newA.appendChild(newText);
			newLi.appendChild(newA);
			sideNavNode.appendChild(newLi);
		}
		$('.button-collapse').sideNav();
	}
	doAJAX('GET', window.location.href + 'config.json', '', onResponse);
}

var navLink = function(navItem, jsonLocation) {
	// hide sideNav, necessary when on medium or small screen
	$('.button-collapse').sideNav('hide');
	// hide all other sections
	var sections = document.getElementsByClassName('sections');
	for(var i=0; i<sections.length; i++)
		sections[i].style.display = "none";
	// display the designated item
	var target = navItem.innerHTML;
	if(target == "about") {
		console.log('displaying about section with json located at: ' + jsonLocation);
		getAbout(jsonLocation);
	} else if(target == "publication") {
		console.log('displaying publication section with json located at: ' + jsonLocation);
		getPublication(jsonLocation);
	} else if(target == "projects") {
		console.log('displaying projects section with json located at: ' + jsonLocation);
		getProjects(jsonLocation);
	} else if(target == "skills") {
		console.log('displaying skills section with json located at: ', jsonLocation);
		getSkills(jsonLocation);
	} else if(target == "contact") {
		console.log('displaying contact section with json located at: ' + jsonLocation);
		getContact(jsonLocation);
	} else {
		console.log('this sections: ' + target + ' is not implemented yet!');
		return;
	}
	document.getElementById(target).style.display = "block";
}

var getAbout = function() {
	console.log('under construction...');
}

var getPublication = function() {
	console.log('under construction...');
}

var getProjects = function(jsonLocation) {
	var createTechTag = function(tech, mainOrNot) {
		var tag = document.createElement('div');
		if(mainOrNot)
			tag.setAttribute("class", "chip pink white-text");
		else
			tag.setAttribute("class", "chip");
		var text = document.createTextNode(tech);
		tag.appendChild(text);
		return tag;
	}
	// get response from json file
	var onResponse = function(raw) {
		var projects = JSON.parse(raw);
		// fill in the research related projects
		var RRPjDiv = document.getElementById('Research-Related-Projects');
		for(var i=0; i<RRPjDiv.children.length; i++) {
			if(RRPjDiv.children[i].tagName == "DIV") {
				RRPjDiv.removeChild(RRPjDiv.children[i]);
				i -= 1;
			}
		}
		for(var i=0; i<projects.research.length; i++) {
			var newPjDiv = document.createElement('div');
			newPjDiv.setAttribute('class', 'row card hoverable');
			var leftDiv = document.createElement('div');
			var rightDiv = document.createElement('div');
			leftDiv.setAttribute('class', 'col s12 m3');
			rightDiv.setAttribute('class', 'col s12 m9');
			var thumbnail = document.createElement('img');
			thumbnail.setAttribute('src', projects.research[i].thumbnail);
			thumbnail.setAttribute('class', 'responsive-img');
			thumbnail.setAttribute('alt', 'project thumbnail');
			leftDiv.appendChild(thumbnail);
			var projectTitle = document.createElement('h4');
			var projectTitleText = document.createTextNode(projects.research[i].title);
			projectTitle.appendChild(projectTitleText);
			var projectDescription = document.createElement('p');
			var projectDescriptionText = document.createTextNode(projects.research[i].description);
			projectDescription.appendChild(projectDescriptionText);
			var projectLinks = document.createElement('div');
			projectLinks.setAttribute('class', 'card-action');
			for(var j=0; j<projects.research[i].links.length; j++) {
				var newLink = document.createElement('a');
				newLink.setAttribute('href', projects.research[i].links[j].linkUrl);
				var newLinkText = document.createTextNode(projects.research[i].links[j].linkTitle);
				newLink.appendChild(newLinkText);
				projectLinks.appendChild(newLink);
			}
			rightDiv.appendChild(projectTitle);
			for(var j=0; j<projects.research[i]['related-tech']['main'].length; j++) {
				rightDiv.appendChild(createTechTag(projects.research[i]['related-tech']['main'][j], true));
			}
			for(var j=0; j<projects.research[i]['related-tech']['other'].length; j++) {
				rightDiv.appendChild(createTechTag(projects.research[i]['related-tech']['other'][j], false));
			}
			rightDiv.appendChild(projectDescription);
			rightDiv.appendChild(projectLinks);
			newPjDiv.appendChild(leftDiv);
			newPjDiv.appendChild(rightDiv);
			RRPjDiv.appendChild(newPjDiv);
		}
		// fill in the nonresearch related projects
		var nRRPjDiv = document.getElementById('NonResearch-Related-Projects');
		for(var i=0; i<nRRPjDiv.children.length; i++) {
			if(nRRPjDiv.children[i].tagName == "DIV") {
				nRRPjDiv.removeChild(nRRPjDiv.children[i]);
				i -= 1;
			}
		}
		for(var i=0; i<projects.nonresearch.length; i++) {
			var newPjDiv = document.createElement('div');
			newPjDiv.setAttribute('class', 'row card hoverable');
			var leftDiv = document.createElement('div');
			var rightDiv = document.createElement('div');
			leftDiv.setAttribute('class', 'col s12 m3');
			rightDiv.setAttribute('class', 'col s12 m9');
			var thumbnail = document.createElement('img');
			thumbnail.setAttribute('src', projects.nonresearch[i].thumbnail);
			thumbnail.setAttribute('class', 'responsive-img');
			thumbnail.setAttribute('alt', 'project thumbnail');
			leftDiv.appendChild(thumbnail);
			var projectTitle = document.createElement('h4');
			var projectTitleText = document.createTextNode(projects.nonresearch[i].title);
			projectTitle.appendChild(projectTitleText);
			var projectDescription = document.createElement('p');
			var projectDescriptionText = document.createTextNode(projects.nonresearch[i].description);
			projectDescription.appendChild(projectDescriptionText);
			var projectLinks = document.createElement('div');
			projectLinks.setAttribute('class', 'card-action');
			for(var j=0; j<projects.nonresearch[i].links.length; j++) {
				var newLink = document.createElement('a');
				newLink.setAttribute('href', projects.nonresearch[i].links[j].linkUrl);
				var newLinkText = document.createTextNode(projects.nonresearch[i].links[j].linkTitle);
				newLink.appendChild(newLinkText);
				projectLinks.appendChild(newLink);
			}
			rightDiv.appendChild(projectTitle);
			for(var j=0; j<projects.nonresearch[i]['related-tech']['main'].length; j++) {
				rightDiv.appendChild(createTechTag(projects.nonresearch[i]['related-tech']['main'][j], true));
			}
			for(var j=0; j<projects.nonresearch[i]['related-tech']['other'].length; j++) {
				rightDiv.appendChild(createTechTag(projects.nonresearch[i]['related-tech']['other'][j], false));
			}
			rightDiv.appendChild(projectDescription);
			rightDiv.appendChild(projectLinks);
			newPjDiv.appendChild(leftDiv);
			newPjDiv.appendChild(rightDiv);
			nRRPjDiv.appendChild(newPjDiv);
		}
	}
	doAJAX("GET", window.location.origin + window.location.pathname + jsonLocation, "", onResponse);
}

var getSkills = function(jsonLocation) {
	// get response from json file
	var onResponse = function(raw) {
		var skills = JSON.parse(raw);
		// fill in the advanced skills
		var advSkillsDiv = document.getElementById('advanced-skills');
		for(var i=0; i<advSkillsDiv.children.length; i++) {
			if(advSkillsDiv.children[i].tagName == "DIV") {
				advSkillsDiv.removeChild(advSkillsDiv.children[i]);
				i -= 1;
			}
		}
		for(var i=0; i<skills.advanced.length; i++) {
			var newSkillDiv = document.createElement('div');
			newSkillDiv.setAttribute('class', 'col s4 m3 l2');
			var thumbnail = document.createElement('img');
			thumbnail.setAttribute('src', skills.advanced[i].thumbnail);
			thumbnail.setAttribute('class', 'responsive-img');
			thumbnail.setAttribute('alt', 'skill thumbnail');
			var title = document.createElement('h6');
			title.setAttribute('class', 'center');
			var link = document.createElement('a');
			link.setAttribute('href', skills.advanced[i].link);
			var titleText = document.createTextNode(skills.advanced[i].title);
			link.appendChild(titleText);
			title.appendChild(link);
			newSkillDiv.appendChild(thumbnail);
			newSkillDiv.appendChild(title);
			advSkillsDiv.appendChild(newSkillDiv);
		}
		// fill in the strong skills
		var strongSkillsDiv = document.getElementById('strong-skills');
		for(var i=0; i<strongSkillsDiv.children.length; i++) {
			if(strongSkillsDiv.children[i].tagName == "DIV") {
				strongSkillsDiv.removeChild(strongSkillsDiv.children[i]);
				i -= 1;
			}
		}
		for(var i=0; i<skills.strong.length; i++) {
			var newSkillDiv = document.createElement('div');
			newSkillDiv.setAttribute('class', 'col s4 m3 l2');
			var thumbnail = document.createElement('img');
			thumbnail.setAttribute('src', skills.strong[i].thumbnail);
			thumbnail.setAttribute('class', 'responsive-img');
			thumbnail.setAttribute('alt', 'skill thumbnail');
			var title = document.createElement('h6');
			title.setAttribute('class', 'center');
			var link = document.createElement('a');
			link.setAttribute('href', skills.strong[i].link);
			var titleText = document.createTextNode(skills.strong[i].title);
			link.appendChild(titleText);
			title.appendChild(link);
			newSkillDiv.appendChild(thumbnail);
			newSkillDiv.appendChild(title);
			strongSkillsDiv.appendChild(newSkillDiv);
		}
		// fill in the experienced skills
		var expSkillsDiv = document.getElementById('experienced-skills');
		for(var i=0; i<expSkillsDiv.children.length; i++) {
			if(expSkillsDiv.children[i].tagName == "DIV") {
				expSkillsDiv.removeChild(expSkillsDiv.children[i]);
				i -= 1;
			}
		}
		for(var i=0; i<skills.experienced.length; i++) {
			var newSkillDiv = document.createElement('div');
			newSkillDiv.setAttribute('class', 'col s4 m3 l2');
			var thumbnail = document.createElement('img');
			thumbnail.setAttribute('src', skills.experienced[i].thumbnail);
			thumbnail.setAttribute('class', 'responsive-img');
			thumbnail.setAttribute('alt', 'skill thumbnail');
			var title = document.createElement('h6');
			title.setAttribute('class', 'center');
			var link = document.createElement('a');
			link.setAttribute('href', skills.experienced[i].link);
			var titleText = document.createTextNode(skills.experienced[i].title);
			link.appendChild(titleText);
			title.appendChild(link);
			newSkillDiv.appendChild(thumbnail);
			newSkillDiv.appendChild(title);
			expSkillsDiv.appendChild(newSkillDiv);
		}
	}
	doAJAX("GET", window.location.origin + window.location.pathname + jsonLocation, "", onResponse);
}

var getContact = function() {
	console.log('under construction...');
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

