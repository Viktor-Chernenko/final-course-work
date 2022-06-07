$(function (event) {
	$('.card_bezlimit select').each(function () {
		var $this = $(this),
			numberOfOptions = $(this).children('option').length;
		$this.addClass('s-hidden');
		$this.wrap('<div class="select"></div>');
		$this.after('<div class="styledSelect"></div>');
		var $styledSelect = $this.next('div.styledSelect');
		//$styledSelect.text($this.children('option').eq(0).text());
		$styledSelect.text($this.children('option:selected').text());
		var $list = $('<ul />', {
			'class': 'options'
		}).insertAfter($styledSelect);
		for (var i = 0; i < numberOfOptions; i++) {
			$('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val()
			}).appendTo($list);
		}
		var $listItems = $list.children('li');
		$styledSelect.click(function (e) {
			e.stopPropagation();
			$('div.styledSelect.active').each(function () {
				$(this).removeClass('active').next('ul.options').hide();
			});
			$(this).toggleClass('active').next('ul.options').toggle();
		});
		$listItems.click(function (e) {
			e.stopPropagation();
			$styledSelect.text($(this).text()).removeClass('active');
			$this.val($(this).attr('rel'));
			$list.hide();
			/* alert($this.val()); Uncomment this for demonstration! */
		});

		$(document).click(function () {
			$styledSelect.removeClass('active');
			$list.hide();
		});

	});

	$("#back-top").hide();
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#back-top').fadeIn();
			} else {
				$('#back-top').fadeOut();
			}
		});
		$('#back-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});

	$('.dropdown-custom>a').on('click', function (e) {
		//jQuery('.dropdown-custom>a').hover(function(e) {
		e.preventDefault();
		jQuery('.dropdown-custom-box').removeClass('d-block');
		jQuery(this).siblings().toggleClass('d-block');
	});
	$('.dropdown-custom-close').on('click', function (e) {
		e.preventDefault();
		jQuery('.dropdown-custom-box').removeClass('d-block');
	});

	$('.buy_button.buy_type').on('click', function (e) {
		e.preventDefault();
		var name = jQuery(this).attr('data-type');
		jQuery('.excalc-type select').val(name);
	});

	$('.buy_button.fastordersert').on('click', function (e) {
		e.preventDefault();
		var name = jQuery(this).attr('data-sert');
		jQuery('#sert').val(name);
	});

	$('.buy_button.fastorderabon').on('click', function (e) {
		e.preventDefault();
		var name = jQuery(this).attr('data-abon');
		jQuery('#abon').val(name);
	});

	$('#accordion .vakans').on('click', function (e) {
		e.preventDefault();
		var name = jQuery(this).attr('data-vakans');
		var divs = jQuery(this).attr('data-target');
		jQuery(divs).find('#vakans').val(name);
	});

	$('.events-item .zakaz').on('click', function (e) {
		e.preventDefault();
		var name = jQuery(this).attr('data-meropriatie');
		jQuery('#meropriatie').val(name);
	});

	$("#cb2 .btn.btn-yellow").on("click", function (event) {
		event.preventDefault();
		var email = jQuery("#EmailPriceList").val();
		if (email) {
			var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
			if (pattern.test(email)) {
				jQuery("#EmailPriceList").css("border-color", "green");
				jQuery.ajax({
					url: "/wp-admin/admin-ajax.php",
					method: 'post',
					data: {
						action: 'send_price_email',
						email: email
					},
					success: function (response) {
						jQuery('#modal-price-result').html(response).show();
					}
				});
			} else {
				jQuery("#EmailPriceList").css("border-color", "red");
			}
		} else {
			jQuery("#EmailPriceList").css("border-color", "red");
		}
	});

	$('.navbar-lang .nav-item').on('click', function (e) {
		e.preventDefault();
		jQuery('.navbar-lang .nav-item.active').toggleClass('active');
		jQuery(this).toggleClass('active');
	});

	$('.title.check .form-check-input:checkbox').change(function () {
		if (jQuery(this).is(":checked")) {
			jQuery('#info_tabs #tab1').addClass('collapse');
			jQuery('#info_tabs #tab2').removeClass('collapse');
			jQuery('#btn-all-yellow').attr("href", "/attraktsiony-i-lokatsii-loc/").text('Все тематические площадки');
		} else {
			jQuery('#info_tabs #tab2').addClass('collapse');
			jQuery('#info_tabs #tab1').removeClass('collapse');
			jQuery('#btn-all-yellow').attr("href", "/places/attractions/").text('Все аттракционы');
		}
	});

	jQuery('input[type="phone"]').mask("+7(999)999-99-99");
	jQuery('input[type="tel"]').mask("+7(999)999-99-99");

	var lightbox = $('.master-slider a').simpleLightbox();

	$('.main-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 5000,
		dots: true,
		infinite: true,
		adaptiveHeight: false,
		pauseOnFocus: false,
		pauseOnHover: false,
		responsive: [{
			breakpoint: 767,
			settings: {
				arrows: true,
			}
		}]
	});

	// bezlimit_card start
	$('.card_bezlimit_all *').on('click', function () {
		var man = $('.card_bezlimit_all .bezlimit-select-man + .styledSelect').html()[0];
		var day = $('.card_bezlimit_all .bezlimit-select-day + .styledSelect').html() == "Будни" ? 1 : 2;
		var html = $(".card_bezlimit_all .bezlimit-value-sum");
		var url = $(".card_bezlimit_all .btn-bezlimit");
		if (man == "1" && day == "1") {
			html.html("3900 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=50");
		} else if (man == "2" && day == "1") {
			html.html("6900 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=51");
		} else if (man == "3" && day == "1") {
			html.html("9900 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=52");
		} else if (man == "4" && day == "1") {
			html.html("12900 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=53");
		} else if (man == "5" && day == "1") {
			html.html("15900 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=54");
		} else if (man == "1" && day == "2") {
			html.html("4900 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=55");
		} else if (man == "2" && day == "2") {
			html.html("8900 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=56");
		} else if (man == "3" && day == "2") {
			html.html("12900 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=57");
		} else if (man == "4" && day == "2") {
			html.html("16900 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=58");
		} else if (man == "5" && day == "2") {
			html.html("20900 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=59");
		}
	});
	$('.card_bezlimit_sem *').on('click', function () {
		var man = 1;
		var day = $('.card_bezlimit_sem .bezlimit-select-day + .styledSelect').html() == "Будни" ? 1 : 2;
		var html = $(".card_bezlimit_sem .bezlimit-value-sum");
		var url = $(".card_bezlimit_sem .btn-bezlimit");
		if (man == "1" && day == "1") {
			html.html("1900 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=60");
		} else if (man == "1" && day == "2") {
			html.html("2900 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=61");
		}
	});
	$('.card_bezlimit_extrim *').on('click', function () {
		var man = 1;
		var day = $('.card_bezlimit_extrim .bezlimit-select-day + .styledSelect').html() == "Будни" ? 1 : 2;
		var html = $(".card_bezlimit_extrim .bezlimit-value-sum");
		var url = $(".card_bezlimit_extrim .btn-bezlimit");
		if (man == "1" && day == "1") {
			html.html("2700 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=62");
		} else if (man == "1" && day == "2") {
			html.html("3100 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=63");
		}
	});
	$('.card_bezlimit_interactiv *').on('click', function () {
		var man = 1;
		var day = $('.card_bezlimit_interactiv .bezlimit-select-day + .styledSelect').html() == "Будни" ? 1 : 2;
		var html = $(".card_bezlimit_interactiv .bezlimit-value-sum");
		var url = $(".card_bezlimit_interactiv .btn-bezlimit");
		if (man == "1" && day == "1") {
			html.html("1800 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=65");
		} else if (man == "1" && day == "2") {
			html.html("2500 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=66");
		}
	});
	// bezlimit_card end

	// card_bezlimit_new_year start
	$('.card_bezlimit_new_year *').on('click', function () {
		var man = $('.card_bezlimit_new_year .bezlimit-select-man + .styledSelect').html()[0];
		var day = $('.card_bezlimit_new_year .bezlimit-select-day + .styledSelect').html() == "Будни" ? 1 : 2;
		var html = $('.card_bezlimit_new_year .bezlimit-value-sum');
		var url = $('.card_bezlimit_new_year .btn-bezlimit');
		var siteprice = $('.card_bezlimit_new_year .bezlimit-value-siteprice');
		var discount = $('.card_bezlimit_new_year .bezlimit-value-discount');

		var currency = ' руб.';
		var baseUrl = 'https://parkskazka.com/pay/form.php?event=';

		var extraOptions = '';

		if (typeof extraOptionsSource !== 'undefined') {
			extraOptions = '&source=' + extraOptionsSource;
		}

		if (man == "1" && day == "1") {
			html.html("2000" + currency);
			siteprice.html("2500" + currency);
			discount.html("500" + currency);
			url.attr("href", baseUrl + "175" + extraOptions);
		} else if (man == "2" && day == "1") {
			html.html("3600" + currency);
			siteprice.html("4500" + currency);
			discount.html("900" + currency);
			url.attr("href", baseUrl + "176" + extraOptions);
		} else if (man == "3" && day == "1") {
			html.html("5200" + currency);
			siteprice.html("6500" + currency);
			discount.html("1300" + currency);
			url.attr("href", baseUrl + "177" + extraOptions);
		} else if (man == "4" && day == "1") {
			html.html("6800" + currency);
			siteprice.html("8500" + currency);
			discount.html("1700" + currency);
			url.attr("href", baseUrl + "178" + extraOptions);
		} else if (man == "5" && day == "1") {
			html.html("7920" + currency);
			siteprice.html("9900" + currency);
			discount.html("1980" + currency);
			url.attr("href", baseUrl + "179" + extraOptions);
		} else if (man == "1" && day == "2") {
			html.html("2800" + currency);
			siteprice.html("3500" + currency);
			discount.html("700" + currency);
			url.attr("href", baseUrl + "180" + extraOptions);
		} else if (man == "2" && day == "2") {
			html.html("5200" + currency);
			siteprice.html("6500" + currency);
			discount.html("1300" + currency);
			url.attr("href", baseUrl + "181" + extraOptions);
		} else if (man == "3" && day == "2") {
			html.html("7600" + currency);
			siteprice.html("9500" + currency);
			discount.html("1900" + currency);
			url.attr("href", baseUrl + "182" + extraOptions);
		} else if (man == "4" && day == "2") {
			html.html("9520" + currency);
			siteprice.html("11900" + currency);
			discount.html("2380" + currency);
			url.attr("href", baseUrl + "183" + extraOptions);
		} else if (man == "5" && day == "2") {
			html.html("11920" + currency);
			siteprice.html("14900" + currency);
			discount.html("2980" + currency);
			url.attr("href", baseUrl + "184" + extraOptions);
		}
	});
	// card_bezlimit_new_year end


	// card_20%_corp_winter start
	$('.card_corp_20_percent_winter *').on('click', function () {
		let man = $('.card_corp_20_percent_winter .bezlimit-select-man + .styledSelect').html()[0];
		let day = $('.card_corp_20_percent_winter .bezlimit-select-day + .styledSelect').html() == "Будни" ? 1 : 2;
		let html = $('.card_corp_20_percent_winter .bezlimit-value-sum');
		let url = $('.card_corp_20_percent_winter .btn-bezlimit');
		let siteprice = $('.card_corp_20_percent_winter .bezlimit-value-siteprice');
		let discount = $('.card_corp_20_percent_winter .bezlimit-value-discount');

		let currency = ' руб.';
		let baseUrl = 'https://parkskazka.com/pay/form.php?event=';

		let extraOptions = '';

		if (typeof extraOptionsSource !== 'undefined') {
			extraOptions = '&source=' + extraOptionsSource;
		}

		if (man == "1" && day == "1") {
			html.html("2000" + currency);
			siteprice.html("2500" + currency);
			discount.html("500" + currency);
			url.attr("href", baseUrl + "175" + extraOptions);
		} else if (man == "2" && day == "1") {
			html.html("3600" + currency);
			siteprice.html("4500" + currency);
			discount.html("900" + currency);
			url.attr("href", baseUrl + "176" + extraOptions);
		} else if (man == "3" && day == "1") {
			html.html("5200" + currency);
			siteprice.html("6500" + currency);
			discount.html("1300" + currency);
			url.attr("href", baseUrl + "177" + extraOptions);
		} else if (man == "4" && day == "1") {
			html.html("6800" + currency);
			siteprice.html("8500" + currency);
			discount.html("1700" + currency);
			url.attr("href", baseUrl + "178" + extraOptions);
		} else if (man == "5" && day == "1") {
			html.html("7920" + currency);
			siteprice.html("9900" + currency);
			discount.html("1980" + currency);
			url.attr("href", baseUrl + "179" + extraOptions);
		} else if (man == "1" && day == "2") {
			html.html("2800" + currency);
			siteprice.html("3500" + currency);
			discount.html("700" + currency);
			url.attr("href", baseUrl + "180" + extraOptions);
		} else if (man == "2" && day == "2") {
			html.html("5200" + currency);
			siteprice.html("6500" + currency);
			discount.html("1300" + currency);
			url.attr("href", baseUrl + "181" + extraOptions);
		} else if (man == "3" && day == "2") {
			html.html("7600" + currency);
			siteprice.html("9500" + currency);
			discount.html("1900" + currency);
			url.attr("href", baseUrl + "182" + extraOptions);
		} else if (man == "4" && day == "2") {
			html.html("9520" + currency);
			siteprice.html("11900" + currency);
			discount.html("2380" + currency);
			url.attr("href", baseUrl + "183" + extraOptions);
		} else if (man == "5" && day == "2") {
			html.html("11920" + currency);
			siteprice.html("14900" + currency);
			discount.html("2980" + currency);
			url.attr("href", baseUrl + "184" + extraOptions);
		}
	});
	// card_corp_20_percent_winter end


	// card_20%_corp_summer start
	$('.card_corp_20_percent_summer *').on('click', function () {
		let man = $('.card_corp_20_percent_summer .bezlimit-select-man + .styledSelect').html()[0];
		let day = $('.card_corp_20_percent_summer .bezlimit-select-day + .styledSelect').html() == "Будни" ? 1 : 2;
		let html = $('.card_corp_20_percent_summer .bezlimit-value-sum');
		let url = $('.card_corp_20_percent_summer .btn-bezlimit');
		let siteprice = $('.card_corp_20_percent_summer .bezlimit-value-siteprice');
		let discount = $('.card_corp_20_percent_summer .bezlimit-value-discount');

		let currency = ' руб.';
		let baseUrl = 'https://parkskazka.com/pay/form.php?event=';

		let extraOptions = '';

		if (typeof extraOptionsSource !== 'undefined') {
			extraOptions = '&source=' + extraOptionsSource;
		}

		if (man == "1" && day == "1") {
			html.html("3120" + currency);
			siteprice.html("3900" + currency);
			discount.html("780" + currency);
			url.attr("href", baseUrl + "194" + extraOptions);
		} else if (man == "2" && day == "1") {
			html.html("5520" + currency);
			siteprice.html("6900" + currency);
			discount.html("1380" + currency);
			url.attr("href", baseUrl + "195" + extraOptions);
		} else if (man == "3" && day == "1") {
			html.html("7920" + currency);
			siteprice.html("9900" + currency);
			discount.html("1980" + currency);
			url.attr("href", baseUrl + "196" + extraOptions);
		} else if (man == "4" && day == "1") {
			html.html("10320" + currency);
			siteprice.html("12900" + currency);
			discount.html("2580" + currency);
			url.attr("href", baseUrl + "197" + extraOptions);
		} else if (man == "5" && day == "1") {
			html.html("12720" + currency);
			siteprice.html("15900" + currency);
			discount.html("3180" + currency);
			url.attr("href", baseUrl + "198" + extraOptions);
		} else if (man == "1" && day == "2") {
			html.html("3920" + currency);
			siteprice.html("4900" + currency);
			discount.html("980" + currency);
			url.attr("href", baseUrl + "199" + extraOptions);
		} else if (man == "2" && day == "2") {
			html.html("7120" + currency);
			siteprice.html("8900" + currency);
			discount.html("1780" + currency);
			url.attr("href", baseUrl + "200" + extraOptions);
		} else if (man == "3" && day == "2") {
			html.html("10320" + currency);
			siteprice.html("12900" + currency);
			discount.html("2580" + currency);
			url.attr("href", baseUrl + "201" + extraOptions);
		} else if (man == "4" && day == "2") {
			html.html("13520" + currency);
			siteprice.html("16900" + currency);
			discount.html("3380" + currency);
			url.attr("href", baseUrl + "202" + extraOptions);
		} else if (man == "5" && day == "2") {
			html.html("16720" + currency);
			siteprice.html("20900" + currency);
			discount.html("4180" + currency);
			url.attr("href", baseUrl + "203" + extraOptions);
		}
	});
	// card_corp_20_percent_summer end


	// bezlimit_card_20%_summer start
	$('.card_20_percent_summer *').on('click', function () {
		let man = $('.card_20_percent_summer .bezlimit-select-man + .styledSelect').
		html()[0]
		let html = $('.card_20_percent_summer .bezlimit-value-sum')
		let url = $('.card_20_percent_summer .btn-bezlimit')
		let siteprice = $('.card_20_percent_summer .bezlimit-value-siteprice')
		let discount = $('.card_20_percent_summer .bezlimit-value-discount')

		let currency = ' руб.'
		let baseUrl = 'https://parkskazka.com/pay/form.php?event='

		let extraOptions = ''

		if (typeof extraOptionsSource !== 'undefined') {
			extraOptions = '&source=' + extraOptionsSource
		}

		if (man == '1') {
			html.html('4720' + currency)
			siteprice.html('5900' + currency)
			discount.html('1180' + currency)
			url.attr('href', baseUrl + '215' + extraOptions)
		} else if (man == '2') {
			html.html('8720' + currency)
			siteprice.html('10900' + currency)
			discount.html('2180' + currency)
			url.attr('href', baseUrl + '216' + extraOptions)
		} else if (man == '3') {
			html.html('11920' + currency)
			siteprice.html('14900' + currency)
			discount.html('2980' + currency)
			url.attr('href', baseUrl + '217' + extraOptions)
		} else if (man == '4') {
			html.html('13520' + currency)
			siteprice.html('16900' + currency)
			discount.html('3380' + currency)
			url.attr('href', baseUrl + '218' + extraOptions)
		} else if (man == '5') {
			html.html('15920' + currency)
			siteprice.html('19900' + currency)
			discount.html('3980' + currency)
			url.attr('href', baseUrl + '219' + extraOptions)
		}
	})
	// bezlimit_card_20%_summer end

	$('.new_year_quest_santa_all *').on('click', function () {
		var date = $('.new_year_quest_santa_all .new_year_quest_santa_date + .styledSelect').html();

		console.log(date);

		var url = $(".new_year_quest_santa_all .btn_quest_santa");

		var currency = ' руб.';
		var baseUrl = 'https://parkskazka.com/pay/form.php?event=';

		var extraOptions = '';

		if (typeof extraOptionsSource !== 'undefined') {
			extraOptions = '&source=' + extraOptionsSource;
		}

		if (date == "2 января 12:00") {
			url.attr("href", baseUrl + "160" + extraOptions);
		} else if (date == "2 января 16:00") {
			url.attr("href", baseUrl + "161" + extraOptions);
		} else if (date == "3 января 12:00") {
			url.attr("href", baseUrl + "162" + extraOptions);
		} else if (date == "3 января 16:00") {
			url.attr("href", baseUrl + "163" + extraOptions);
		} else if (date == "6 января 12:00") {
			url.attr("href", baseUrl + "164" + extraOptions);
		} else if (date == "6 января 16:00") {
			url.attr("href", baseUrl + "165" + extraOptions);
		} else if (date == "26 декабря 12:00") {
			url.attr("href", baseUrl + "166" + extraOptions);
		} else if (date == "26 декабря 16:00") {
			url.attr("href", baseUrl + "167" + extraOptions);
		} else if (date == "26 декабря 18:00") {
			url.attr("href", baseUrl + "168" + extraOptions);
		} else if (date == "27 декабря 12:00") {
			url.attr("href", baseUrl + "185" + extraOptions);
		} else if (date == "7 января 12:00") {
			url.attr("href", baseUrl + "187" + extraOptions);
		}
	});

	// Bezlimit card detskiy start
	$('.card_bezlimit_detskiy *').on('click', function () {
		var man = $('.card_bezlimit_detskiy .bezlimit-select-man + .styledSelect').html()[0];
		var day = $('.card_bezlimit_detskiy .bezlimit-select-day + .styledSelect').html() == "Будни" ? 1 : 2;
		var html = $('.card_bezlimit_detskiy .bezlimit-value-sum');
		var url = $('.card_bezlimit_detskiy .btn-bezlimit');
		if (man == "1" && day == "1") {
			html.html("1900 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=60");
		} else if (man == "2" && day == "1") {
			html.html("3800 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=102");
		} else if (man == "3" && day == "1") {
			html.html("5700 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=103");
		} else if (man == "4" && day == "1") {
			html.html("7600 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=104");
		} else if (man == "5" && day == "1") {
			html.html("9500 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=105");
		} else if (man == "1" && day == "2") {
			html.html("2900 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=61");
		} else if (man == "2" && day == "2") {
			html.html("5800 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=106");
		} else if (man == "3" && day == "2") {
			html.html("8700 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=107");
		} else if (man == "4" && day == "2") {
			html.html("11600 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=108");
		} else if (man == "5" && day == "2") {
			html.html("14500 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=109");
		}
	});
	// Bezlimit card detskiy end

	// Bezlimit card extremal start
	$('.card_bezlimit_extremal *').on('click', function () {
		var man = $('.card_bezlimit_extremal .bezlimit-select-man + .styledSelect').html()[0];
		var day = $('.card_bezlimit_extremal .bezlimit-select-day + .styledSelect').html() == "Будни" ? 1 : 2;
		var html = $('.card_bezlimit_extremal .bezlimit-value-sum');
		var url = $('.card_bezlimit_extremal .btn-bezlimit');
		if (man == "1" && day == "1") {
			html.html("2700 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=62");
		} else if (man == "2" && day == "1") {
			html.html("5400 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=110");
		} else if (man == "3" && day == "1") {
			html.html("8100 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=111");
		} else if (man == "4" && day == "1") {
			html.html("10800 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=112");
		} else if (man == "5" && day == "1") {
			html.html("13500 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=113");
		} else if (man == "1" && day == "2") {
			html.html("3100 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=63");
		} else if (man == "2" && day == "2") {
			html.html("6200 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=114");
		} else if (man == "3" && day == "2") {
			html.html("9300 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=115");
		} else if (man == "4" && day == "2") {
			html.html("12400 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=116");
		} else if (man == "5" && day == "2") {
			html.html("15500 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=117");
		}
	});
	// Bezlimit card extremal end

	// Bezlimit card partner start
	$('.card_bezlimit_partner *').on('click', function () {
		var man = $('.card_bezlimit_partner .bezlimit-select-man + .styledSelect').html()[0];
		var day = $('.card_bezlimit_partner .bezlimit-select-day + .styledSelect').html();
		var html = $('.card_bezlimit_partner .bezlimit-value-sum');
		var url = $('.card_bezlimit_partner .btn-bezlimit');
		var siteprice = $('.card_bezlimit_partner .bezlimit-value-siteprice');
		var discount = $('.card_bezlimit_partner .bezlimit-value-discount');

		if (man == "1" && day == "15 августа") {
			html.html("2940 руб.");
			siteprice.html("4900 руб.");
			discount.html("1960 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=118");
		} else if (man == "2" && day == "15 августа") {
			html.html("5340 руб.");
			siteprice.html("8900 руб.");
			discount.html("3560 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=119");
		} else if (man == "3" && day == "15 августа") {
			html.html("7740 руб.");
			siteprice.html("12900 руб.");
			discount.html("5160 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=120");
		} else if (man == "4" && day == "15 августа") {
			html.html("10140 руб.");
			siteprice.html("16900 руб.");
			discount.html("6760 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=121");
		} else if (man == "5" && day == "15 августа") {
			html.html("15540 руб.");
			siteprice.html("20900 руб.");
			discount.html("8360 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=122");
		} else if (man == "1" && day == "22 августа") {
			html.html("2940 руб.");
			siteprice.html("4900 руб.");
			discount.html("1960 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=123");
		} else if (man == "2" && day == "22 августа") {
			html.html("5340 руб.");
			siteprice.html("8900 руб.");
			discount.html("3560 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=124");
		} else if (man == "3" && day == "22 августа") {
			html.html("7740 руб.");
			siteprice.html("12900 руб.");
			discount.html("5160 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=125");
		} else if (man == "4" && day == "22 августа") {
			html.html("10140 руб.");
			siteprice.html("16900 руб.");
			discount.html("6760 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=126");
		} else if (man == "5" && day == "22 августа") {
			html.html("15540 руб.");
			siteprice.html("20900 руб.");
			discount.html("8360 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=127");
		}
	});
	// Bezlimit card partner end

	// Bezlimit card partner sber start
	$('.card_bezlimit_partner_sber *').on('click', function () {
		var man = $('.card_bezlimit_partner_sber .bezlimit-select-man + .styledSelect').html()[0];
		var day = $('.card_bezlimit_partner_sber .bezlimit-select-day + .styledSelect').html();
		var html = $('.card_bezlimit_partner_sber .bezlimit-value-sum');
		var url = $('.card_bezlimit_partner_sber .btn-bezlimit');
		var siteprice = $('.card_bezlimit_partner_sber .bezlimit-value-siteprice');
		var discount = $('.card_bezlimit_partner_sber .bezlimit-value-discount');

		if (man == "1" && day == "1 августа") {
			html.html("2940 руб.");
			siteprice.html("4900 руб.");
			discount.html("1960 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=128");
		} else if (man == "2" && day == "1 августа") {
			html.html("5340 руб.");
			siteprice.html("8900 руб.");
			discount.html("3560 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=129");
		} else if (man == "3" && day == "1 августа") {
			html.html("7740 руб.");
			siteprice.html("12900 руб.");
			discount.html("5160 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=130");
		} else if (man == "4" && day == "1 августа") {
			html.html("10140 руб.");
			siteprice.html("16900 руб.");
			discount.html("6760 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=131");
		} else if (man == "5" && day == "1 августа") {
			html.html("15540 руб.");
			siteprice.html("20900 руб.");
			discount.html("8360 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=132");
		} else if (man == "1" && day == "7 августа") {
			html.html("2340 руб.");
			siteprice.html("3900 руб.");
			discount.html("1560 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=133");
		} else if (man == "2" && day == "7 августа") {
			html.html("4140 руб.");
			siteprice.html("6900 руб.");
			discount.html("2760 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=134");
		} else if (man == "3" && day == "7 августа") {
			html.html("5940 руб.");
			siteprice.html("9900 руб.");
			discount.html("3960 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=135");
		} else if (man == "4" && day == "7 августа") {
			html.html("7740 руб.");
			siteprice.html("12900 руб.");
			discount.html("5160 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=136");
		} else if (man == "5" && day == "7 августа") {
			html.html("9540 руб.");
			siteprice.html("15900 руб.");
			discount.html("6360 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=137");
		} else if (man == "1" && day == "9 августа") {
			html.html("2940 руб.");
			siteprice.html("4900 руб.");
			discount.html("1960 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=138");
		} else if (man == "2" && day == "9 августа") {
			html.html("5340 руб.");
			siteprice.html("8900 руб.");
			discount.html("3560 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=139");
		} else if (man == "3" && day == "9 августа") {
			html.html("7740 руб.");
			siteprice.html("12900 руб.");
			discount.html("5160 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=140");
		} else if (man == "4" && day == "9 августа") {
			html.html("10140 руб.");
			siteprice.html("16900 руб.");
			discount.html("6760 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=141");
		} else if (man == "5" && day == "9 августа") {
			html.html("15540 руб.");
			siteprice.html("20900 руб.");
			discount.html("8360 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=142");
		}
	});
	// Bezlimit card partner sber end

	// Bezlimit card partner prosveshenie start
	$('.card_bezlimit_prosveshenie *').on('click', function () {
		var man = $('.card_bezlimit_prosveshenie .bezlimit-select-man + .styledSelect').html()[0];
		var day = $('.card_bezlimit_prosveshenie .bezlimit-select-day + .styledSelect').html();
		var html = $('.card_bezlimit_prosveshenie .bezlimit-value-sum');
		var url = $('.card_bezlimit_prosveshenie .btn-bezlimit');
		var siteprice = $('.card_bezlimit_prosveshenie .bezlimit-value-siteprice');
		var discount = $('.card_bezlimit_prosveshenie .bezlimit-value-discount');

		if (man == "1" && day == "30 августа") {
			html.html("3430 руб.");
			siteprice.html("4900 руб.");
			discount.html("1470 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=143");
		} else if (man == "2" && day == "30 августа") {
			html.html("6230 руб.");
			siteprice.html("8900 руб.");
			discount.html("2670 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=144");
		} else if (man == "3" && day == "30 августа") {
			html.html("9030 руб.");
			siteprice.html("12900 руб.");
			discount.html("3870 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=145");
		} else if (man == "4" && day == "30 августа") {
			html.html("11830 руб.");
			siteprice.html("16900 руб.");
			discount.html("5070 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=146");
		} else if (man == "5" && day == "30 августа") {
			html.html("14630 руб.");
			siteprice.html("20900 руб.");
			discount.html("6270 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=147");
		}
	});
	// Bezlimit card partner prosveshenie end

	// Super card start /supercard/

	$('.card_super .super-select-man').each(function () {
		var $this = $(this),
			numberOfOptions = $(this).children('option').length;
		$this.addClass('s-hidden');
		$this.wrap('<div class="select"></div>');
		$this.after('<div class="styledSelect"></div>');
		var $styledSelect = $this.next('div.styledSelect');
		//$styledSelect.text($this.children('option').eq(0).text());
		$styledSelect.text($this.children('option:selected').text());
		var $list = $('<ul />', {
			'class': 'options'
		}).insertAfter($styledSelect);
		for (var i = 0; i < numberOfOptions; i++) {
			$('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val()
			}).appendTo($list);
		}
		var $listItems = $list.children('li');
		$styledSelect.click(function (e) {
			e.stopPropagation();
			$('div.styledSelect.active').each(function () {
				$(this).removeClass('active').next('ul.options').hide();
			});
			$(this).toggleClass('active').next('ul.options').toggle();
		});
		$listItems.click(function (e) {
			e.stopPropagation();
			$styledSelect.text($(this).text()).removeClass('active');
			$this.val($(this).attr('rel'));
			$list.hide();
			/* alert($this.val()); Uncomment this for demonstration! */
		});

		$(document).click(function () {
			$styledSelect.removeClass('active');
			$list.hide();
		});

	});

	$('.card_super_all *').on('click', function () {
		var man = $('.card_super_all .super-select-man + .styledSelect').html()[0];
		var price = $('.card_super_all .super-value-price');
		var html = $(".card_super_all .super-value-sum");
		var url = $(".card_super_all .btn-super");

		if (man == "1") {
			html.html("1500 руб.");
			price.html('2950 руб.');
			url.attr("href", "https://parkskazka.com/pay/form.php?event=80");
		} else if (man == "2") {
			html.html("3000 руб.");
			price.html('5900 руб.');
			url.attr("href", "https://parkskazka.com/pay/form.php?event=81");
		} else if (man == "3") {
			html.html("4500 руб.");
			price.html('8850 руб.');
			url.attr("href", "https://parkskazka.com/pay/form.php?event=82");
		} else if (man == "4") {
			html.html("6000 руб.");
			price.html('11800 руб.');
			url.attr("href", "https://parkskazka.com/pay/form.php?event=83");
		} else if (man == "5") {
			html.html("7500 руб.");
			price.html('14750 руб.');
			url.attr("href", "https://parkskazka.com/pay/form.php?event=84");
		}
	});

	// Super card end /supercard/

	// fifty card start /fiftycard/

	$('.card_fifty .fifty-select-man').each(function () {
		var $this = $(this),
			numberOfOptions = $(this).children('option').length;
		$this.addClass('s-hidden');
		$this.wrap('<div class="select"></div>');
		$this.after('<div class="styledSelect"></div>');
		var $styledSelect = $this.next('div.styledSelect');
		//$styledSelect.text($this.children('option').eq(0).text());
		$styledSelect.text($this.children('option:selected').text());
		var $list = $('<ul />', {
			'class': 'options'
		}).insertAfter($styledSelect);
		for (var i = 0; i < numberOfOptions; i++) {
			$('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val()
			}).appendTo($list);
		}
		var $listItems = $list.children('li');
		$styledSelect.click(function (e) {
			e.stopPropagation();
			$('div.styledSelect.active').each(function () {
				$(this).removeClass('active').next('ul.options').hide();
			});
			$(this).toggleClass('active').next('ul.options').toggle();
		});
		$listItems.click(function (e) {
			e.stopPropagation();
			$styledSelect.text($(this).text()).removeClass('active');
			$this.val($(this).attr('rel'));
			$list.hide();
			// alert($this.val()); // Uncomment this for demonstration!
			// console.log($this.val());
		});

		$(document).click(function () {
			$styledSelect.removeClass('active');
			$list.hide();
		});

	});

	$('.card_fifty_all *').on('click', function () {
		var man = $('.card_fifty_all .fifty-select-man + .styledSelect').html();
		var price = $('.card_fifty_all .fifty-value-price');
		var url = $(".card_fifty_all .btn-fifty");

		if (man == "3500") {
			price.html('7000 руб.');
			url.attr("href", "https://parkskazka.com/pay/form.php?event=90");
		} else if (man == "5500") {
			price.html('11000 руб.');
			url.attr("href", "https://parkskazka.com/pay/form.php?event=91");
		} else if (man == "7500") {
			price.html('15000 руб.');
			url.attr("href", "https://parkskazka.com/pay/form.php?event=92");
		} else if (man == "10000") {
			price.html('20000 руб.');
			url.attr("href", "https://parkskazka.com/pay/form.php?event=93");
		}
	});

	// fifty  card end /fiftycard/

	// alpaca card start
	$('.card_alpaca .alpaca-select-man').each(function () {
		var $this = $(this),
			numberOfOptions = $(this).children('option').length;
		$this.addClass('s-hidden');
		$this.wrap('<div class="select"></div>');
		$this.after('<div class="styledSelect"></div>');
		var $styledSelect = $this.next('div.styledSelect');
		$styledSelect.text($this.children('option:selected').text());
		var $list = $('<ul />', {
			'class': 'options'
		}).insertAfter($styledSelect);
		for (var i = 0; i < numberOfOptions; i++) {
			$('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val()
			}).appendTo($list);
		}
		var $listItems = $list.children('li');
		$styledSelect.click(function (e) {
			e.stopPropagation();
			$('div.styledSelect.active').each(function () {
				$(this).removeClass('active').next('ul.options').hide();
			});
			$(this).toggleClass('active').next('ul.options').toggle();
		});
		$listItems.click(function (e) {
			e.stopPropagation();
			$styledSelect.text($(this).text()).removeClass('active');
			$this.val($(this).attr('rel'));
			$list.hide();
		});

		$(document).click(function () {
			$styledSelect.removeClass('active');
			$list.hide();
		});

	});

	$('.card_alpaca_all *').on('click', function () {
		var man = $('.card_alpaca_all .alpaca-select-man + .styledSelect').html()[0];
		var html = $(".card_alpaca_all .alpaca-value-sum");
		var url = $(".card_alpaca_all .btn-alpaca");

		if (man == "1") {
			html.html("1000 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=365");
		} else if (man == "2") {
			html.html("2000 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=365&tickets=2");
		} else if (man == "3") {
			html.html("3000 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=365&tickets=3");
		}
	});

	// alpaca card end

	// Husky card start /huskycard/

	$('.card_husky .husky-select-man').each(function () {
		var $this = $(this),
			numberOfOptions = $(this).children('option').length;
		$this.addClass('s-hidden');
		$this.wrap('<div class="select"></div>');
		$this.after('<div class="styledSelect"></div>');
		var $styledSelect = $this.next('div.styledSelect');
		//$styledSelect.text($this.children('option').eq(0).text());
		$styledSelect.text($this.children('option:selected').text());
		var $list = $('<ul />', {
			'class': 'options'
		}).insertAfter($styledSelect);
		for (var i = 0; i < numberOfOptions; i++) {
			$('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val()
			}).appendTo($list);
		}
		var $listItems = $list.children('li');
		$styledSelect.click(function (e) {
			e.stopPropagation();
			$('div.styledSelect.active').each(function () {
				$(this).removeClass('active').next('ul.options').hide();
			});
			$(this).toggleClass('active').next('ul.options').toggle();
		});
		$listItems.click(function (e) {
			e.stopPropagation();
			$styledSelect.text($(this).text()).removeClass('active');
			$this.val($(this).attr('rel'));
			$list.hide();
			/* alert($this.val()); Uncomment this for demonstration! */
		});

		$(document).click(function () {
			$styledSelect.removeClass('active');
			$list.hide();
		});

	});

	$('.card_husky_all *').on('click', function () {
		var man = $('.card_husky_all .husky-select-man + .styledSelect').html()[0];
		var html = $(".card_husky_all .husky-value-sum");
		var url = $(".card_husky_all .btn-husky");

		if (man == "1") {
			html.html("2500 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=85");
		} else if (man == "2") {
			html.html("5000 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=86");
		} else if (man == "3") {
			html.html("7500 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=87");
		} else if (man == "4") {
			html.html("10000 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=88");
		} else if (man == "5") {
			html.html("12500 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=89");
		}
	});

	// Hasky card end /huskycard/

	// Sales week start /sales_week/

	$('.sales_week .sw-select-man').each(function () {
		var $this = $(this),
			numberOfOptions = $(this).children('option').length;
		$this.addClass('s-hidden');
		$this.wrap('<div class="select"></div>');
		$this.after('<div class="styledSelect"></div>');
		var $styledSelect = $this.next('div.styledSelect');
		//$styledSelect.text($this.children('option').eq(0).text());
		$styledSelect.text($this.children('option:selected').text());
		var $list = $('<ul />', {
			'class': 'options'
		}).insertAfter($styledSelect);
		for (var i = 0; i < numberOfOptions; i++) {
			$('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val()
			}).appendTo($list);
		}
		var $listItems = $list.children('li');
		$styledSelect.click(function (e) {
			e.stopPropagation();
			$('div.styledSelect.active').each(function () {
				$(this).removeClass('active').next('ul.options').hide();
			});
			$(this).toggleClass('active').next('ul.options').toggle();
		});
		$listItems.click(function (e) {
			e.stopPropagation();
			$styledSelect.text($(this).text()).removeClass('active');
			$this.val($(this).attr('rel'));
			$list.hide();
			/* alert($this.val()); Uncomment this for demonstration! */
		});

		$(document).click(function () {
			$styledSelect.removeClass('active');
			$list.hide();
		});

	});

	$('.sales_week_all *').on('click', function () {
		var man = $('.sales_week_all .sw-select-man + .styledSelect').html();
		var html = $(".sales_week_all .sw-value-sum");
		var url = $(".sales_week_all .btn-sw");

		if (man == "7000") {
			html.html("3500 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=98");
		} else if (man == "11000") {
			html.html("5500 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=99");
		} else if (man == "15000") {
			html.html("7500 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=100");
		} else if (man == "20000") {
			html.html("10000 руб.");
			url.attr("href", "https://parkskazka.com/pay/form.php?event=101");
		}
	});

	// Sales week end /sales_week/

	$('.ap-price-order-places').on('click', function (e) {
		$('.ap-price-attr').hide();
		$('.ap-price-places').show();
		$('.ap-price-order-attr').removeClass('active');
		$('.ap-price-order-places').addClass('active');
		if ($(window).width() > 1300)
			$('.ap-price').css('height', '580px'); //1260 1050 price-mark
		else if ($(window).width() > 767)
			$('.ap-price').css('height', '580px');
	});
	$('.ap-price-order-attr').on('click', function (e) {
		$('.ap-price-places').hide();
		$('.ap-price-attr').show();
		$('.ap-price-order-places').removeClass('active');
		$('.ap-price-order-attr').addClass('active');
		if ($(window).width() > 1300)
			$('.ap-price').css('height', '1020px'); //1050 price-mark price-height price_height
		else if ($(window).width() > 767)
			$('.ap-price').css('height', '1020px');
	});

});

