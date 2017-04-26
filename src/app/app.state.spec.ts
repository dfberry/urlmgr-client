//test reducers: http://blog.kwintenp.com/how-to-write-clean-reducers-and-test-them/
//freeze store: https://github.com/codewareio/ngrx-store-freeze
//http://orizens.com/wp/topics/adding-redux-with-ngrxstore-to-angular2-part-2-testing-reducers/

import { TestBed, async} from '@angular/core/testing';
import { UrlState, UrlActions } from './app.state';
import { Url/*, Feed*/ } from './url/url.model';

describe("reducers", () => {
  describe('url reducer', () => {
      it('should add 1 item to empty state', () => {

          // arrange
          let url = new Url();
          url.id = "111";
          let expected=[];
          expected.push(url);
          const state = [];
          const action = { "type": UrlActions.URL_ADD_1, "payload": url};
          
          // act
          const actual = UrlState(state, action);

          // assert
          expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
      });
      it("should clear all items from state", () => {

        // arrange
        let url1 = new Url();
        url1.id = "111";
        let url2 = new Url();
        url2.id = "112";

        let state = [];
        state.push(url1);
        state.push(url2);

        // act && send in state twice - both sets of state should be ignored
        const testaction = { "type": UrlActions.URL_CLEAR, "payload": JSON.parse(JSON.stringify(state)) };
        let finalstate = UrlState(state, testaction);

        // assert
        expect(finalstate.length).toBe(0);


      });
      it("should add all items from state", () => {

        // arrange
        let url1 = new Url();
        url1.id = "111";
        let url2 = new Url();
        url2.id = "112";

        let state = [];
        state.push(url1);
        state.push(url2);

        const action = { "type": UrlActions.URL_ADD_N, "payload": JSON.parse(JSON.stringify(state)) };
        
        // act
        let currentState = UrlState([], action);

        // make sure arrangment/setup is correct
        expect(currentState.length).toBe(2);
      });
      it("should return passed in state if no action is specified", () => {

        // arrange
        let url1 = new Url();
        url1.id = "111";
        let url2 = new Url();
        url2.id = "112";

        let state = [];
        state.push(url1);
        state.push(url2);

        // act
        let currentState = UrlState(state, undefined);

        expect(currentState.length).toBe(2);
      });
  });
});