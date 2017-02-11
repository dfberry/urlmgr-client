"use strict";
require('rxjs/add/operator/take');
var testing_1 = require('@angular/core/testing');
var store_1 = require('@ngrx/store');
var store_devtools_1 = require('@ngrx/store-devtools');
var counter = jasmine.createSpy('counter').and.callFake(function (state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case 'INCREMENT': return state + 1;
        case 'DECREMENT': return state - 1;
        default: return state;
    }
});
function counterWithBug(state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case 'INCREMENT': return state + 1;
        case 'DECREMENT': return mistake - 1; // mistake is undefined
        case 'SET_UNDEFINED': return undefined;
        default: return state;
    }
}
function counterWithAnotherBug(state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case 'INCREMENT': return mistake + 1; // eslint-disable-line no-undef
        case 'DECREMENT': return state - 1;
        case 'SET_UNDEFINED': return undefined;
        default: return state;
    }
}
function doubleCounter(state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case 'INCREMENT': return state + 2;
        case 'DECREMENT': return state - 2;
        default: return state;
    }
}
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
describe('Store Devtools', function () {
    describe('Instrumentation', function () {
        var fixture;
        var store;
        var devtools;
        var getState;
        var getLiftedState;
        beforeEach(function () {
            fixture = createStore(counter);
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
            expect(getState()).toBe(0);
            store.dispatch({ type: 'INCREMENT' });
            expect(getState()).toBe(1);
            store.dispatch({ type: 'INCREMENT' });
            expect(getState()).toBe(2);
        });
        it('should rollback state to the last committed state', function () {
            store.dispatch({ type: 'INCREMENT' });
            store.dispatch({ type: 'INCREMENT' });
            expect(getState()).toBe(2);
            devtools.commit();
            expect(getState()).toBe(2);
            store.dispatch({ type: 'INCREMENT' });
            store.dispatch({ type: 'INCREMENT' });
            expect(getState()).toBe(4);
            devtools.rollback();
            expect(getState()).toBe(2);
            store.dispatch({ type: 'DECREMENT' });
            expect(getState()).toBe(1);
            devtools.rollback();
            expect(getState()).toBe(2);
        });
        it('should reset to initial state', function () {
            store.dispatch({ type: 'INCREMENT' });
            expect(getState()).toBe(1);
            devtools.commit();
            expect(getState()).toBe(1);
            store.dispatch({ type: 'INCREMENT' });
            expect(getState()).toBe(2);
            devtools.rollback();
            expect(getState()).toBe(1);
            store.dispatch({ type: 'INCREMENT' });
            expect(getState()).toBe(2);
            devtools.reset();
            expect(getState()).toBe(0);
        });
        it('should toggle an action', function () {
            // actionId 0 = @@INIT
            store.dispatch({ type: 'INCREMENT' });
            store.dispatch({ type: 'DECREMENT' });
            store.dispatch({ type: 'INCREMENT' });
            expect(getState()).toBe(1);
            devtools.toggleAction(2);
            expect(getState()).toBe(2);
            devtools.toggleAction(2);
            expect(getState()).toBe(1);
        });
        it('should sweep disabled actions', function () {
            // actionId 0 = @@INIT
            store.dispatch({ type: 'INCREMENT' });
            store.dispatch({ type: 'DECREMENT' });
            store.dispatch({ type: 'INCREMENT' });
            store.dispatch({ type: 'INCREMENT' });
            expect(getState()).toBe(2);
            expect(getLiftedState().stagedActionIds).toEqual([0, 1, 2, 3, 4]);
            expect(getLiftedState().skippedActionIds).toEqual([]);
            devtools.toggleAction(2);
            expect(getState()).toBe(3);
            expect(getLiftedState().stagedActionIds).toEqual([0, 1, 2, 3, 4]);
            expect(getLiftedState().skippedActionIds).toEqual([2]);
            devtools.sweep();
            expect(getState()).toBe(3);
            expect(getLiftedState().stagedActionIds).toEqual([0, 1, 3, 4]);
            expect(getLiftedState().skippedActionIds).toEqual([]);
        });
        it('should jump to state', function () {
            store.dispatch({ type: 'INCREMENT' });
            store.dispatch({ type: 'DECREMENT' });
            store.dispatch({ type: 'INCREMENT' });
            expect(getState()).toBe(1);
            devtools.jumpToState(0);
            expect(getState()).toBe(0);
            devtools.jumpToState(1);
            expect(getState()).toBe(1);
            devtools.jumpToState(2);
            expect(getState()).toBe(0);
            store.dispatch({ type: 'INCREMENT' });
            expect(getState()).toBe(0);
            devtools.jumpToState(4);
            expect(getState()).toBe(2);
        });
        it('should replace the reducer', function () {
            store.dispatch({ type: 'INCREMENT' });
            store.dispatch({ type: 'DECREMENT' });
            store.dispatch({ type: 'INCREMENT' });
            expect(getState()).toBe(1);
            fixture.replaceReducer(doubleCounter);
            expect(getState()).toBe(2);
        });
        it('should catch and record errors', function () {
            spyOn(console, 'error');
            fixture.replaceReducer(counterWithBug);
            store.dispatch({ type: 'INCREMENT' });
            store.dispatch({ type: 'DECREMENT' });
            store.dispatch({ type: 'INCREMENT' });
            var computedStates = fixture.getLiftedState().computedStates;
            expect(computedStates[2].error).toMatch(/ReferenceError/);
            expect(computedStates[3].error).toMatch(/Interrupted by an error up the chain/);
            expect(console.error).toHaveBeenCalled();
        });
        it('should catch invalid action type', function () {
            expect(function () {
                store.dispatch({ type: undefined });
            }).toThrowError('Actions may not have an undefined "type" property. ' +
                'Have you misspelled a constant?');
        });
        it('should not recompute old states when toggling an action', function () {
            counter.calls.reset();
            store.dispatch({ type: 'INCREMENT' });
            store.dispatch({ type: 'INCREMENT' });
            store.dispatch({ type: 'INCREMENT' });
            expect(counter).toHaveBeenCalledTimes(3);
            devtools.toggleAction(3);
            expect(counter).toHaveBeenCalledTimes(3);
            devtools.toggleAction(3);
            expect(counter).toHaveBeenCalledTimes(4);
            devtools.toggleAction(2);
            expect(counter).toHaveBeenCalledTimes(5);
            devtools.toggleAction(2);
            expect(counter).toHaveBeenCalledTimes(7);
            devtools.toggleAction(1);
            expect(counter).toHaveBeenCalledTimes(9);
            devtools.toggleAction(2);
            expect(counter).toHaveBeenCalledTimes(10);
            devtools.toggleAction(3);
            expect(counter).toHaveBeenCalledTimes(10);
            devtools.toggleAction(1);
            expect(counter).toHaveBeenCalledTimes(11);
            devtools.toggleAction(3);
            expect(counter).toHaveBeenCalledTimes(12);
            devtools.toggleAction(2);
            expect(counter).toHaveBeenCalledTimes(14);
        });
        it('should not recompute states when jumping to state', function () {
            counter.calls.reset();
            store.dispatch({ type: 'INCREMENT' });
            store.dispatch({ type: 'INCREMENT' });
            store.dispatch({ type: 'INCREMENT' });
            expect(counter).toHaveBeenCalledTimes(3);
            var savedComputedStates = getLiftedState().computedStates;
            devtools.jumpToState(0);
            expect(counter).toHaveBeenCalledTimes(3);
            devtools.jumpToState(1);
            expect(counter).toHaveBeenCalledTimes(3);
            devtools.jumpToState(3);
            expect(counter).toHaveBeenCalledTimes(3);
            expect(getLiftedState().computedStates).toBe(savedComputedStates);
        });
        it('should not recompute states on monitor actions', function () {
            counter.calls.reset();
            store.dispatch({ type: 'INCREMENT' });
            store.dispatch({ type: 'INCREMENT' });
            store.dispatch({ type: 'INCREMENT' });
            expect(counter).toHaveBeenCalledTimes(3);
            var savedComputedStates = getLiftedState().computedStates;
            devtools.dispatch({ type: 'lol' });
            expect(counter).toHaveBeenCalledTimes(3);
            devtools.dispatch({ type: 'wat' });
            expect(counter).toHaveBeenCalledTimes(3);
            expect(getLiftedState().computedStates).toBe(savedComputedStates);
        });
    });
    describe('maxAge option', function () {
        it('should auto-commit earliest non-@@INIT action when maxAge is reached', function () {
            var fixture = createStore(counter, { maxAge: 3 });
            fixture.store.dispatch({ type: 'INCREMENT' });
            fixture.store.dispatch({ type: 'INCREMENT' });
            expect(fixture.getState()).toBe(2);
            expect(Object.keys(fixture.getLiftedState().actionsById).length).toBe(3);
            expect(fixture.getLiftedState().committedState).toBe(0);
            expect(fixture.getLiftedState().stagedActionIds.indexOf(1)).not.toBe(-1);
            // Trigger auto-commit.
            fixture.store.dispatch({ type: 'INCREMENT' });
            expect(fixture.getState()).toBe(3);
            expect(Object.keys(fixture.getLiftedState().actionsById).length).toBe(3);
            expect(fixture.getLiftedState().stagedActionIds.indexOf(1)).toBe(-1);
            expect(fixture.getLiftedState().computedStates[0].state).toBe(1);
            expect(fixture.getLiftedState().committedState).toBe(1);
            expect(fixture.getLiftedState().currentStateIndex).toBe(2);
            fixture.cleanup();
        });
        it('should remove skipped actions once committed', function () {
            var fixture = createStore(counter, { maxAge: 3 });
            fixture.store.dispatch({ type: 'INCREMENT' });
            fixture.devtools.toggleAction(1);
            fixture.store.dispatch({ type: 'INCREMENT' });
            expect(fixture.getLiftedState().skippedActionIds.indexOf(1)).not.toBe(-1);
            fixture.store.dispatch({ type: 'INCREMENT' });
            expect(fixture.getLiftedState().skippedActionIds.indexOf(1)).toBe(-1);
            fixture.cleanup();
        });
        it('should not auto-commit errors', function () {
            spyOn(console, 'error');
            var fixture = createStore(counterWithBug, { maxAge: 3 });
            fixture.store.dispatch({ type: 'DECREMENT' });
            fixture.store.dispatch({ type: 'INCREMENT' });
            expect(fixture.getLiftedState().stagedActionIds.length).toBe(3);
            fixture.store.dispatch({ type: 'INCREMENT' });
            expect(fixture.getLiftedState().stagedActionIds.length).toBe(4);
            fixture.cleanup();
        });
        it('should auto-commit actions after hot reload fixes error', function () {
            spyOn(console, 'error');
            var fixture = createStore(counterWithBug, { maxAge: 3 });
            fixture.store.dispatch({ type: 'DECREMENT' });
            fixture.store.dispatch({ type: 'DECREMENT' });
            fixture.store.dispatch({ type: 'INCREMENT' });
            fixture.store.dispatch({ type: 'DECREMENT' });
            fixture.store.dispatch({ type: 'DECREMENT' });
            fixture.store.dispatch({ type: 'DECREMENT' });
            expect(fixture.getLiftedState().stagedActionIds.length).toBe(7);
            // Auto-commit 2 actions by "fixing" reducer bug, but introducing another.
            fixture.store.replaceReducer(counterWithAnotherBug);
            expect(fixture.getLiftedState().stagedActionIds.length).toBe(5);
            // Auto-commit 2 more actions by "fixing" other reducer bug.
            fixture.store.replaceReducer(counter);
            expect(fixture.getLiftedState().stagedActionIds.length).toBe(3);
            fixture.cleanup();
        });
        it('should update currentStateIndex when auto-committing', function () {
            var fixture = createStore(counter, { maxAge: 3 });
            fixture.store.dispatch({ type: 'INCREMENT' });
            fixture.store.dispatch({ type: 'INCREMENT' });
            expect(fixture.getLiftedState().currentStateIndex).toBe(2);
            // currentStateIndex should stay at 2 as actions are committed.
            fixture.store.dispatch({ type: 'INCREMENT' });
            var liftedStoreState = fixture.getLiftedState();
            var currentComputedState = liftedStoreState.computedStates[liftedStoreState.currentStateIndex];
            expect(liftedStoreState.currentStateIndex).toBe(2);
            expect(currentComputedState.state).toBe(3);
            fixture.cleanup();
        });
        it('should continue to increment currentStateIndex while error blocks commit', function () {
            spyOn(console, 'error');
            var fixture = createStore(counterWithBug, { maxAge: 3 });
            fixture.store.dispatch({ type: 'DECREMENT' });
            fixture.store.dispatch({ type: 'DECREMENT' });
            fixture.store.dispatch({ type: 'DECREMENT' });
            fixture.store.dispatch({ type: 'DECREMENT' });
            var liftedStoreState = fixture.getLiftedState();
            var currentComputedState = liftedStoreState.computedStates[liftedStoreState.currentStateIndex];
            expect(liftedStoreState.currentStateIndex).toBe(4);
            expect(currentComputedState.state).toBe(0);
            expect(currentComputedState.error).toBeDefined();
            fixture.cleanup();
        });
        it('should adjust currentStateIndex correctly when multiple actions are committed', function () {
            spyOn(console, 'error');
            var fixture = createStore(counterWithBug, { maxAge: 3 });
            fixture.store.dispatch({ type: 'DECREMENT' });
            fixture.store.dispatch({ type: 'DECREMENT' });
            fixture.store.dispatch({ type: 'DECREMENT' });
            fixture.store.dispatch({ type: 'DECREMENT' });
            // Auto-commit 2 actions by "fixing" reducer bug.
            fixture.store.replaceReducer(counter);
            var liftedStoreState = fixture.getLiftedState();
            var currentComputedState = liftedStoreState.computedStates[liftedStoreState.currentStateIndex];
            expect(liftedStoreState.currentStateIndex).toBe(2);
            expect(currentComputedState.state).toBe(-4);
            fixture.cleanup();
        });
        it('should not allow currentStateIndex to drop below 0', function () {
            spyOn(console, 'error');
            var fixture = createStore(counterWithBug, { maxAge: 3 });
            fixture.store.dispatch({ type: 'DECREMENT' });
            fixture.store.dispatch({ type: 'DECREMENT' });
            fixture.store.dispatch({ type: 'DECREMENT' });
            fixture.store.dispatch({ type: 'DECREMENT' });
            fixture.devtools.jumpToState(1);
            // Auto-commit 2 actions by "fixing" reducer bug.
            fixture.store.replaceReducer(counter);
            var liftedStoreState = fixture.getLiftedState();
            var currentComputedState = liftedStoreState.computedStates[liftedStoreState.currentStateIndex];
            expect(liftedStoreState.currentStateIndex).toBe(0);
            expect(currentComputedState.state).toBe(-2);
            fixture.cleanup();
        });
        it('should throw error when maxAge < 2', function () {
            expect(function () {
                createStore(counter, { maxAge: 1 });
            }).toThrowError(/cannot be less than/);
        });
    });
    describe('Import State', function () {
        var fixture;
        var exportedState;
        beforeEach(function () {
            fixture = createStore(counter);
            fixture.store.dispatch({ type: 'INCREMENT' });
            fixture.store.dispatch({ type: 'INCREMENT' });
            fixture.store.dispatch({ type: 'INCREMENT' });
            exportedState = fixture.getLiftedState();
        });
        afterEach(function () {
            fixture.cleanup();
        });
        it('should replay all the steps when a state is imported', function () {
            fixture.devtools.importState(exportedState);
            expect(fixture.getLiftedState()).toEqual(exportedState);
        });
        it('should replace the existing action log with the one imported', function () {
            fixture.store.dispatch({ type: 'DECREMENT' });
            fixture.store.dispatch({ type: 'DECREMENT' });
            fixture.devtools.importState(exportedState);
            expect(fixture.getLiftedState()).toEqual(exportedState);
        });
    });
});
//# sourceMappingURL=store.spec.js.map