(function langSwitcher() {
	const langSwitcher = document.querySelector(".lang-switcher");
	const langSwitcherOpener = document.querySelector(".lang-switcher__opener");
	if (langSwitcher) {
		langSwitcherOpener.addEventListener("click", function (e) {
			langSwitcher.classList.contains('active') ? 
			langSwitcher.classList.remove('active') :
			langSwitcher.classList.add('active')
		});
	};
})()