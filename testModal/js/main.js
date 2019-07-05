$(document).ready(function() {
	var $btnHeight=(($(window).height())/2-150);/*Чекаем высоту окна, делим пополам и отнимаем половину высоты кнопки, так она встает по центру*/
	var regularMail = /^[\w\d-_]+@[\w\d]+\.[\w]{2,6}$/i;/*регулярка для почты*/
	var regularPhone = /^[\d\(\)\+-\s]{5,20}$/;/*регулярка телефона*/
	/*Функции для валидации*/
	function invalid($input) {
		$('.error').removeClass('hide').text('Поле не должно быть пустым');/*показывает текст ошибки*/
		$($input).addClass('invalid');/*присваивает невалидному полю клас со стилем рамки*/
	}
	function valid($input) {
		$('.error').addClass('hide');/*прячет текст ошибки*/
		$($input).removeClass('invalid');/*возвращает рамку в первоначальный вид*/
	}
	$('.btn').css('top', $btnHeight);/*вертикальное выравнивание большой красной кнопки*/
	$('.btn').on('click', function() {
		$('.background, .high').toggleClass('hide');/*показываем попап и фон*/
		/* 
		Можно очистить поля формы и сбросить стили ошибок
		$('form').get(0).reset();
		$('.error').addClass('hide');
		$('input').removeClass('invalid');
		*/

	});
	/*Попап и фон*/
	$('.background').on('click',function(event) {
		$('.background, .high').addClass('hide');/*при клике на фон попап и фон пропадают*/
		event.preventDefault();
	});
	/*Кнопки логин/регистрация*/
	$('.navBtn a').on('click', function(event) {
		$(this).removeClass('passive');/*убираем класс стиля*/
		$(this).siblings('a').addClass('passive');/*добавляем класс стиля*/

		if ($(this).hasClass('enterToggle')) {/*клик по вкладке "вход*/
			$('.enter').removeClass('hide');/*показываем*/
		$('.registration').addClass('hide');/*прячем*/
	}
	if ($(this).hasClass('registrationToggle')) {/*клик по вкладке "регистрация*/
		$('.registration').removeClass('hide');/*показываем*/
	$('.enter').addClass('hide');/*прячем*/
}
event.preventDefault();
});

	/*Решил что готовыми плагинами пользоваться нельзя, поэтому вот, велосипед из костылей*/
	/*Два вида валидации у клиента:
	-при вводе;
	-перед отправкой;*/
	/*Валидация про вводе*/
	$('input').keyup(function() {
	/* Можнно сделать доппроверку при потере фокуса, но, наверное, оно того не стоит грузить систему пользователя
	Реализация через $('input').bind('blur keyup',function() {
	*/	
		if ($(this).val()=='') {/*если поле пустое*/
			invalid($(this));
		}else{
			valid($(this));/*иначе проверяем*/
			if ($(this).hasClass('email') && $(this).val().toLowerCase().search(regularMail)!=0) {/*проверка на соответствие регулярочке*/
				$('.error').removeClass('hide').text("Проверьте правильность ввода email");
				$(this).addClass('invalid');
			}
			if ($(this).hasClass('phone') && $(this).val().toLowerCase().search(regularPhone)!=0) {/*проверка на соответствие регулярочке*/
				$('.error').removeClass('hide').text("Проверьте правильность ввода Телефона");
				$(this).addClass('invalid');
			}
			if ($(this).parent().parent().hasClass('registrationForm') && $('.passwordOne').val()!=$('.passwordTwo').val() ) {/*проверка на совпадение паролей*/
				$('.error').removeClass('hide').text("Пароли не совпадают");
				$('.passwordTwo').addClass('invalid');
			}
		}
	});
	$('.registrationForm .submit').attr('disabled', 'true');
	$('.regulations input').change(function(event) {
		if(this.checked) {
        	$('.registrationForm .submit').removeAttr('disabled');
        	$(this).attr('value', 'accept');
    	}
    	else{
    		$('.registrationForm .submit').attr('disabled', 'true');
    		$(this).removeAttr('value');
    	}
	});
	/*Валидация при отправке*/
	$('.submit').on('click',function(event) {
		event.preventDefault();
		var $form=$(this).parent('form');/*сама форма*/
		var $inputs=$form.find('input');/*поля в данной форме*/
		var flag=0;/*флаг*/
		for (var i = $inputs.length - 1; i >= 0; i--) {/*проверяем все поля*/
			var $input=$inputs[i];
			var inputClass= $input['className'];
			var inputValue=$input['value'];
			if (inputClass.search('novalid')!='-1') {/*не проверяем поля с классом novalid*/
				continue;
			}
			if (inputValue!='') {/*проверка на пустоту*/
				flag++;
				if(inputClass=='email' && inputValue.toLowerCase().search(regularMail)==0){/*о5 валидация почты*/
					flag++;
				}
				if(inputClass=='phone' && inputValue.toLowerCase().search(regularPhone)==0){/*о5 валидация телефона*/
					flag++;
				}
				if(inputClass=='acceptRegulations' && inputValue=='accept'){/*о5 валидация правил*/
					flag++;
				}
				if ($(this).parent().hasClass('registrationForm') && $('.passwordOne').val()==$('.passwordTwo').val() ) /*о5 валидация паролей*/{
					flag++;
				}
			}
			else{	
				invalid($input);
				flag--;
			}
		}
		console.log(flag);
		if ($(this).parent('form').hasClass('enterForm') && flag!=3) {/*проверка флагов для первой формы*/
			$('.error').removeClass('hide').text('Проверьте заполнение полей');
			alert('Запрос не отправляем');
			return;
		}
		if ($(this).parent('form').hasClass('registrationForm') && flag!=13) {/*проверка флагов для второй формы*/
			$('.error').removeClass('hide').text('Проверьте заполнение полей');
			alert('Запрос не отправляем');
			return;
		}
		else{/*если все чинно, то зможно делать запрос на сервер, но там о5 проверить*/
			$('.background, .high').addClass('hide');
			alert('И тут полетел запрос(например AJAX), на сервере еще раз проверим данные');
		}
	});
	/*скрыть/показать пароль*/
	$('.hideShow').on('click', function(event) {
		event.preventDefault();

		$(this).siblings('input').toggleClass('show');
		if ($(this).siblings('input').hasClass('show')) {
			$(this).siblings('input').attr('type', 'text');
		}else{
			$(this).siblings('input').attr('type', 'password');
		}
	});
});