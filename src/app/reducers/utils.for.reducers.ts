import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';
import { ReflectiveInjector } from '@angular/core';
import { TestBed, getTestBed } from '@angular/core/testing';
import { StoreModule, Store, State, ActionReducer } from '@ngrx/store';

import { StoreDevtools, StoreDevtoolsModule, LiftedState, StoreDevtoolsConfig } from '@ngrx/store-devtools';


export type Fixture<T> = {
  store: Store<T>;
  state: State<T>;
  devtools: StoreDevtools;
  cleanup: () => void;
  getState: () => T;
  getLiftedState: () => LiftedState;
  replaceReducer: (reducer) => void;
};

export function createStore<T>(reducer: ActionReducer<T>, options: StoreDevtoolsConfig = {}): Fixture<T> {
  TestBed.configureTestingModule({
    imports: [
      StoreModule.provideStore(reducer),
      StoreDevtoolsModule.instrumentStore(options)
    ]
  });

  const testbed: TestBed = getTestBed();
  const store: Store<T> = testbed.get(Store);
  const devtools: StoreDevtools = testbed.get(StoreDevtools);
  const state: State<T> = testbed.get(State);
  let liftedValue: LiftedState;
  let value: T;

  const liftedStateSub = devtools.liftedState.subscribe(s => liftedValue = s);
  const stateSub = devtools.state.subscribe(s => value = s);

  const getState = (): T => value;
  const getLiftedState = (): LiftedState => liftedValue;

  const cleanup = () => {
    liftedStateSub.unsubscribe();
    stateSub.unsubscribe();
  };

  const replaceReducer = reducer => {
    store.replaceReducer(reducer);
  };


  return { store, state, devtools, cleanup, getState, getLiftedState, replaceReducer };
}
