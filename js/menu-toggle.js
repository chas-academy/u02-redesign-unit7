const menuToggler = () => {

	// Get nav content
	const navOrigin = 'header#main-header div.container';
	const navMain = document.querySelector(`${navOrigin} nav#nav-main`);

	showOverlay(navMain, navOrigin);
}