// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


document.addEventListener("watcherCallback", function (e) {
	// Полная информация от наблюдателя
	const entry = e.detail.entry;
	// Наблюдаемый объект
	const targetElement = entry.target;
   const toTop2=document.querySelector('.back-to-top');
   if(toTop2){
      targetElement.classList.contains('footer._watcher-view') ? toTop2.classList.add('fixed'):toTop2.classList.remove('fixed');
   }

});
var a = 'active';



// no skroll

var block = $('<div>').css({'height':'50px','width':'50px'}),
	indicator = $('<div>').css({'height':'200px'});

$('body').append(block.append(indicator));
var w1 = $('div', block).innerWidth();    
block.css('overflow-y', 'scroll');
var w2 = $('div', block).innerWidth();
$(block).remove();

var scrollbar = w1 - w2;

$(':root').css('--scroll', scrollbar + 'px');



// Images scroll

var index_active = 0;

function imagesAnimation(e) {
	var e = $(e),
		wrapper = e.parents('.images__scroll-wrapper'),
		top = wrapper.offset().top,
		childrens = e.children(),
		step_height = wrapper.height() / childrens.length,
		scroll = $(window).scrollTop() + $(window).height(),
		position = e.attr('data-position');

	if (!position) {
		position = 2;
	}
		
	if (scroll >= top) {
		if (wrapper.hasClass('main')) {
			var index = scroll / step_height;
		} else {
			var index = (scroll - top) / step_height;
		}

		var index = index.toFixed(0) - 1;

		if (index >= 0 && index_active != index && index < childrens.length) {

			if (!wrapper.hasClass('main') || index >= 60) {
				childrens.removeClass(a);
				$(childrens).eq(index).addClass(a);
			}

			index_active = index;

			if (index_active >= 100) {
				wrapper.addClass('hide');
			} else {
				wrapper.removeClass('hide');
			}
		}
	}
}

var images = $('.images__scroll').each(function () {
	var e = $(this);
});

$(window).scroll(function () {
   for (var i = images.length - 1; i >= 0; i--) {

   		var e = $(images[i]);

    	if ($(window).scrollTop() <= e.offset().top && 
    		$(window).scrollTop() <= e.offset().top + e.height()) {
    		imagesAnimation(e);
    	}
    } 
})



// Ribbon scroll

$(window).scroll(function () {
	$('.ribbon_wrapper').each(function () {
		var e = $(this);

		if ($(window).width() <= 600 - scrollbar) {
			size = -1000;
		} else {
			size = -2000;
		}

		if (e.offset().top <= $(window).scrollTop() + $(window).height() * 1.5 && 
			e.offset().top + e.height() >= $(window).scrollTop()) {
			var first = e.find('.ribbon:first-child'),
				last = e.find('.ribbon:last-child'),
				calc_first = size + ($(window).scrollTop() - e.offset().top) / 10;
				calc_last = size - ($(window).scrollTop() - e.offset().top) / 10;

			first.css('transform', 'rotate(8deg) translate3d(' + calc_first + 'px, 0, 0)');
			last.css('transform', 'rotate(-7deg) translate3d(' + calc_last + 'px, 0, 0)');
		}
	})
});



// Roadmap scroll

