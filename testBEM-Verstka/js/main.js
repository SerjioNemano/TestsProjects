$(document).ready(function() {

	var $galleryBlock= $('.galleryBlock__showcontent').hover(function() {
		$(this).toggleClass('galleryBlock__showcontent_justify');
		$(this).find('.galleryBlock__tile').toggleClass('galleryBlock__tile_white');
		$(this).find('.galleryBlock__hidecontent, .btn').toggleClass('hide');
	});

	$(".owl-carousel").owlCarousel({
		items:1,
	});

	$('.owl-dots').addClass('container');

	$('.slick-slider').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow: '<button class="prev chevron chevron_left" type="button "><div class="chevron__container"><div class="chevron__item chevron__item_top"></div><div class="chevron__item chevron__item_bottom"></div></div></button>',
		nextArrow: '<button class="next chevron chevron_right"  type="button"><div class="chevron__container">	<div class="chevron__item chevron__item_top_right chevron__item_top"></div>	<div class="chevron__item chevron__item_bottom_right chevron__item_bottom"></div></div></button>'
	});
	$('.carusel-slider').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow: '<button class="prev chevron chevron_bgw chevron_left" type="button "><div class="chevron__container"><div class="chevron__item chevron__item_top"></div><div class="chevron__item chevron__item_bottom"></div></div></button>',
		nextArrow: '<button class="next chevron chevron_bgw chevron_right"  type="button"><div class="chevron__container">	<div class="chevron__item chevron__item_top_right chevron__item_top"></div>	<div class="chevron__item chevron__item_bottom_right chevron__item_bottom"></div></div></button>'
	});

	var $showNewsBtn=$(".allNews");
	$showNewsBtn.on('click', function() {
		$(this).toggleClass('showAll hideAll');
		if ($(this).hasClass('showAll')) {
			$(this).html('Все Акции Компании');
		}else{
			$(this).html('Скрыть Акции Компании');
			alert('Тут я хотел сделать разворачивающийся список с акциями, но элементы слика уже в доме и удалять их такая себе идея.Вариант- размещать новости в модальном окне, но это надо их о5 прописывать в html, даже если пользователю они не нужны. Если бы страница заполнялась динамически, то можно было подгрузить новости в модальное окно из базы, с какой-нтбудь ajax подгрузкой или добавить пагинацию. Как вариант сделать ссылку на другую страницу, где и будут отображаться все новости.');
		}
	});
	$('.slide').hover(function() {
		$(this).find('.slide__curtain').addClass('slide__curtain_hover');
		$(this).find('.slide__curtain').children('.bermudaTriangle').removeClass('hide')
	}, function() {
		$(this).find('.slide__curtain').removeClass('slide__curtain_hover');
		$(this).find('.slide__curtain').children('.bermudaTriangle').addClass('hide')

	});

	$(".imageFancy").fancybox({
		'autoSize':false,
	});
	/*Валидация формы обратной связи*/
	/*Решил показать свой велосипед из костылей*/
/*Два вида валидации у клиента:
-при вводе;
-перед отправкой;*/
/*Валидация про вводе*/

var $error=$('.form__error');
function invalid($val) {
	$($val).css('box-shadow', ('0 0 9px 1px red'));
	$error.removeClass('hide').css('color', 'red');
}
function valid($val) {
// var $error=$('.form__error');
$($val).css('box-shadow', ('0 0 9px 1px green'));
$error.addClass('hide');
}
var regularMail = /^[\w\d-_]+@[\w\d]+\.[\w]{2,6}$/i;/*регулярка для почты*/
var regularPhone = /^[\d\(\)\+-\s]{5,20}$/;/*регулярка телефона*/
$('.form__Area').keyup(function() {
/* Можнно сделать доппроверку при потере фокуса, но, наверное, оно того не стоит- грузить систему пользователя
Реализация через $('input').bind('blur keyup',function() {
	*/	
	if ($(this).val()=='') {/*если поле пустое*/
		invalid($(this));
		$error.text('Поле не должно оставаться пустым')
	}else{
		valid($(this));
		if ($(this).hasClass('form__email') && $(this).val().toLowerCase().search(regularMail)!=0) {/*проверка на соответствие регулярочке*/
			invalid($(this));
			$error.text("Проверьте правильность ввода email");
		}
		if ($(this).hasClass('form__phone') && $(this).val().toLowerCase().search(regularPhone)!=0) {/*проверка на соответствие регулярочке*/
			$error.text("Проверьте правильность ввода Телефона");
			invalid($(this));
		}

	}
});
/*Валидация при отправке*/
$('.form__btn').on('click',function(event) {
	event.preventDefault();
	var $form=$(this).parent('form');/*сама форма*/
	var $inputs=$form.find('.form__Area');/*поля в данной форме*/
	var flag=0;/*флаг*/
	for (var i = $inputs.length - 1; i >= 0; i--) {/*проверяем все поля*/
		var $input=$inputs[i];
		var inputClass= $input['className'];
		var inputValue=$input['value'];

		if (inputValue!='') {/*проверка на пустоту*/
			flag++;
			if(inputClass=='form__email' && inputValue.toLowerCase().search(regularMail)==0){/*о5 валидация почты*/
				flag++;
			}
			if(inputClass=='form__phone' && inputValue.toLowerCase().search(regularPhone)==0){/*о5 валидация телефона*/
				flag++;
			}
		}
		else{	
			invalid($input);
			flag--;
		}
	}
	if (flag!=4) {/*проверка флагов для первой формы*/
		$('.error').removeClass('hide').text('Проверьте заполнение полей');
		alert('Запрос не отправляем');
		return;
	}
	else{/*если все чинно, то зможно делать запрос на сервер, но там о5 проверить*/
		$('.background, .high').addClass('hide');
		alert('И тут полетел запрос(например AJAX), на сервере еще раз проверим данные');
	}
});

});
