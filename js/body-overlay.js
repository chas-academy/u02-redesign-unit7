// Create section and article for search overlay
const bodyOverlayEl = document.createElement('section');

// Add id to search overlay
bodyOverlayEl.id = 'body-overlay';

// Prepend search overlay to body
// (i.e. insert it right after body tag)
document.body.prepend(bodyOverlayEl);


const bodyScrollLock = () => {
	const bodyLock = document.body;

	if (bodyOverlayEl.classList.contains('show')) {
		bodyLock.classList.toggle('scroll-lock');
	} else {
		bodyLock.classList.remove('scroll-lock');
	}
}