if ($(window).width() >= 900 - scrollbar) {
	$(document).ready(function () {
		var e = $('.roadmap'),
			width = $('.roadmap_wrapper').width(),
			hh = $(window).width() * 1.5;

		e.height(width + hh);

		$(window).scroll(function () {
			var scroll = ($(window).scrollTop() + $(window).height() - e.offset().top) * -1 + $(window).width() * 2;

			if (scroll <= e.height() - hh) {
				$('.roadmap_scroll').css('transform', 'translate3d(' + scroll + 'px, 0, 0)');
			}
		})

	})
	var path = document.getElementById('check'),
		width = $('#check').parents('svg').width(),
		len = Math.round(path.getTotalLength()),
		dots = [],
		radial = [];

	$('.roadmap_timelaps').css('width', width)

	$('#dots rect').each(function () {
		dots.push($(this).attr('x'));
	})

	$('.radial').each(function () {
		radial.push($(this).find('rect').attr('transform').split(' ')[0].replace(/[^+\d]/g, ''));
	})

	$('#check').attr('stroke-dasharray', len);
	path.style.strokeDashoffset = len;

	$(window).scroll(function () {
		var scroll = $('.roadmap_timelaps').offset().left - $(window).width() / 2,
			scroll = scroll / width,
			scroll = scroll * len;

		if (scroll <= 0) {
			myPlay(scroll);
		}
	})

	function myPlay(scroll) {
		path.style.strokeDashoffset = len + scroll;

		scroll = scroll * -1;

		for (var i = dots.length - 1; i >= 0; i--) {
			dots[i]
			if (scroll >= dots[i]) {
				$('#dots rect').eq(i).css('fill', 'var(--green)');
			} else {
				$('#dots rect').eq(i).css('fill', 'var(--gray)');
			}
		}

		for (var i = radial.length - 1; i >= 0; i--) {
			radial[i]
			if (scroll >= radial[i]) {
				$('.radial').eq(i).addClass(a).find('path').css('fill', 'var(--green)');
			} else {
				$('.radial').eq(i).removeClass(a).find('path').css('fill', 'var(--gray)');
			}
		}
	}
} else {
	var path = document.getElementById('check_mobile'),
		width = $('#check_mobile').parents('svg').height(),
		len = Math.round(path.getTotalLength()),
		dots = [],
		radial = [];

	$('#dots_mobile rect').each(function () {
		dots.push($(this).attr('y'));
	})

	$('.radial_mobile').each(function () {
		radial.push($(this).find('rect').attr('transform').replace(/^[^ ]+/, '').split(')')[0]);
	})

	$('#check_mobile').attr('stroke-dasharray', len);
	path.style.strokeDashoffset = len;

	$(window).scroll(function () {
		var scroll = $(window).scrollTop() - $('.roadmap_timelaps').offset().top + $(window).height() / 2,
			scroll = scroll / width,
			scroll = scroll * len;

		if (scroll >= 0 && scroll <= len) {
			myPlay_mobile(scroll);
		}
	})

	function myPlay_mobile(scroll) {
		path.style.strokeDashoffset = len - scroll;



		for (var i = dots.length - 1; i >= 0; i--) {
			dots[i]
			if (scroll >= dots[i]) {
				$('#dots_mobile rect').eq(i).css('fill', 'var(--green)');
			} else {
				$('#dots_mobile rect').eq(i).css('fill', 'var(--gray)');
			}
		}

		for (var i = radial.length - 1; i >= 0; i--) {
			radial[i]
			if (scroll >= radial[i]) {
				$('.radial_mobile').eq(i).addClass(a).find('path').css('fill', 'var(--green)');
			} else {
				$('.radial_mobile').eq(i).removeClass(a).find('path').css('fill', 'var(--gray)');
			}
		}
	}
}



// Bar

function barClosed() {
	$('header, .bar_burger').removeClass(a);
	$('.bar_wrapper').slideUp();
	$('html').removeClass('hidden');
}

$('.bar_burger').on('click', function () {
	if ($(this).hasClass(a)) {
		barClosed()
	} else {
		$(this).addClass(a);
		$('header').addClass(a);
		$('.bar_wrapper').slideDown();
		$('html').addClass('hidden');
	}
});



// Media

$(document).ready(media);
$(window).resize(media);

function media() {
	var w = $(window).width();

	if (w <= 1030 - scrollbar) {
		$('#nav-desktop > *').detach().prependTo('#nav-table');
	} else {
		$('#nav-table > *').detach().prependTo('#nav-desktop');
	}

	if (w <= 900 - scrollbar) {
		$('#crocs-desktop > *').detach().prependTo('#crocs-mobile');
	} else {
		$('#crocs-mobile > *').detach().prependTo('#crocs-desktop');
	}

	$(':root').css('--header', $('header').height() + 'px');
}



// Audio

// var sound = false;

// $(document).on('click', '.header_sound', function () {
// 	sound = !sound;

// 	return sound;
// });


// if (sound) {
	$(document).on('mouseenter', 'a', function () {
		$('#hover').trigger('play')
	})

	$(document).on('mouseleave', 'a', function () {
		$('#hover').trigger('pause')
	})
// }




// Preloader

$(document).ready(function(){
    
});

