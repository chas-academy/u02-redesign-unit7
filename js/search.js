// Create section and article for search overlay
const searchOverlayEl = document.createElement('section');
const searchOverlayArticleEl = document.createElement('article');

// Add content to article element
searchOverlayArticleEl.innerHTML = 'SÖKER';

// Add id to search overlay
searchOverlayEl.id = 'search-results-overlay';

// Append article element to search overlay
searchOverlayEl.appendChild(searchOverlayArticleEl);

// Prepend search overlay to body
// (i.e. insert it right after body tag)
document.body.prepend(searchOverlayEl);

// Get search box element
const searchBoxEl = document.getElementById('search-box');
const searchFiedlEl = searchBoxEl && searchBoxEl.querySelector('input')
const searchButtonEl = searchBoxEl && searchBoxEl.querySelector('button')

// Make sure that searchFiedlEl is fetched
// Add event listener, click, to search button
// When we click it, run function
searchFiedlEl.addEventListener('keydown', () => {
	window.event.key === 'Enter' && doSearch(searchFiedlEl);
});

// Make sure that searchButtonEl is fetched
// Add event listener, click, to search button
// When we click it, run function
searchButtonEl.addEventListener('click', () => {
	doSearch(searchFiedlEl, true);
});

// Our search function
// Default input to null and fromClick check false
const doSearch = async (input = null) => {

	// Make sure input isn't null otherwise return false
	const inputQuery = input !== null ? input.value : false;

	// If inputQuery is false or empty string
	if (!inputQuery || inputQuery === '') {

		// Let user know that we can't perform search on empty string
		alert('Du har inte anget någonting att söka efter');

	} else {

		// We have input
		// Let visitor know we are working
		searchOverlayEl.classList.toggle('active-search');

		// Define domain we'll be fetching from
		const domain = 'https://myh.se';

		// Build query URL
		const domainQuery = `${domain}/Sok/?q=${inputQuery}`;

		// Following variables need to be outside of query function

		// default pagination(total/page) count to 0 (zero)
		let paginationTotal = 0;
		let paginationPage = 1;

		// default total search results to 0 (zero)
		let totalSearchResults = 0;

		// Set number of max results per page
		const maxPageResult = 20;

		// Initiate new empty array for better handling of results
		const resultsArray = [];

		// Set up query function
		const getQueryResults = async (url) => {

			// Concat pagination info to URL
			const queryUrl = url.concat(`&p=${paginationPage}`);

			// default search results to new empty array
			let searchResults = new Array;

			// Test steps/catch errors
			try {
				// Fetch data from existing search function
				const fetchResponse = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(queryUrl)}`.trim());

				// If fetch OK await JSON response else return false
				const jsonResponse = fetchResponse.ok ? await fetchResponse.json() : false;

				// If JSON success get contents else return false
				const html = jsonResponse ? jsonResponse.contents : false;

				// If html has content do DOM parse and get childenodes else return false
				const htmlNodeList = html ? new DOMParser().parseFromString(html, 'text/html').body.childNodes[67] : false;

				// If node 67 (#huvudinnehall, main body content) from htmlNodeList exists and is not false
				if (typeof htmlNodeList !== "undefined" && htmlNodeList) {

					if (paginationTotal === 0 && totalSearchResults == 0) {
						// Get total number of search results
						totalSearchResults = htmlNodeList.querySelector('.main-search-meta strong').innerHTML;

						// Divide total number of search results with max page result
						// to find out if there are more than one page with results
						paginationTotal = Math.ceil(totalSearchResults / maxPageResult);
					}

					// Get all search result articles
					searchResults = htmlNodeList.getElementsByClassName('article-item');
				}

				// If there are more than 0 search results start iterating results
				if (searchResults.length) {
					// Set array for node HTMLCollection from search results and do for each loop
					Array.from(searchResults).forEach(result => {

						// Get heading content
						const heading = result.querySelector('h2 a');
						// Set up headline variables
						// Deconstruct heading object
						const { innerHTML: headline } = heading;
						// Create correct URL for resulting, external, page
						const articleLink = `${domain}${heading.getAttribute('href')}`;

						// Set up body and get compact text + last update date of article
						const body = result.querySelector('div.article-text');
						const content = body.querySelector('p.compact').innerHTML;
						const dateString = body.querySelector('p.article-date').innerHTML;

						// Let's clean date string for better control
						// Start by regex removing non-date chars
						const cleanDateString = dateString.replace(/.*:\s(.*)/gi, '$1');
						// Create timestamp from date string
						const dateTimeStamp = new Date(cleanDateString);
						// Set up locale date string from timestamp
						const localeDate = dateTimeStamp.toLocaleDateString(
							'sv-SE',
							{
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})

						// Push variables to new object in custom array
						resultsArray.push({
							headline: headline,
							url: articleLink,
							body: content,
							date: localeDate,
						})
					});

				}

				// If total pages > 1 and current page < total pages
				if (paginationTotal > 1 && paginationPage < paginationTotal) {

					// Add +1 to current result page iteration
					paginationPage++;

					// Re-run function
					// This will continue until all result pages are done
					await getQueryResults(url);
				}

				// Return an array, with or without objects
				return resultsArray;
			} catch (err) {
				// Log out error
				console.log(err);

				// Return 401 code
				return 401;
			}
		}

		const resultItems = await getQueryResults(domainQuery);

		searchOverlayArticleEl.classList.toggle('hide');
		// searchOverlayNotice.parentNode.removeChild(searchOverlayNotice);

		searchOverlayEl.insertAdjacentHTML(
			'beforeend',
			`<div class="container">
				<h3>Din sökning gav ${totalSearchResults} träffar för "${inputQuery}"</h3>
				<ul>
				${resultItems.map(item => {
				const { headline, url, body, date } = item;
				return `<li>
								<a href="${url}"><strong>${headline}</strong></a>
								<time>${date}</time>
								<p>${body}</p>
							</li>`;
			}).join('')}</ul >
			</div>`
		);

	}
}
