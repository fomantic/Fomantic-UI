/// <reference path="index.d.ts" />

$().accordion(); // $ExpectType JQuery<HTMLElement>
$().api();// $ExpectType JQuery
$().calendar(); // $ExpectType JQuery<HTMLElement>
$().checkbox(); // $ExpectType JQuery<HTMLElement>
$('body').dimmer(); // $ExpectType JQuery<HTMLElement>
$().dropdown(); // $ExpectType JQuery<HTMLElement>
$().embed(); // $ExpectType JQuery<HTMLElement>
$().flyout(); // $ExpectType JQuery<HTMLElement>
$().form(); // $ExpectType JQuery<HTMLElement>
$().modal(); // $ExpectType JQuery<HTMLElement>
$().nag(); // $ExpectType JQuery<HTMLElement>
$().popup(); // $ExpectType JQuery<HTMLElement>
$().progress(); // $ExpectType JQuery<HTMLElement>
$().rating(); // $ExpectType JQuery<HTMLElement>
$().search(); // $ExpectType JQuery<HTMLElement>
$().shape(); // $ExpectType JQuery<HTMLElement>
$().sidebar(); // $ExpectType JQuery<HTMLElement>
$().slider(); // $ExpectType JQuery<HTMLElement>
$().sticky(); // $ExpectType JQuery<HTMLElement>
$().tab(); // $ExpectType JQuery<HTMLElement>
$('body').toast(); // $ExpectType JQuery<HTMLElement>
$().transition(); // $ExpectType JQuery<HTMLElement>
$().visibility(); // $ExpectType JQuery<HTMLElement>

$().calendar({
  today: true,
  initialDate: null,
  endCalendar: $()
}); // $ExpectType JQuery<HTMLElement>

$().form({
  fields: {
    field1: {
      rules: [
        {
          type   : 'empty'
        }
      ]
    },
    field2: {
      rules: [
        {
          type   : 'isExactly[dog]',
          prompt : '{name} is set to "{value}" that is totally wrong. It should be {ruleValue}'
        }
      ]
    },
    field3: {
      rules: [
        {
          type   : 'isExactly[cat]',
          prompt : function(value) {
            if(value == 'dog') {
              return 'I told you to put cat, not dog!';
            }
            return 'That is not cat';
          }
        }
      ]
    },
    color: {
      identifier: 'color',
      rules: [{
        type: 'regExp',
        value: /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/i,
      }]
    },
    yearsPracticed: {
      identifier : 'yearsPracticed',
      depends    : 'isDoctor',
      rules      : [
        {
          type   : 'empty',
          prompt : 'Please enter the number of years you have been a doctor'
        }
      ]
    },
    ccEmail: {
      identifier : 'cc-email',
      optional   : true,
      rules: [
        {
          type   : 'email',
          prompt : 'Please enter a valid second e-mail'
        }
      ]
    }
  }
}); // $ExpectType JQuery<HTMLElement>

$().form({
  fields: {
    gender: 'empty',
    name: 'empty',
    password : ['minLength[6]', 'empty']
  }
}); // $ExpectType JQuery<HTMLElement>

//@ts-ignore
$.fn.form.settings.rules.date = function(str_date: string) {
  return true;
};

$().nag({
  persist: true
}); // $ExpectType JQuery<HTMLElement>