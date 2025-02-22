import { interpret } from 'xstate';
import { createPracticeMachine } from './machine';

it('should eventually reach "questionDisplayed"', (done) => {
    const fetchService = interpret(createPracticeMachine).onTransition((state) => {
      // this is where you expect the state to eventually
      // be reached
      console.log("state ", state.value);
      if (state.matches("questionDisplayed")) {
        done();
      }
      else if (state.matches("fetchingError")) {
        done.fail("Reached fetchingError state, expected questionDisplayed.");
      }
    });
  
    fetchService.start();
  
    // send zero or more events to the service that should
    // cause it to eventually reach its expected state
    fetchService.send({ type: 'PRACTICE_STARTED' });
});
