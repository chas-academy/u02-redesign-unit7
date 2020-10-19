const searchOverlay = document.getElementById('search-results-overlay');
const searchOverlayNotice = document.getElementById('search-results-overlay').querySelector('article');
const searchOverlayNoticeAnimation = document.getElementById('search-results-overlay').querySelector('.active-search.searching');
const searchField = document.getElementById('search-field');
const searchFieldButton = document.getElementById('search-field-btn');
let searchFieldButtonClick = false;

// Activate search function on search button click
const doSearchClick = () => {
	searchFieldButtonClick = true;
	doSearch(searchField);
}

// Our search function
const doSearch = async (input) => {

	// Make sure we only search on key event "enter"
	// or on search button click
	if (window.event.key === 'Enter' || searchFieldButtonClick) {

		searchOverlay.classList.toggle('active-search');
		// searchOverlay.classList.toggle('searching');

		// Reset searchFieldButtonClick to false
		// otherwise we'll keep getting hits on key down event
		searchFieldButtonClick = false;

		// Define domain we'll be fetching from
		const domain = 'https://myh.se';

		// What are we querying?
		const inputQuery = input.value;

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

		searchOverlayNotice.parentNode.removeChild(searchOverlayNotice);

		searchOverlay.insertAdjacentHTML(
			'beforeend',
			`<div class="container">
				<h3>${totalSearchResults} träffar för "${inputQuery}"</h3>
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