## [2.7.6](https://github.com/fomantic/Fomantic-UI/compare/2.7.5...2.7.6) (2019-06-16)


### Bug Fixes

* **button:** center text in fluid & vertically aligned button group ([bfd7c84](https://github.com/fomantic/Fomantic-UI/commit/bfd7c84))
* **button,table:** move LESS functions out of LESS file and into variables ([e3d7eb6](https://github.com/fomantic/Fomantic-UI/commit/e3d7eb6)), closes [#736](https://github.com/fomantic/Fomantic-UI/issues/736)
* **calendar:** support dynamic way to append popup instead of prepending to the parent ([1acf30e](https://github.com/fomantic/Fomantic-UI/commit/1acf30e)), closes [#699](https://github.com/fomantic/Fomantic-UI/issues/699)
* **calendar:** support JSON dates ([2d1ffdc](https://github.com/fomantic/Fomantic-UI/commit/2d1ffdc)), closes [#741](https://github.com/fomantic/Fomantic-UI/issues/741)
* **dropdown:** check for existing observer before accessing it ([e7ebb38](https://github.com/fomantic/Fomantic-UI/commit/e7ebb38)), closes [#784](https://github.com/fomantic/Fomantic-UI/issues/784)
* **form:** remove rule function lead to TypeError ([752827e](https://github.com/fomantic/Fomantic-UI/commit/752827e))
* **form:** stop propagation only when dirty event was triggered and prevent default action ([2b33903](https://github.com/fomantic/Fomantic-UI/commit/2b33903)), closes [#746](https://github.com/fomantic/Fomantic-UI/issues/746) [#770](https://github.com/fomantic/Fomantic-UI/issues/770) [#786](https://github.com/fomantic/Fomantic-UI/issues/786) [atk4/ui#718](https://github.com/atk4/ui/issues/718)
* **form:** transparent input padding and texarea support ([dd561b5](https://github.com/fomantic/Fomantic-UI/commit/dd561b5)), closes [#798](https://github.com/fomantic/Fomantic-UI/issues/798)
* **icon:** don't import default theme overrides ([c4d5307](https://github.com/fomantic/Fomantic-UI/commit/c4d5307)), closes [#763](https://github.com/fomantic/Fomantic-UI/issues/763)
* **icon:** improve default theme overrides import ([0bf3ddf](https://github.com/fomantic/Fomantic-UI/commit/0bf3ddf)), closes [#763](https://github.com/fomantic/Fomantic-UI/issues/763)
* **menu:** hover & active state colors on inverted secondary pointing ([d34b681](https://github.com/fomantic/Fomantic-UI/commit/d34b681)), closes [#777](https://github.com/fomantic/Fomantic-UI/issues/777)
* **progress:** wrong error on validating total on multiple progress ([52bfd66](https://github.com/fomantic/Fomantic-UI/commit/52bfd66)), closes [#757](https://github.com/fomantic/Fomantic-UI/issues/757)
* **slider:** non reachable max value and rounding issues ([014b7ef](https://github.com/fomantic/Fomantic-UI/commit/014b7ef)), closes [#716](https://github.com/fomantic/Fomantic-UI/issues/716)
* **table:** table header on mobile ([e09b2ab](https://github.com/fomantic/Fomantic-UI/commit/e09b2ab)), closes [#787](https://github.com/fomantic/Fomantic-UI/issues/787)
* **transition:** not checking for event object lead to TypeError ([0c56c8d](https://github.com/fomantic/Fomantic-UI/commit/0c56c8d)), closes [#698](https://github.com/fomantic/Fomantic-UI/issues/698) [#745](https://github.com/fomantic/Fomantic-UI/issues/745)


### Features

* **progress:** add indeterminate states ([816fbbd](https://github.com/fomantic/Fomantic-UI/commit/816fbbd))



## [2.7.5](https://github.com/fomantic/Fomantic-UI/compare/2.7.4...2.7.5) (2019-05-09)


### Bug Fixes

* breakpoints ignoring next breakpoint in some cases ([7ff01e3](https://github.com/fomantic/Fomantic-UI/commit/7ff01e3)), closes [#567](https://github.com/fomantic/Fomantic-UI/issues/567) [#567](https://github.com/fomantic/Fomantic-UI/issues/567) [#681](https://github.com/fomantic/Fomantic-UI/issues/681) [#681](https://github.com/fomantic/Fomantic-UI/issues/681)
* **api:** module callback function typo ([43c2c8b](https://github.com/fomantic/Fomantic-UI/commit/43c2c8b))
* **breadcrumb:** increase line height for readability on wrapped content ([c7ca707](https://github.com/fomantic/Fomantic-UI/commit/c7ca707))
* **button:** fix padding for compact labeled icon button ([488a4dc](https://github.com/fomantic/Fomantic-UI/commit/488a4dc)), closes [#361](https://github.com/fomantic/Fomantic-UI/issues/361) [#598](https://github.com/fomantic/Fomantic-UI/issues/598)
* **button:** group of basic disabled buttons had incorrect styles ([7f63e50](https://github.com/fomantic/Fomantic-UI/commit/7f63e50)), closes [#643](https://github.com/fomantic/Fomantic-UI/issues/643)
* **calendar:** string selectors for start/endCalendar did not work ([9604a02](https://github.com/fomantic/Fomantic-UI/commit/9604a02)), closes [#685](https://github.com/fomantic/Fomantic-UI/issues/685)
* **calendar:** support dateobject given for parse.date as for initialDate setting ([1a4938a](https://github.com/fomantic/Fomantic-UI/commit/1a4938a))
* **card:** force horizontal cards meta, extra content and actions to align properly ([bc1f08b](https://github.com/fomantic/Fomantic-UI/commit/bc1f08b)), closes [#159](https://github.com/fomantic/Fomantic-UI/issues/159) [#159](https://github.com/fomantic/Fomantic-UI/issues/159)
* **card:** word-wrap overflowing with long strings ([8b75f0f](https://github.com/fomantic/Fomantic-UI/commit/8b75f0f))
* **chore:** moved some core css to less files from default overrides and always include default overrides first ([2bfe9a5](https://github.com/fomantic/Fomantic-UI/commit/2bfe9a5))
* **dimmer:** disable blur on popups ([f10dd0b](https://github.com/fomantic/Fomantic-UI/commit/f10dd0b))
* **dropdown:** click-event was locked when single selection had allowAdditions enabled ([ef3057e](https://github.com/fomantic/Fomantic-UI/commit/ef3057e)), closes [#591](https://github.com/fomantic/Fomantic-UI/issues/591)
* **dropdown:** correct alignment of image and icons within items ([72d3420](https://github.com/fomantic/Fomantic-UI/commit/72d3420))
* **dropdown:** hide open menus on destroy for correct state reset ([c374bcf](https://github.com/fomantic/Fomantic-UI/commit/c374bcf)), closes [#653](https://github.com/fomantic/Fomantic-UI/issues/653) [#654](https://github.com/fomantic/Fomantic-UI/issues/654)
* **dropdown:** inverted pointing menu had white arrow ([124625c](https://github.com/fomantic/Fomantic-UI/commit/124625c))
* **dropdown:** margin missing on upward dropdown ([024f5d4](https://github.com/fomantic/Fomantic-UI/commit/024f5d4))
* **dropdown:** prevent submenu vanish for simple dropdowns ([6998edd](https://github.com/fomantic/Fomantic-UI/commit/6998edd))
* **form:** corrects border radius variable reference ([5745cf7](https://github.com/fomantic/Fomantic-UI/commit/5745cf7)), closes [#628](https://github.com/fomantic/Fomantic-UI/issues/628)
* **form:** remove unnecessary property '-webkit-appearance: none' with :focus from error field ([63cbf2d](https://github.com/fomantic/Fomantic-UI/commit/63cbf2d)), closes [#576](https://github.com/fomantic/Fomantic-UI/issues/576)
* **form validation:** error when calling "validate form" with API attached ([58dafe0](https://github.com/fomantic/Fomantic-UI/commit/58dafe0))
* **form validation:** make sure rules are selecting within the same form ([313012d](https://github.com/fomantic/Fomantic-UI/commit/313012d))
* **input:** error border didn't change input action border ([0aab16f](https://github.com/fomantic/Fomantic-UI/commit/0aab16f))
* **label:** adjust basic ribbon label size and position ([9e9cb62](https://github.com/fomantic/Fomantic-UI/commit/9e9cb62)), closes [#708](https://github.com/fomantic/Fomantic-UI/issues/708)
* **list:** align text in lists with icons ([566b363](https://github.com/fomantic/Fomantic-UI/commit/566b363)), closes [#597](https://github.com/fomantic/Fomantic-UI/issues/597)
* **menu:** additional specificity for secondary inverted menu no longer needed ([8917519](https://github.com/fomantic/Fomantic-UI/commit/8917519)), closes [#366](https://github.com/fomantic/Fomantic-UI/issues/366) [#672](https://github.com/fomantic/Fomantic-UI/issues/672)
* **menu:** correct floating label position in pointing menu ([ddb7695](https://github.com/fomantic/Fomantic-UI/commit/ddb7695)), closes [#668](https://github.com/fomantic/Fomantic-UI/issues/668)
* **menu:** correct submenu fix which broke right menus ([af98873](https://github.com/fomantic/Fomantic-UI/commit/af98873)), closes [#632](https://github.com/fomantic/Fomantic-UI/issues/632) [#632](https://github.com/fomantic/Fomantic-UI/issues/632)
* **menu:** right dropdown sub-menu not being vertical ([c571c31](https://github.com/fomantic/Fomantic-UI/commit/c571c31)), closes [#382](https://github.com/fomantic/Fomantic-UI/issues/382)
* **modal:** `autofocus` shouldn’t focus disabled inputs ([fadbc30](https://github.com/fomantic/Fomantic-UI/commit/fadbc30))
* **modal:** dont close dimmer when another modal is still animating ([58cf41a](https://github.com/fomantic/Fomantic-UI/commit/58cf41a))
* **modal:** dont wrap image content direct images ([5a59ae3](https://github.com/fomantic/Fomantic-UI/commit/5a59ae3))
* **modal:** open animation broken on first open ([353f90f](https://github.com/fomantic/Fomantic-UI/commit/353f90f)), closes [#542](https://github.com/fomantic/Fomantic-UI/issues/542)
* **modal:** support fixed menu, toast and sidebar to also not move when a modal is shown ([aeb3274](https://github.com/fomantic/Fomantic-UI/commit/aeb3274))
* **modal:** use direct sibling for content selector ([e4fbb61](https://github.com/fomantic/Fomantic-UI/commit/e4fbb61))
* **popup:** support iOS to recognize popup close on touch ([c978917](https://github.com/fomantic/Fomantic-UI/commit/c978917))
* **progess:** all percents are shown while animation ([dba3f1c](https://github.com/fomantic/Fomantic-UI/commit/dba3f1c)), closes [#707](https://github.com/fomantic/Fomantic-UI/issues/707)
* **progess:** fix timing issue of updating value/percent ([fe97fc4](https://github.com/fomantic/Fomantic-UI/commit/fe97fc4))
* **progress:** display 0 valued progress bars ([a92b8ac](https://github.com/fomantic/Fomantic-UI/commit/a92b8ac))
* **search:** undefined internal variable ([7b89336](https://github.com/fomantic/Fomantic-UI/commit/7b89336))
* **tab:** position issue with fixed item size ([3b923dd](https://github.com/fomantic/Fomantic-UI/commit/3b923dd)), closes [#671](https://github.com/fomantic/Fomantic-UI/issues/671)
* **table:** definition table footer had wrong box-shadow to the left ([96b97f3](https://github.com/fomantic/Fomantic-UI/commit/96b97f3))
* **table:** don't break style when nested tables ([9760d91](https://github.com/fomantic/Fomantic-UI/commit/9760d91))
* **table:** selectable rows/cells should have pointing cursor ([7742fa3](https://github.com/fomantic/Fomantic-UI/commit/7742fa3))


### Features

* **breadcrumb:** add inverted variant ([ff6ba2d](https://github.com/fomantic/Fomantic-UI/commit/ff6ba2d))
* **calendar:** add eventDates support and onSelect handler ([1b4a264](https://github.com/fomantic/Fomantic-UI/commit/1b4a264)), closes [#674](https://github.com/fomantic/Fomantic-UI/issues/674)
* **checkbox:** vertically align checkbox in fields ([dcf3976](https://github.com/fomantic/Fomantic-UI/commit/dcf3976))
* **divider:** add horizontal divider alignment variation ([1981277](https://github.com/fomantic/Fomantic-UI/commit/1981277))
* **dropdown:** add scrolling support for simple variant ([9c8f18f](https://github.com/fomantic/Fomantic-UI/commit/9c8f18f))
* **form:** add calendar input field ([8152b38](https://github.com/fomantic/Fomantic-UI/commit/8152b38))
* **form:** add dirty and clean states, and ability to cancel submit ([adf5937](https://github.com/fomantic/Fomantic-UI/commit/adf5937))
* **icons:** update to FA 5.8.2 ([6d7b12c](https://github.com/fomantic/Fomantic-UI/commit/6d7b12c)), closes [#572](https://github.com/fomantic/Fomantic-UI/issues/572)
* **segment:** add fitted variant ([f03c4ec](https://github.com/fomantic/Fomantic-UI/commit/f03c4ec)), closes [#701](https://github.com/fomantic/Fomantic-UI/issues/701)


---

If you are looking for older releases you can view the old changelog [here](https://github.com/fomantic/Fomantic-UI/blob/12858b50efc5e00fa722e4438d0c83593b8bf29e/RELEASE-NOTES.md)
