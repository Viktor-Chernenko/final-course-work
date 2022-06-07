jQuery(document).ready(function ($) {

  //Подписаться на рассылку
  $('#sub_email').on('shown.bs.modal', function () {
    (dataLayer = window.dataLayer || []).push({
      'eCategory': 'subscribeToNewsletterForm',
      'eAction': 'open',
      'eLabel': 'trigger',
      'eNI': true,
      'event': 'GAEvent'
    });
  });

  //Телефон клик
  $('.roistat_phone').on('click', function () {
    (dataLayer = window.dataLayer || []).push({
      'eCategory': 'phoneNumber',
      'eAction': 'click',
      'eLabel': '',
      'eNI': false,
      'event': 'GAEvent'
    });
  });

  //Почта клик
  $('.roistat_mail').on('click', function () {
    (dataLayer = window.dataLayer || []).push({
      'eCategory': 'email',
      'eAction': 'click',
      'eLabel': '',
      'eNI': false,
      'event': 'GAEvent'
    });
  });

  if (wpcf7.cached) {
    wpcf7.cached = 0;
  }

  //Отправка форм wpcf7
  document.addEventListener('wpcf7mailsent', function (event) {
    if ('60' == event.detail.contactFormId) {
      //Подписаться на новости отправка
      (dataLayer = window.dataLayer || []).push({
        'eCategory': 'leaveUsMessageForm',
        'eAction': 'send',
        'eLabel': '',
        'eNI': false,
        'event': 'GAEvent'
      });
    } else if ('35541' == event.detail.contactFormId) {
      //Закажите аренду льда
      (dataLayer = window.dataLayer || []).push({
        'eCategory': 'applicationForRentOfIceForm',
        'eAction': 'send',
        'eLabel': '',
        'eNI': false,
        'event': 'GAEvent'
      });
    } else if ('1383' == event.detail.contactFormId) {
      //Закажите мероприятия отправка
      (dataLayer = window.dataLayer || []).push({
        'eCategory': 'eventIn1ClickForm',
        'eAction': 'send',
        'eLabel': '',
        'eNI': false,
        'event': 'GAEvent'
      });
    } else if ('35530' == event.detail.contactFormId) {
      //Оставьте заявку на корпоратив отправка
      (dataLayer = window.dataLayer || []).push({
        'eCategory': 'applicationForCorporateForm',
        'eAction': 'send',
        'eLabel': '',
        'eNI': false,
        'event': 'GAEvent'
      });
    } else if ('35538' == event.detail.contactFormId) {
      //Оставьте заявку на проведения дня рождения отправка
      (dataLayer = window.dataLayer || []).push({
        'eCategory': 'applicationForBirthdayForm',
        'eAction': 'send',
        'eLabel': '',
        'eNI': false,
        'event': 'GAEvent'
      });
    } else if ('87405' == event.detail.contactFormId) {
      //Подписаться на рассылку
      (dataLayer = window.dataLayer || []).push({
        'eCategory': 'subscribeToNewsletterForm',
        'eAction': 'send',
        'eLabel': 'trigger',
        'eNI': false,
        'event': 'GAEvent'
      });
      setCookie("PS_sub", 1, );
    } else if ('123438' == event.detail.contactFormId) {
      //Оставьте нам сообщение - Форма написать нам в подвале
      (dataLayer = window.dataLayer || []).push({
        'eCategory': 'leaveUsMessageForm',
        'eAction': 'send',
        'eLabel': '',
        'eNI': false,
        'event': 'GAEvent'
      });
    } else if ('123827' == event.detail.contactFormId) {
      //Закажите мероприятие в 1 клик - Быстрый заказ мероприятия
      (dataLayer = window.dataLayer || []).push({
        'eCategory': 'leaveUsMessageForm',
        'eAction': 'send',
        'eLabel': '',
        'eNI': false,
        'event': 'GAEvent'
      });
    } else if ('156858' == event.detail.contactFormId) {
      //Оставьте нам сообщение - Форма блоггеров
      ym(37767130, 'reachGoal', 53985859);
    }

    //SkillToLead отправка в Яндекс.Метрику и Google.Analytics
    var inputs = event.detail.inputs;
    for (var i = 0; i < inputs.length; i++) {
      if ('your-phone' == inputs[i].name) {
        console.log("form skilltolead 1");
        ym(37767130, 'reachGoal', 'skilltolead');
        gtag('event', 'conversion', {
          'event_category': 'skilltolead',
          'event_action': 'otpravlena'
        });
        break;
      }
    }
  }, false);
});