import { Url/*, Feed*/ } from '../url/url.model';

export const UrlActions = {
      URL_ADD_1 : '[Url] Add 1',
      URL_ADD_N : '[Url] Add N',
      URL_DELETE : '[Url] delete',
      URL_UPDATE : '[Url] update',
      URL_CLEAR: '[Url] Initialized'
  };

export function UrlState (state = [], action) {

      console.log("urlState state = " + JSON.stringify(state));
      console.log("urlState action = " + JSON.stringify(action));

     switch (action.type) {
        case UrlActions.URL_ADD_1:
          return [
              ...state,
              action.payload
          ];       
        case UrlActions.URL_ADD_N:
          return action.payload; 
        case UrlActions.URL_CLEAR:
          return [];
        default:
            return state;
    }
}