const componentLoader = () => {

	// Define keyword
	const keyword = 'component';

	// Assign const componentElemets to all elements with keyword attribute on page
	const componentElemets = document.querySelectorAll(`[${keyword}]`);

	// Run all elements in for each loop
	componentElemets.forEach(async (el) => {

		// Get file location from element atrribute
		const file = el.getAttribute(keyword);

		if (file) {
			const fetchResponse = await fetch(file);
			const html = fetchResponse.ok ? await fetchResponse.text() : false;
			// If HTML string is not false add it to element
			if (html)
				el.insertAdjacentHTML(
					'afterbegin',
					html
				);

			// Remove attribute from element
			el.removeAttribute(keyword);
		}
	})
}
// Run function
componentLoader();