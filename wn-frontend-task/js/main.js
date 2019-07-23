	$('.preloader__while').css('transform', 'rotate(1080deg)');
	function setCookies(){
		var date = new Date;
		date.setDate(date.getDate() + 1);
		date = date.toUTCString();
		document.cookie = 'hidePopup=true; path=/; expires='+date;
	}

	var expiresCookie=document.cookie;
	expiresCookie=expiresCookie.indexOf('hidePopup=true');
	if (expiresCookie+1==0) {
		setTimeout(function () {
			$('.popup').toggleClass('hide');
		}, 3000);
	}else{
		alert('Чтож, попап уже показан');
	}
	$('[data-close]').on('click', function() {
		$('.popup').addClass('hide');
		setCookies();
	});

	var timerId = setInterval(function() {
		var timerCount=$('.preloader__timer').html();
		$('.preloader__timer').html(timerCount-1);
	}, 1000);
	setTimeout(function() {
		clearInterval(timerId);
		$('.preloader').toggleClass('hide');
	}, 3000);