jQuery(document).ready(function ($) {

	$("#hb-close").on('click', function (e) {
		$('#birthday').css('display', 'none');
	});

	$("#cn-close").on('click', function (e) {
		$('#close-notification').css('display', 'none');

		setCookie("CN_hide", 1, );
	});

	$("#cn-close-once").on('click', function (e) {
		$('#close-notification').css('display', 'none');
	});

	//Чтение QRcode и вставка в поле номера карты
	var urlParamsCardNum = new URLSearchParams(window.location.search);
	if (urlParamsCardNum.get('card') != null)
		$("input#card").val(urlParamsCardNum.get('card'));
	document.cookie = 'u_source=cQR; path=/;';

	$("#check_balance").on('click', function (e) {
		e.preventDefault();
		$('#modal_balance').remove();
		var card_val = $('#card').val();
		var message = '';
		if (card_val != "") {
			$.ajax({
					url: 'https://parkskazka.com/pay/functions/check_balance_new.php',
					type: 'POST',
					dataType: 'json',
					data: {
						card: card_val
					},
				})
				.always(function (data) {

					valid = true;
					if (data['result'] == "1" && data['real_card'] == "0") {
						var message = 'Такой карты не существует!';
						valid = false;
					} else if (data['result'] == 0) {
						var message = data.responseText;
						valid = false;
					}
					if (valid) {
						var date = new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000);
						document.cookie = 'card_id=' + data.card + '; path=/; expires=' + date.toUTCString();
						//Пополнение карты отправка Google Tag Manager
						(dataLayer = window.dataLayer || []).push({
							'eCategory': 'cardForm',
							'eAction': 'refill',
							'eLabel': '',
							'eNI': true,
							'event': 'GAEvent'
						});

						let silver = Math.floor(data["bonuses"] / 400);
						let gold = Math.floor((data["balance"] + data["bonuses"]) / 400) - silver;
						let total_coins = Math.floor((data["balance"] + data["bonuses"]) / 400);

						message = '<h3>Здравствуйте,' + data["first_name"] + '!</h3>';
						message += '     <div class="row">';
						message += '        <div class="col-sm-12">';
						message += '            <div class="text-center modal_content"><div>Баланс карты № ' + data["card"] + ': <b>' + data["balance"] + '</b> руб.</div> <div>Бонусы: <b>' + data["bonuses"] + '</b></div></div>';
						// 					message += '            <div class="text-center modal_content"><div>Баланс карты № ' + data["card"] + ': <b>' + gold + '</b> <img class="coin" src="//parkskazka.com/wp-content/themes/parkskazka/img/coin-gold.png"> <b>' + silver + '</b> <img class="coin" src="//parkskazka.com/wp-content/themes/parkskazka/img/coin-silver.png"></div></div>';
						// 					message += '            <div class="text-center modal_content"><div>Баланс карты № ' + data["card"] + ': <b>' + total_coins + '</b> <img class="coin" src="/wp-content/themes/parkskazka/img/coin-gold.png"></div></div>';
						message += '         </div>';
						message += '    </div>';
					}
					html = '<div id="modal_balance" class="modal">';
					html += '  <div class="modal-dialog">';
					html += '    <div class="modal-content">';
					html += '      <div class="modal-header">';
					html += '        <button type="button" class="close" data-dismiss="modal"></button>';
					html += '        <div class="section-title">Проверка баланса</div>';
					html += '      </div>';
					html += '      <div class="modal-body">' + message + '</div>';
					html += '    </div';
					html += '  </div>';
					html += '</div>';
					$('body').append(html);
					$('#modal_balance').modal('show');

				})

		} else {
			message = 'Вы не ввели номер клубной карты';
			html = '<div id="modal_balance" class="modal">';
			html += '  <div class="modal-dialog">';
			html += '    <div class="modal-content">';
			html += '      <div class="modal-header">';
			html += '        <button type="button" class="close" data-dismiss="modal"></button>';
			html += '        <div class="section-title">Проверка баланса</div>';
			html += '      </div>';
			html += '      <div class="modal-body">' + message + '</div>';
			html += '    </div';
			html += '  </div>';
			html += '</div>';
			$('body').append(html);
			$('#modal_balance').modal('show');
		}
	})

	function upperCaseF(a) {
		setTimeout(function () {
			a.value = a.value.toUpperCase();
		}, 100);
	}
	$('#card').on('keydown', function (e) {
		upperCaseF(this);
	});
	$('#popaupcard').on('keydown', function (e) {
		upperCaseF(this);
	});

	$("#up_balance").on('click', function (event) {
		event.preventDefault();
		if (urlParamsCardNum.get('card') != null) {
			var card_number = urlParamsCardNum.get('card');
		} else if (typeof getCookie('card_id') != 'undefined') {
			var card_number = getCookie('card_id');
		} else {
			var card_number = $("#card").val();
		}
		$("#popaupcard").val(card_number);

		$('#modal_balance_up').modal('show');
		$('#popaupsum').on('keydown', function (e) {
			if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 8) {
				return false;
			}
		});
		$("#up_balance_buy").on('click', function (event) {
			event.preventDefault();

			var card_input = $('#popaupcard');
			var sum_input = $('#popaupsum');

			if (card_input.val() != "" && sum_input.val() != "") {

				card_input.attr('style', '');
				sum_input.attr('style', '');

				$.ajax({
						url: 'https://parkskazka.com/pay/functions/check_balance_new.php',
						type: 'POST',
						dataType: 'json',
						data: {
							card: card_input.val()
						},
					})
					.always(function (data) {
						valid = true;

						if (data.result == "1") {
							if (data.real_card == "0") {
								alert("Такой карты не существует!");
								valid = false;
							}
						} else {
							alert("Произошла неизвестная ошибка. Пожалуйста, повторите поптыку.");
							valid = false;
						}

						if (valid) {
							var date = new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000);
							document.cookie = 'card_id=' + data.card + '; path=/; expires=' + date.toUTCString();
							$("form#real_form_popup").find('input#sumf').val(sum_input.val());
							$("form#real_form_popup").find('input#cardf').val(card_input.val());
							$("form#real_form_popup").submit();
							//Пополнение карты отправка Google Tag Manager
							(dataLayer = window.dataLayer || []).push({
								'eCategory': 'cardForm',
								'eAction': 'refill',
								'eLabel': '',
								'eNI': true,
								'event': 'GAEvent'
							});
						}
					});

			} else {
				if (card_input.val() == "") {
					card_input.css('border', '1px solid red');
				}
				if (sum_input.val() == "") {
					sum_input.css('border', '1px solid red');
				}
			}
		});
	})

	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
	// Куки на подписку
	function setCookie(name, value, options) {
		options = options || {};
		var expires = options.expires;
		var d = new Date();
		d.setTime(d.getTime() + 2419200000);
		expires = options.expires = d;
		value = encodeURIComponent(value);
		var updatedCookie = name + "=" + value;
		for (var propName in options) {
			updatedCookie += "; " + propName;
			var propValue = options[propName];
			if (propValue !== true) {
				updatedCookie += "=" + propValue + "; path=/";
			}
		}
		document.cookie = updatedCookie;
	}
	$('#sub_email').on('shown.bs.modal', function () {
		setCookie("PS_sub", 1, );
	});
	if (getCookie("PS_sub") == undefined) {
		setTimeout(function () {
			$('#sub_email').modal('show');
		}, 15000);
	}

	if (getCookie("CN_hide_1") == undefined) {
		$('#close-notification').modal('show');
	}

	const wow = new WOW({
		boxClass: 'wow', /* класс, который необходим для работы wow.js */
		animateClass: 'animate__animated', /* класс, который будет автоматически добавляться анимируемым элементам при прокрутке страницы */
		offset: 30, /* по-умолчанию установлено значение 0, то есть как только при прокрутке страницы, элемент достигает низа окна браузера проигрываться анимация, в данном случае анимация начнется на 30px выше от низа окна браузера */
		mobile: true, /* если true, то на мобильных тоже будет анимация, если false, то на мобильных анимация отключается */
		live: true /* если true, то анимация будет работать даже на динамически добавляемых элементах, если false, то только на тех элементах, которые были на странице при ее загрузке */
	})
	wow.init();
});