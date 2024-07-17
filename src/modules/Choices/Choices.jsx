import classNames from 'classnames';
import './choices.scss';
import { useEffect, useRef } from 'react';
import { adjustElemPosition, debounce } from '../../util.js';

export const Choices = ({ children, buttonLabel, className, isOpen, onToggle }) => {
  const choiceRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      adjustElemPosition(choiceRef.current);
    }

    const debouncedAdjustElemPosition = debounce(() => {
      if (isOpen) {
        adjustElemPosition(choiceRef.current);
      }
    }, 100);

    window.addEventListener('resize', debouncedAdjustElemPosition);

    return () => {
      window.removeEventListener('resize', debouncedAdjustElemPosition);
    }
  }, [isOpen]);
 
  return (
    <div className={classNames("choices", className)}>
      <button className="choices__btn" type="button" onClick={onToggle}>
        {buttonLabel}
      </button>
      
      {isOpen && <div className="choices__box" ref={choiceRef}>{children}</div>}
    </div>
  );
};