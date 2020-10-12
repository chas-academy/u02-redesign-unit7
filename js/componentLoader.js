function componentLoader() {

	// Define up keyword
	const keyword = "component";

	// Assign const tag to all elements on page
	const tag = document.getElementsByTagName("*");

	// Run all tags in for loop
	for (i = 0; i < tag.length; i++) {
		const el = tag[i];

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
						console.log(this.responseText);
					}

					if (this.status === 404) {
						// Nope
						el.innerHTML = "Page not found.";
					}
					// Remove attribute from element
					el.removeAttribute(keyword);
					// componentLoader();
				}
			}

			xhr.open("GET", file);
			xhr.send(el.innerHTML);

			// The cow goes moo
			return;
		}
	}
}