$(window).on('load', function () {
	$('.preloader').addClass('stop');

	setTimeout(function(){
      window.scrollTo(0, 0);
		$('.preloader').addClass(a);
   }, 1);

	setTimeout(function() {
		$('.preloader').addClass('hidden');

		var i = 0;

		setInterval(function () {
			if (i <= 60) {
				$('.main_crocs picture').removeClass(a);
				$('.main_crocs picture').eq(i).addClass(a);
				i++;
			}
		}, 50)

		setTimeout(function() {
			$('html').removeClass('hidden');
		}, 3600);
	}, 1000);
})



// Lazy loading img

// var lazy = 0;

// $(window).scroll(function () {
// 	if (lazy == 0 && $(window).scrollTop() >= 100) {
// 		$('picture').each(function () {
// 			var src = $(this).attr('data-src');

// 			if (src) {
// 				$(this).append('<source srcset="images/' + src + '.webp" type="image/webp"><img width="1" height="1" src="images/' + src + '.png" alt srcset="images/' + src + '.png 1x, images/' + src + '@2x.png 2x">');
// 			}
// 		})

// 		lazy++;
// 	}
// })



// Scroll animation

var scrollAnim = 0;

$(window).on('load', function () {
    lax.init()

    lax.addDriver('scrollY', function () {
      return window.scrollY
    })

    // Under cards

	lax.addElements('.under_images', {
	  scrollY: { 
	  	translateZ: [
	  		['elInY'],
	    	[0]
	  	],
	    translateY: [
	    	['elInY', 'elInY + 200'],
	    	[0, '-120']
	    ],
	  }
	})



    // Card

	lax.addElements('.card', {
	  scrollY: { 
	  	translateZ: [
	  		['elInY'],
	    	[2]
	  	],            
	    scale: [         
	      ['elInY', 'elCenterY - elHeight / 20'],
	      [1.05, 1], 
	    ],
	    opacity: [
		    ['elCenterY', 'elOutY'],
		    [1, 0]
	    ]
	  }
	})



	// Crocs

	lax.addElements('.population_items', {
	  scrollY: {              
	    rotate: [         
	      ['elInY', 'elCenterY - elHeight / 8'],
	      [-50, 0], 
	    ]
	  }
	})


	// Crocs play

	lax.addElements('.population_item_play', {
	  scrollY: {              
	    rotate: [         
	      ['elInY', 'elOutY + elHeight'],
	      [180, 0], 
	    ],
	    scale: [
		    ['elInY', 'elOutY'],
		    [.3, 1.6]
	    ]
	  }
	})


	// Crocs veil

	lax.addElements('.population_items_veil', {
	  scrollY: {
	  	translateZ: [
	  		['elInY'],
	    	[0]
	  	],          
	    opacity: [         
	      ['elCenterY', 'elCenterY + screenHeight / 2'],
	      [0, 1], 
	    ]
	  }
	})

	// Sale

	lax.addElements('.sale', {
	  scrollY: {
	  	translateZ: [
	  		['elInY'],
	    	[0]
	  	],
	    translateY: [
	    	['elInY', 'elInY + screenHeight / 2'],
	    	[0, 'screenHeight / -2']
	    ]
	  }
	})

	// Sale background

	lax.addElements('.sale_pink', {
	  scrollY: {
	  	translateZ: [
	  		['elInY'],
	    	[0]
	  	],
	    opacity: [
	    	['elInY + screenHeight', 'elInY + screenHeight + 200'],
	    	[0, 1]
	    ]
	  }
	})

	// Utility Top

	lax.addElements('.utility_top', {
	  scrollY: {
	  	translateZ: [
	  		['elInY'],
	    	[0]
	  	],
	    translateY: [
	    	['elInY - screenHeight / 2 + 200', 'elInY + screenHeight / 2'],
	    	[0, 'elHeight / -1.1']
	    ],
	  }
	})

	// Utility croc

	lax.addElements('.utility_croc', {
	  scrollY: {              
	    translateY: [         
	      ['elInY', 'elInY + screenHeight / 1.5'],
	      {
	      	1000: ['screenHeight', 'elHeight / -2'],
	      	3000: ['screenHeight', 0]
	      } 
	    ],
	    translateX: [
	    	['elInY'],
	    	['elWidth / -2']
	    ]
	  }
	})

	// Utility word top

	lax.addElements('.utility_info_top span', {
	  scrollY: {
	    translateX: [
	    	['elInY + screenHeight / 2', 'elInY + screenHeight / 1.1'],
	    	['elWidth * -1.5', 0]
	    ],
	  }
	})

	// Utility word bottom

	lax.addElements('.utility_info_bottom span', {
	  scrollY: {
	    translateX: [
	    	['elInY', 'elInY + screenHeight / 3'],
	    	['elWidth * 1.5', 0]
	    ]
	  }
	})

	// Utility lable

	lax.addElements('.utility_info_label', {
	  scrollY: {
	    opacity: [
	    	['elInY + screenHeight / 1.1', 'elInY + screenHeight'],
	    	[0, 1]
	    ],
	  }
	})

	// Utility text

	lax.addElements('.utility_info_text', {
	  scrollY: {
	    opacity: [
	    	['elInY + screenHeight / 4', 'elInY + screenHeight / 2'],
	    	[0, 1]
	    ],
	  }
	})

	// Utility view

	lax.addElements('.utility_view', {
	  scrollY: {
	  	translateZ: [
	  		['elInY'],
	    	[0]
	  	],
	    opacity: [
	    	['elOutY - screenHeight * 1.2 ', 'elOutY - screenHeight'],
	    	[0, 1]
	    ],
	  }
	})

	// Discord arrow desctop

	lax.addElements('.discord_center .arrow_desktop path', {
	  scrollY: {
	  	translateZ: [
	  		['elInY'],
	    	[0]
	  	],
	    translateX: [
	    	['elInY', 'elInY + 200'],
	    	['elWidth * -1', 0]
	    ],
	  }
	})
})



