// Lock body scroll so visitor can
// scroll overlay content only
const bodyScrollLock = () => {
	// Toggle body scroll lock on/off
	document.body.classList.toggle('scroll-lock');
}

const showOverlay = (element = null, origin = false) => {
	bodyScrollLock();
	bodyOverlayEl.classList.add('show');

	bodyOverlayContainerEl.appendChild(element);

	// Listen to click on body overlay
	bodyOverlayEl.addEventListener('click', () => hideOverlay(element, origin));
}

// Function to close overlay
const hideOverlay = (element = null, origin = false) => {

	// Remove overlay show class
	bodyOverlayEl.classList.remove('show');

	// Reset overlay content
	if (origin) {
		const elementOrigin = document.querySelector(origin);
		elementOrigin.appendChild(element);
	} else {
		bodyOverlayContainerEl.innerHTML = '';
	}

	// Release body scroll lock
	bodyScrollLock();
}

// Create section and article for search overlay
const bodyOverlayEl = document.createElement('section');
const pseudoCloseButtonEl = document.createElement('div');
const bodyOverlayContainerEl = document.createElement('div');

// Build overlay
bodyOverlayEl.id = 'body-overlay';
bodyOverlayContainerEl.classList.add('container');
pseudoCloseButtonEl.classList.add('pseudo-close-button');
bodyOverlayEl.appendChild(pseudoCloseButtonEl);
bodyOverlayEl.appendChild(bodyOverlayContainerEl);

// Prepend body overlay to document body
// (i.e. insert it right after body tag)
document.body.prepend(bodyOverlayEl);