import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';
import { ReflectiveInjector } from '@angular/core';
import { TestBed, getTestBed } from '@angular/core/testing';
import { StoreModule, Store, State, ActionReducer } from '@ngrx/store';

import { StoreDevtools, StoreDevtoolsModule, LiftedState, StoreDevtoolsConfig } from '@ngrx/store-devtools';

import { Url, urlReducer } from './url';
import { Fixture, createStore } from './utils.for.reducers';

declare var mistake;

const testReducer = jasmine.createSpy('urlReducerSpy').and.callFake(urlReducer);

describe('Url Store Devtools', () => {
  describe('Instrumentation', () => {
    let fixture: Fixture<Url[]>;
    let store: Store<Url[]>;
    let devtools: StoreDevtools;
    let getState: () => Url[];
    let getLiftedState: () => LiftedState;

    beforeEach(() => {
      fixture = createStore(testReducer);
      store = fixture.store;
      devtools = fixture.devtools;
      getState = fixture.getState;
      getLiftedState = fixture.getLiftedState;
    });

    afterEach(() => {
      fixture.cleanup();
    });

    it('should alias devtools unlifted state to Store\'s state', () => {
      expect(devtools.state).toBe(fixture.state);
    });

    it('should perform actions', () => {

      let newItem = new Url();
      let expectedState = [];
      expectedState.push(newItem);

      newItem.url="should perform actions";

      console.log(getState());
      expect(getState()).toEqual([]);
      store.dispatch({ type: 'ADD_URL' , payload: newItem});
      console.log(getState());
      expect(getState()).toEqual(expectedState);

    });
  });
});