/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* makes sure that the allFeeds variable has been defined and
         * that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Makes sure allFeeds have a URL defined and that the URL is not empty
        it('url defined', function(){
            for(let feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        // Makes sure each feed in the allFeeds object has a name defined and that the name is not empty
        it('name defined', function(){
            for(let feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    // Test suite named "The menu"
    describe('The menu', function(){
        // Test that checks if the menu element is hidden by default.
        it('is hidden', function(){
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        //  Test that checks the menu changes visibility when the menu icon is clicked.
        it('toggles on and off', function(){
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    // Test suite named "Initial Entries"
    describe('Initial Entries', function(){
        // Test is async we use Jasmine's beforeEach and done() functions with
        // loadFeed
        beforeEach(function(done){
            loadFeed(0, done);
        });
        // Test that checks if there is at least a single .entry element
        // within the .feed container
        it('there is a singe .entry element within the .feed container', function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        const feed = document.querySelector('.feed');
        const firstFeed = [];
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done){
            loadFeed(0);
            Array.from(feed.children).forEach(function(entry){
                firstFeed.push(entry.innerText);
            });
            loadFeed(1, done);
        });
        it('content changes',function(){
            Array.from(feed.children).forEach(function(entry,index){
                expect(entry.innerText === firstFeed[index]).toBe(false);
            });
        });
    });
}());
