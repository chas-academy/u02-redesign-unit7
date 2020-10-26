const menuToggler = () => {
	// Get nav content
	const navOrigin = 'header#main-header div.container';
	const navMain = document.querySelector(`${navOrigin} nav#nav-main`);
	// navMain.classList.toggle('show');

	// bodyOverlayEl.appendChild(navMain);

	// bodyOverlayEl.classList.toggle('show');
	showOverlay(navMain, navOrigin);
}