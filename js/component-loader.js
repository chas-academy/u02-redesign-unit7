// This is just a clean up process to remove the inital script
// in head, that createt the script element for this file
const removeInitalScript = document.head.querySelector('script');
removeInitalScript.parentNode.removeChild(removeInitalScript);

// Quick test to see if we are on index page
// We'll use this test later to handle the menu links
const isIndex = window.location.pathname === '/' ? true : false;

// Test if we are on CHAS Academy's GitHub pages
const chasGitHub = 'chas-academy.github.io';
const gitHubRepoName = 'u02-redesign-unit7';
const isGitHub = window.location.host === chasGitHub ? true : false;

// Create empty script element for menu toggler
const menuTogglerScriptEl = document.createElement('script');

// Insert menu toggler file in script source
menuTogglerScriptEl.src = !isGitHub ? `/js/menu-toggle.js` : `/${gitHubRepoName}/js/menu-toggle.js`;

// Append script to head (NOTE! NOT header element)
document.head.appendChild(menuTogglerScriptEl);

// Create empty script element for search
const searchScripEl = document.createElement('script');

// Insert menu toggler file in script source
searchScripEl.src = !isGitHub ? `/js/search.js` : `/${gitHubRepoName}/js/search.js`;

// Create empty script element for scroll to top
const scrollTopScripEl = document.createElement('script');

// Insert menu toggler file in script source
scrollTopScripEl.src = !isGitHub ? `/js/scroll-to-top.js` : `/${gitHubRepoName}/js/scroll-to-top.js`;

// Append scripts to body. Append, rather than prepend
// will add script at the end of body since this file
// must load last (otherwise the function can't find its elements
// since they don't exist yet)
document.body.appendChild(searchScripEl);
document.body.appendChild(scrollTopScripEl);


const componentLoader = () => {

	// Define keyword
	const keyword = 'component';

	// Assign const componentElemets to all elements with keyword attribute on page
	const componentElemets = document.querySelectorAll(`[${keyword}]`);

	// Run all elements in for each loop
	componentElemets.forEach(async (el) => {

		// Best practice for async is to run it in try/catch block
		try {
			// Get component tag name
			const componentTag = el.tagName;

			// Get file location from element atrribute
			const file = !isGitHub ? el.getAttribute(keyword) : `/${gitHubRepoName}${el.getAttribute(keyword)}`;

			if (file) {
				const fetchResponse = await fetch(file);
				let html = fetchResponse.ok ? await fetchResponse.text() : false;

				// GitHub pages are on organization
				// We need to fix menu anchors to match this
				if (isGitHub) {

					// For now we only need to change things in header element
					if (componentTag === 'HEADER') {

						const nodeList = new DOMParser().parseFromString(html, 'text/html').body;

						const headerLogotype = nodeList.querySelector('a#main-header-logotype img');
						headerLogotype.src = `/${gitHubRepoName}${headerLogotype.getAttribute('src')}`;

						// Get all anchors in list items from menu (nav)
						const menuItems = nodeList.querySelectorAll('.container nav ul li a');

						// Loop anchors in for each loop
						menuItems.forEach(item => {

							// Get item href
							const itemUrl = item.href;

							// Get anchor URL object using itemUrl (const)
							const menuItemPath = new URL(itemUrl);

							// Create correct path reference
							const itemPathHref = menuItemPath.href;
							const itemPathName = menuItemPath.pathname;
							// const itemPathOrigin = menuItemPath.origin;

							// Check if link has a page assigned
							// I.e. doesn't have hash (#) at the end
							if (!itemPathHref.endsWith('#')) {
								item.href = `/${gitHubRepoName}${itemPathName}`
							}
						});

						// Update HTML that will be in header
						html = nodeList.outerHTML;
					}
				}

				// Some things are only relevant on index page
				// This is so that other pages can work unobstructed
				// if (isIndex) {

				// 	// Parse HTML text to DOM and get body content
				// 	const nodeList = new DOMParser().parseFromString(html, 'text/html').body;

				// 	if (componentTag === 'HEADER') {

				// 		// Get logotype src
				// 		const logotypeElement = nodeList.querySelector('.container #main-header-logotype img');
				// 		const logotypeSource = logotypeElement.getAttribute('src');
				// 		logotypeElement.src = `..${logotypeSource}`;

				// 		console.log(logotypeElement);
				// 	}

				// }

				// If HTML string is not false add it to element
				if (html)
					// el.insertAdjacentHTML(
					// 	'afterbegin',
					// 	html
					// );
					el.innerHTML = html;

				// Keep source code clean
				// Remove keyword attribute from element
				el.removeAttribute(keyword);
			}

		} catch (err) {
			console.log(err);
		}
	})
}
// Run function
componentLoader();