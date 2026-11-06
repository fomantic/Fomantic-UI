describe('UI Dropdown', function () {
    moduleTests({
        module: 'dropdown',
        element: '.ui.dropdown',
    });

    describe('Associated label', function () {
        const fixtures = jasmine.getFixtures(); // eslint-disable-line jest/no-jasmine-globals
        const options = '<option value="1">Alice</option><option value="2">Bob</option>';

        let $dropdown;

        function initialize(html, settings) {
            fixtures.set(html);
            $dropdown = $('select').dropdown($.extend({ transition: 'none' }, settings));
        }

        function isSearchFocused() {
            return document.activeElement === $dropdown.children('input.search')[0];
        }

        afterEach(function () {
            $dropdown.dropdown('destroy');
        });

        it('focuses the search input of a multiple search selection, which then opens on click', function () {
            initialize('<label for="members">Members</label><select id="members" class="ui multiple search selection dropdown" multiple>' + options + '</select>');

            $('label')[0].click();
            expect(isSearchFocused()).toBe(true);
            expect($dropdown.dropdown('is visible')).toBe(false);

            $dropdown[0].click();
            expect($dropdown.dropdown('is visible')).toBe(true);
        });

        it('focuses the search input of a single search selection', function () {
            initialize('<label for="member">Member</label><select id="member" class="ui search selection dropdown">' + options + '</select>');

            $('label')[0].click();
            expect(isSearchFocused()).toBe(true);
            expect($dropdown.dropdown('is visible')).toBe(false);
        });

        it('opens the menu of a search selection when showOnFocus is enabled', function () {
            initialize('<label for="members">Members</label><select id="members" class="ui multiple search selection dropdown" multiple>' + options + '</select>', {
                showOnFocus: true,
            });

            $('label')[0].click();
            expect(isSearchFocused()).toBe(true);
            expect($dropdown.dropdown('is visible')).toBe(true);
        });

        it('does not focus the search input of a disabled dropdown', function () {
            initialize('<label for="members">Members</label><select id="members" class="ui disabled multiple search selection dropdown" multiple>' + options + '</select>');

            $('label')[0].click();
            expect(isSearchFocused()).toBe(false);
        });

        it('ignores the clicks forwarded by a label wrapping a multiple search selection', function () {
            initialize('<label><span>Members</span><select class="ui multiple search selection dropdown" multiple>' + options + '</select></label>');
            $dropdown.dropdown('set selected', ['1', '2']);

            const $selectionLabel = $dropdown.children('.label').first();
            $selectionLabel[0].click();
            expect($selectionLabel.hasClass('active')).toBe(true);

            $('label > span')[0].click();
            expect(isSearchFocused()).toBe(false);

            $dropdown[0].click();
            expect($dropdown.dropdown('is visible')).toBe(true);
        });
    });
});