// Utility animate

$(window).scroll(function () {
	if ($(window).scrollTop() >= $('.utility').offset().top - $(window).height() / 4) {
		$('.utility').addClass(a);
	} else {
		$('.utility').removeClass(a);
	}
})



// Медленный сролл к якорю

function cursorLoad() {
	var e = event,
		pos = $('.load').offset(),
    	elem_left = pos.left,
    	elem_top = pos.top,
    	Xinner = e.pageX - elem_left,
    	Yinner = e.pageY - elem_top;
    
    $('.load_cursor').css({
    	'top': Yinner + 16,
    	'left': Xinner + 4
    })
}

function scroll_to(e) {
	$('.load').addClass(a);

	setTimeout(function() {
		if ($('.bar_burger').hasClass(a)) {
			barClosed()
		}
	}, 800);

	setTimeout(function() {
		if ($(e).length != 0) {
			$('html, body').animate({
				scrollTop: $(e).offset().top - $('header').height()
			}, 0);
		}
		$('.load').removeClass(a);
	}, 1000);

	cursorLoad();
}

$(document).mousemove(function(e){
	if ($('.load').hasClass(a)) {
		cursorLoad(e);
	}
});   



// Discord crocs animation

var interval;

$(window).scroll(function () {
	if($(window).scrollTop() + $(window).height() >= $('.discord').offset().top) {
		clearInterval(interval);

		interval = setInterval(function() {
			e = $('.discord_center_crocs picture.active');

			if (e.next().length) {
				e.removeClass(a).next().addClass(a);
			} else {
				e.removeClass(a);
				$('.discord_center_crocs picture').eq(0).addClass(a);
			}

		}, 500);
	} else {
		clearInterval(interval);
	}
})



// Header color

$(document).ready(function () {
	var green_top = $('#population').offset().top,
		green_bottom = $('#population').offset().top + $('#population').height(),
		green_inner = $(window).height(),
		pink_top = $('#sale').offset().top,
		pink_bottom = $('#sale').offset().top + $('#sale').height();

	if ($(window).width() <= 1030 - scrollbar) {
		green_inner = $('header').height();
	}

	$(window).scroll(function () {
		var w = $(window).scrollTop();

		if (w >= green_top - green_inner && w <= green_bottom - $(window).height()) {
			$('header').addClass('green');
		} else {
			$('header').removeClass('green');
		}

		if (w >= pink_top && w <= pink_bottom - $('.utility_top').height() / 2) {
			$('header').addClass('pink');
		} else {
			$('header').removeClass('pink');
		}
	})
})