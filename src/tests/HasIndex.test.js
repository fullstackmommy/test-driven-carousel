import React from 'react';
import { shallow } from 'enzyme';
import HasIndex from '../HasIndex';

describe('HasIndex()', () => {
  const MockComponent = () => null;
  MockComponent.displayName = 'MockComponent';
  const MockComponentWithIndex = HasIndex(MockComponent, 'index');

  it('should have the expected displayName', () => {
    expect(MockComponentWithIndex.displayName).toBe('HasIndex(MockComponent)');
  });

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MockComponentWithIndex />);
  });

  it('should have an initial index state equal to the defaultIndex prop', () => {
    expect(wrapper.state('index')).toBe(0);
    const wrapper2 = shallow(<MockComponentWithIndex defaultIndex={1} />);
    expect(wrapper2.state('index')).toBe(1);
  });

  it('should always have index state equal to the index prop', () => {
    const wrapperWithInitialIndex = shallow(
      <MockComponentWithIndex index={1} />
    );
    expect(wrapperWithInitialIndex.state('index')).toBe(1);
    wrapper.setProps({ index: 2 });
    expect(wrapper.state('index')).toBe(2);
  });

  it('should allow index state to change if the index prop is unset', () => {
    const wrapperWithInitialIndex = shallow(
      <MockComponentWithIndex index={1} />
    );
    wrapperWithInitialIndex.setProps({ index: undefined });
    wrapperWithInitialIndex.setState({ index: 3 });
    expect(wrapperWithInitialIndex.state('index')).toBe(3);
  });

  it('should call onIndexChange on decrement/increment', () => {
    const onIndexChange = jest.fn();
    wrapper.setProps({ index: 0, onIndexChange });
    wrapper.prop('indexDecrement')(3);
    expect(onIndexChange).toHaveBeenCalledWith({ target: { value: 2 } });
    wrapper.prop('indexIncrement')(3);
    expect(onIndexChange).toHaveBeenCalledWith({ target: { value: 1 } });
  });

  it('should pass the index state down as the index prop', () => {
    expect(wrapper.prop('index')).toBe(0);
    wrapper.setState({ index: 1 });
    expect(wrapper.prop('index')).toBe(1);
  });

  it('should have an index state of 2 on decrement from 3', () => {
    wrapper.setState({ index: 3 });
    wrapper.prop('indexDecrement')();
    expect(wrapper.prop('index')).toBe(2);
  });

  it('should have an index state of 1 on increment', () => {
    wrapper.prop('indexIncrement')();
    expect(wrapper.state('index')).toBe(1);
  });

  it('should have the max index state on decrement from 0', () => {
    wrapper.setState({ index: 0 });
    wrapper.prop('indexDecrement')(3);
    expect(wrapper.state('index')).toBe(2);
  });

  it('should have the min index state on increment from the max', () => {
    wrapper.setState({ index: 2 });
    wrapper.prop('indexIncrement')(3);
    expect(wrapper.state('index')).toBe(0);
  });
});
