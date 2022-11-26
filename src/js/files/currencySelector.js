(function langSwitcher() {
	const langSwitcher = document.querySelector(".currency-selector");
	const langSwitcherOpener = document.querySelector(".currency-selector__opener");
	if (langSwitcher) {
		langSwitcherOpener.addEventListener("click", function (e) {
			langSwitcher.classList.contains('active') ? 
			langSwitcher.classList.remove('active') :
			langSwitcher.classList.add('active')
		});
	};
})()