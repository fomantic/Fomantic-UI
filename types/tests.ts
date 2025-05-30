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

/* Define API endpoints once globally */
$.fn.api.settings.api = {
    'get followers': '/followers/{id}?results={count}',
    'create user': '/create',
    'add user': '/add/{id}',
    'follow user': '/follow/{id}',
    search: '/search/?query={value}',
};

$().calendar({
    today: true,
    initialDate: null,
    endCalendar: $(),
}); // $ExpectType JQuery<HTMLElement>

$.flyout('alert', 'hello'); // $ExpectType JQuery<HTMLElement>
$.flyout('confirm', 'Are you sure?', function () { /* make eslint happy */ }); // $ExpectType JQuery<HTMLElement>
$.flyout('prompt', 'Enter Code', function () { /* make eslint happy */ }); // $ExpectType JQuery<HTMLElement>

$.fn.flyout.settings.templates.greet = function (username) {
    return {
        title: 'Greetings to ' + username + '!',
        content: '' + username.toUpperCase() + 'is the best!',
        closeIcon: true,
        class: 'inverted',
        classContent: 'centered',
    };
};

$().form({
    fields: {
        field1: {
            rules: [
                {
                    type: 'notEmpty',
                },
            ],
        },
        field2: {
            rules: [
                {
                    type: 'isExactly[dog]',
                    prompt: '{name} is set to "{value}" that is totally wrong. It should be {ruleValue}',
                },
            ],
        },
        field3: {
            rules: [
                {
                    type: 'isExactly[cat]',
                    prompt: function (value) {
                        if (value === 'dog') {
                            return 'I told you to put cat, not dog!';
                        }

                        return 'That is not cat';
                    },
                },
            ],
        },
        color: {
            identifier: 'color',
            rules: [{
                type: 'regExp',
                value: /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/i,
            }],
        },
        yearsPracticed: {
            identifier: 'yearsPracticed',
            depends: 'isDoctor',
            rules: [
                {
                    type: 'notEmpty',
                    prompt: 'Please enter the number of years you have been a doctor',
                },
            ],
        },
        ccEmail: {
            identifier: 'cc-email',
            optional: true,
            rules: [
                {
                    type: 'email',
                    prompt: 'Please enter a valid second e-mail',
                },
            ],
        },
    },
}); // $ExpectType JQuery<HTMLElement>

$().form({
    fields: {
        gender: 'notEmpty',
        name: 'notEmpty',
        password: ['minLength[6]', 'notEmpty'],
    },
}); // $ExpectType JQuery<HTMLElement>

$.fn.form.settings.rules.date = function (dateStr: string) {
    return dateStr !== '';
};

$.modal('alert', {
    title: 'Listen to me',
    content: 'I love Fomantic-UI',
    handler: function () {
        $.toast({ message: 'Great!' });
    },
});

$.fn.modal.settings.templates.greet = function (username: string) {
    // do something according to modals settings and/or given parameters
    return {
        title: 'Greetings to ' + username + '!',
        content: '' + username.toUpperCase() + 'is the best!',
        class: 'inverted',
        classContent: 'centered',
        dimmerSettings: {
            variation: 'inverted',
        },
    };
};

$.modal('greet', 'mom');

$().nag({
    persist: true,
}); // $ExpectType JQuery<HTMLElement>

$().search('display message', 'Hello, world !'); // $ExpectType JQuery<HTMLElement>

// To change the defaults for all toast at once override the module as follows
$.fn.toast.settings.progressUp = true;
$.fn.toast.settings.class = 'info';
$.fn.toast.settings.showIcon = true;
$.fn.toast.settings.className.box = 'toast-box'; // removes shadow
$.fn.toast.settings.className.title = 'header'; // smaller font size
$.fn.toast.settings.className.icon = 'icon'; // top position again
$.fn.toast.settings.transition.closeEasing = 'easeOutBounce';

// Or apply the old defaults directly to the toast
$.toast({
    title: 'LOOK',
    message: 'Turned back time to 2.7.0 defaults',
    showProgress: 'bottom',
    // make it look like 2.7.0
    showIcon: true,
    progressUp: true,
    class: 'info',
    className: {
        box: 'toast-box',
        title: 'header',
        icon: 'icon',
    },
    transition: {
        closeEasing: 'easeOutBounce',
    },
});

$().transition('shake', '200ms');
$().transition('horizontal flip', 500, function () { /* make eslint happy */ });
$().transition('fade up');
