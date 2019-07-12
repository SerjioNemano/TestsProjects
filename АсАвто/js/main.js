$(document).ready(function() {


  $('.hamburger').on('click', function() {
    $('.line__top').toggleClass('line__top_rotate');
    $('.line__midFirst').toggleClass('line__midFirst_rotate');
    $('.line__midSecond').toggleClass('line__midSecond_rotate');
    $('.line__bottom').toggleClass('line__bottom_rotate');

    if ($('.menu_header').hasClass('hide')) {
      $('.menu_header').slideDown();
      $('.menu_header').toggleClass('hide');
    }else{
      $('.menu_header').slideUp();
      $('.menu_header').toggleClass('hide');
    }
  });
  $('.slick-slider').slick({
    infinite: true,
    slidesToShow: 7,
            autoplay: true,
        autoplaySpeed: 2000,
    slidesToScroll: 1,
    prevArrow: '<button class="chevronBtn chevronLeft"><div class="chevron"><div class="chevron__item chevron__item_top chevronLeft__item_top"></div><div class="chevron__item chevron__item_bottom chevronLeft__item_bottom"></div></div></button>',
    nextArrow: '<button class="chevronBtn chevronRight"><div class="chevron"><div class="chevron__item chevron__item_top chevronRight__item_top"></div><div class="chevron__item chevron__item_bottom chevronRight__item_bottom"></div></div></button>',
    responsive: [
    {
      breakpoint: 1093,
      settings: {
                autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 6
      }
    },
    {
      breakpoint: 854,
      settings: {
                autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 5,
      }
    },  
    {
      breakpoint: 810,
      settings: {
        slidesToShow: 4,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
      }
    },
    {
      breakpoint: 425,
      settings: {
        slidesToShow: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
      }
    } 
    ]
  });
  $('.galleryContainer').masonry({
    itemSelector: '.gallery__content',
    columnWidth: 2,
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
  $error.removeClass('displayNone').css('color', 'red');
}
function valid($val) {
// var $error=$('.form__error');
$($val).css('box-shadow', ('0 0 9px 1px green'));
$error.addClass('displayNone');
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
    $('.error').removeClass('displayNone').text('Проверьте заполнение полей');
    alert('Запрос не отправляем');
    return;
  }
  else{/*если все чинно, то зможно делать запрос на сервер, но там о5 проверить*/
    $('.background, .high').addClass('displayNone');
    alert('И тут полетел запрос(например AJAX), на сервере еще раз проверим данные');
  }
});


});