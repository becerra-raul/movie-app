import { state } from '../index.js';

/**
 *
 * Intersects a desire element from a desired root , if this element enters the viewport a callback is executed
 * @rootElement must be an ancestor element
 * @targetElement the desired element
 */

export default targetElement => {
    const options = {
        root: null,
        threshold: 0.5,
    };
    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio >= 0.5) {
                state.elementObserved = true;
                observer.disconnect();
            }
        });
    };
    const observer = new IntersectionObserver(callback, options);
    if (targetElement && targetElement !== null) {
        observer.observe(targetElement);
    }
};
