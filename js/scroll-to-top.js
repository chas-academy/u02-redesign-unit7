// Define document root element for scroll top
const rootEl = document.documentElement;

// Get the top scroll element
const topScrollEl = document.querySelector('#scroll-to-top');

// The scroll handler function is used to
// determine where visitors scroll is on page
const scrollHandler = () => {

	// Get total scroll height
	const scrollTotal = rootEl.scrollHeight - rootEl.clientHeight;

	// Declare var for when, in vertical page percent (i.e. 0.8 = 80%) scrolled,
	// we want the "scroll to top" button to show
	const breakPoint = 0.45;

	// Test current position and check against break point
	// Do not use toggle on classList. Since we're constantly
	// checking for scroll position using toggle would result
	// in very buggy behavior.
	if ((rootEl.scrollTop / scrollTotal) > breakPoint) {
		// Past breakpoint. Show button
		topScrollEl.classList.add('show');
	} else {
		// Hide button
		topScrollEl.classList.remove('show');
	}
}

// Scroll to top action function
const toTop = () => {
	// A simple vanilla JS "to top" logic
	rootEl.scrollTo({
		top: 0,
		behavior: "smooth"
	})
}

document.addEventListener('scroll', scrollHandler);
topScrollEl.addEventListener('click', toTop);