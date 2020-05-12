import React from 'react';
import { shallow } from 'enzyme';
import AutoAdvances from '../AutoAdvances';

describe('AutoAdvances()', () => {
  const MockComponent = () => null;
  MockComponent.displayName = 'MockComponent';
  const MockComponentWithAutoAdvance = AutoAdvances(
    MockComponent,
    'index',
    'upperBound'
  );

  it('should have the expected displayName', () => {
    expect(MockComponentWithAutoAdvance.displayName).toBe(
      'AutoAdvances(MockComponent)'
    );
  });

  const autoAdvanceDelay = 10e3;
  const upperBound = 5;
  let indexIncrement;
  let wrapper;

  beforeEach(() => {
    indexIncrement = jest.fn();
    jest.useFakeTimers();
    wrapper = shallow(
      <MockComponentWithAutoAdvance
        autoAdvanceDelay={autoAdvanceDelay}
        index={0}
        indexIncrement={indexIncrement}
        upperBound={upperBound}
      />
    );
  });

  it('should call the increment function after autoAdvanceDelay', () => {
    jest.advanceTimersByTime(autoAdvanceDelay);
    expect(indexIncrement).toHaveBeenCalledWith(upperBound);
  });

  it('should use upperBound.length if upperBound is an array', () => {
    wrapper.setProps({ upperBound: [1, 2, 3] });
    jest.advanceTimersByTime(autoAdvanceDelay);
    expect(indexIncrement).toHaveBeenCalledWith(3);
  });

  it('should not set a timer if autoAdvanceDelay is 0', () => {
    wrapper.setProps({ index: 1, autoAdvanceDelay: 0 });
    jest.advanceTimersByTime(999999);
    expect(indexIncrement).not.toHaveBeenCalled();
  });

  it('should reset the timer when the target prop changes', () => {
    jest.advanceTimersByTime(autoAdvanceDelay - 1);
    wrapper.setProps({ index: 1 });
    jest.advanceTimersByTime(1);
    expect(indexIncrement).not.toHaveBeenCalled();
    jest.advanceTimersByTime(autoAdvanceDelay);
    expect(indexIncrement).toHaveBeenCalled();
  });

  it('should clear the timer on unmount', () => {
    wrapper.unmount();
    jest.advanceTimersByTime(autoAdvanceDelay);
    expect(indexIncrement).not.toHaveBeenCalled();
  });
});
