import { useEffect } from 'react';

const useSnakeSwipeArrowTurn = (game) => {
  useEffect(() => {
    const onArrowClick = event => {
      if (event.keyCode === 38) {
        game.turn(0, -1);
      } else if (event.keyCode === 40) {
        game.turn(0, 1);
      } else if (event.keyCode === 37) {
        game.turn(-1, 0);
      } else if (event.keyCode === 39) {
        game.turn(1, 0);
      }
    };

    document.addEventListener("keydown", onArrowClick);
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    //This last event listener prevents scrolling
    document.body.addEventListener('touchmove', (e) => { e.preventDefault()}, { passive: false });

    let xDown = null;
    let yDown = null;

    function getTouches(evt) {
      return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
    }

    function handleTouchStart(evt) {
      const firstTouch = getTouches(evt)[0];
      xDown = firstTouch.clientX;
      yDown = firstTouch.clientY;
    }

    function handleTouchMove(evt) {

      if ( ! xDown || ! yDown ) {
        return;
      }

      let xUp = evt.touches[0].clientX;
      let yUp = evt.touches[0].clientY;

      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
          /* left swipe */
          game.turn(-1, 0);
        } else {
          /* right swipe */
          game.turn(1, 0);
        }
      } else {
        if ( yDiff > 0 ) {
          /* up swipe */
          game.turn(0, -1);
        } else {
          /* down swipe */
          game.turn(0, 1);
        }
      }
      /* reset values */
      xDown = null;
      yDown = null;
    }



    return () => document.removeEventListener("keydown", onArrowClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




};

export default useSnakeSwipeArrowTurn;