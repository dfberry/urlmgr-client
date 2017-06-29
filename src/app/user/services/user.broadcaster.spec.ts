import { TestBed, async, inject } from '@angular/core/testing';
import { Broadcaster} from '../../services/broadcast';
import { UserEvent } from './user.broadcaster';
import { User } from '../user.model';

describe('User Service: UserEvent', () => {

  let customEventName = 'UNIT_TEST_EVENT';

  let service: UserEvent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ 
        Broadcaster,
        UserEvent
      ]
    });
    service = TestBed.get(UserEvent);
  }));


  it('should emit user event', (done) => {
      service.on().subscribe(g => {
          expect(g).toEqual(customEventName);
          done();
      });

      let user = new User();

      service.fire(customEventName,user);
  });
});
