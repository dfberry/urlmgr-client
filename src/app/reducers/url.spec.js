"use strict";
require('rxjs/add/operator/take');
var url_1 = require('./url');
var utils_for_reducers_1 = require('./utils.for.reducers');
var testReducer = jasmine.createSpy('urlReducerSpy').and.callFake(url_1.urlReducer);
describe('Url Store Devtools', function () {
    describe('Instrumentation', function () {
        var fixture;
        var store;
        var devtools;
        var getState;
        var getLiftedState;
        beforeEach(function () {
            fixture = utils_for_reducers_1.createStore(testReducer);
            store = fixture.store;
            devtools = fixture.devtools;
            getState = fixture.getState;
            getLiftedState = fixture.getLiftedState;
        });
        afterEach(function () {
            fixture.cleanup();
        });
        it('should alias devtools unlifted state to Store\'s state', function () {
            expect(devtools.state).toBe(fixture.state);
        });
        it('should perform actions', function () {
            var newItem = new url_1.Url();
            var expectedState = [];
            expectedState.push(newItem);
            newItem.url = "should perform actions";
            console.log(getState());
            expect(getState()).toEqual([]);
            store.dispatch({ type: 'ADD_URL', payload: newItem });
            console.log(getState());
            expect(getState()).toEqual(expectedState);
        });
    });
});
//# sourceMappingURL=url.spec.js.map