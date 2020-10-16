const menuToggler = () => {
	// alert('hello');
	const navMain = document.getElementById('nav-main');
	const bodyLock = document.body;

	bodyLock.classList.toggle('scroll-lock');
	navMain.classList.toggle('open');
}