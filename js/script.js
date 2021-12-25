$(document).ready(function(){
  $('.firstslider__myslider').slick({
    speed: 1000,
    autoplay: false,
    dots: false,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="img/left.jpg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="img/right.jpg"></button>',
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  });


  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });



  function toggleClass(fuckingFuck) {
    $(fuckingFuck).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    })
  };

  toggleClass('.catalog-item__more');
  toggleClass('.catalog-item__list__back');



  $('[data-hidden=consultation]').on('click', function() {
    $('.modal, #consultation').fadeIn();
  });
  $('.hidden__close').on('click', function() {
    $('.modal, #consultation, #buy, #ty').fadeOut();
  });

  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#buy .hidden__subheader').text($('.catalog-item__name').eq(i).text());
      $('.modal, #buy').fadeIn();
    });
  });

  function validateForm(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
        },
        phone: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        }
      },
      messages: {
        name: "Пожалуйста, введите ваше имя",
        phone: "Пожалуйста, введите ваш номер",
        email: {
          required: "Пожалуйста, введите ваш E-mail", 
          email: "E-mail должен быть в формате name@domain.com"
        }
      }
    });
  };

  validateForm("#consultation-forma");
  validateForm("#consultation form");
  validateForm("#buy form");


  $('form [name=phone]').mask("+380 (99) 999-99-99");



  $('form').submit(function(e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }
    
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #buy').fadeOut();
        $('.modal, #ty').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
  });



  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.scroll-top').fadeIn('slow');
    } else {
      $('.scroll-top').fadeOut('slow');
    }
  });

  $("a.scroll-top").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      const hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });

  new WOW().init();
});