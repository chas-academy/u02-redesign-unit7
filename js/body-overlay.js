// Lock body scroll so visitor can
// scroll overlay content only
const bodyScrollLock = (state) => {

	// Toggle body scroll lock on/off
	if (state) {
		document.body.classList.add('scroll-lock');
	} else {
		document.body.classList.remove('scroll-lock');
	}
}

const showOverlay = (element = null, origin = false) => {
	bodyScrollLock(true);
	bodyOverlayEl.classList.add('show');

	bodyOverlayContainerEl.appendChild(element);

	// Listen to click on body overlay
	bodyOverlayEl.addEventListener('click', () => hideOverlay(element, origin));
}

// Function to close overlay
const hideOverlay = (element = null, origin = false) => {

	// Remove overlay show class
	bodyOverlayEl.classList.remove('show');

	// Release body scroll lock
	bodyScrollLock(false);

	// Reset overlay content
	if (origin) {
		const elementOrigin = document.querySelector(origin);
		elementOrigin.appendChild(element);
	} else {
		bodyOverlayContainerEl.innerHTML = '';
	}
}

// Create section and article for search overlay
const bodyOverlayEl = document.createElement('section');
const closeButtonEl = document.createElement('button');
const bodyOverlayContainerEl = document.createElement('div');

// Build overlay
bodyOverlayEl.id = 'body-overlay';
bodyOverlayContainerEl.classList.add('container');
closeButtonEl.classList.add('close-button');
bodyOverlayEl.appendChild(closeButtonEl);
bodyOverlayEl.appendChild(bodyOverlayContainerEl);

// Prepend body overlay to document body
// (i.e. insert it right after body tag)
document.body.prepend(bodyOverlayEl);