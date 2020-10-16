const componentLoader = () => {

	// Define keyword
	const keyword = "component";

	// Assign const els to all elements on page
	const els = document.getElementsByTagName("*");

	// Run all elements in for loop
	for (i = 0; i < els.length; i++) {
		const el = els[i];

		// search for element atrribute with keyword
		const file = el.getAttribute(keyword);

		if (file) {
			// HTTP request with attribute for file name
			const xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {

				if (this.readyState === 4) {
					// final

					if (this.status === 200) {
						// A-OK
						el.innerHTML = this.responseText;
					}

					if (this.status === 404) {
						// Nope
						el.innerHTML = "Page not found.";
					}
					// Remove attribute from element
					el.removeAttribute(keyword);
					// As long as we are in loop we should run function
					componentLoader();
				}
			}

			// Get content of file
			xhr.open("GET", file);
			// Send back content to element
			xhr.send();

			// The cow goes moo
			return;
		}
	}
}
// Run function
componentLoader();