"use strict";
require('rxjs/add/operator/take');
var testing_1 = require('@angular/core/testing');
var store_1 = require('@ngrx/store');
var store_devtools_1 = require('@ngrx/store-devtools');
function createStore(reducer, options) {
    if (options === void 0) { options = {}; }
    testing_1.TestBed.configureTestingModule({
        imports: [
            store_1.StoreModule.provideStore(reducer),
            store_devtools_1.StoreDevtoolsModule.instrumentStore(options)
        ]
    });
    var testbed = testing_1.getTestBed();
    var store = testbed.get(store_1.Store);
    var devtools = testbed.get(store_devtools_1.StoreDevtools);
    var state = testbed.get(store_1.State);
    var liftedValue;
    var value;
    var liftedStateSub = devtools.liftedState.subscribe(function (s) { return liftedValue = s; });
    var stateSub = devtools.state.subscribe(function (s) { return value = s; });
    var getState = function () { return value; };
    var getLiftedState = function () { return liftedValue; };
    var cleanup = function () {
        liftedStateSub.unsubscribe();
        stateSub.unsubscribe();
    };
    var replaceReducer = function (reducer) {
        store.replaceReducer(reducer);
    };
    return { store: store, state: state, devtools: devtools, cleanup: cleanup, getState: getState, getLiftedState: getLiftedState, replaceReducer: replaceReducer };
}
exports.createStore = createStore;
//# sourceMappingURL=utils.for.reducers.js.map