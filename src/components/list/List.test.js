import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import { executeCommand } from './listActions';
import { incrementDate } from 'clock';
import List from './List';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => mockDispatch)
  };
});

const ZERO = 0;
const today = new Date();
const getProps = (entry) => {
  return {
    header: 'List',
    data: [[entry]]
  };
};

describe('List', () => {
  it('invalid type', () => {
    const invalidTypeData = {
      type: 'invalid',
      label: 'invalid-label'
    };
    testRenderComponent(List, getProps(invalidTypeData));

    expect(screen.queryByText(invalidTypeData.label)).not.toBeInTheDocument();
  });

  it('type link', () => {
    const linkData = {
      type: 'link',
      label: 'cjamiev/playground',
      value: 'https://github.com/cjamiev/playground'
    };
    testRenderComponent(List, getProps(linkData));

    expect(screen.getByText(linkData.label)).toBeInTheDocument();
  });

  it('type copy', () => {
    const copyData = {
      type: 'copy',
      label: 'username',
      value: 'cjamiev1836'
    };
    document.execCommand = jest.fn();
    testRenderComponent(List, getProps(copyData));

    const copyBtn = screen.getByText(copyData.label);
    fireEvent.click(copyBtn);

    expect(document.execCommand).toHaveBeenCalledWith('copy');
    expect(screen.getByText(copyData.label)).toBeInTheDocument();
  });

  it('type text', () => {
    const textData = {
      type: 'text',
      value: 'testing123'
    };
    testRenderComponent(List, getProps(textData));

    expect(screen.getByText(textData.value)).toBeInTheDocument();
  });

  it('type command', () => {
    const commandData = {
      type: 'command',
      label: 'test-command',
      value: { mode: 'test-mode', name: 'test-filename', showArgs: true}
    };
    testRenderComponent(List, getProps(commandData));

    const commandBtn = screen.getByText(commandData.label);
    const commandInput = screen.getByLabelText(`args for ${commandData.label}`);
    fireEvent.click(commandBtn);
    fireEvent.change(commandInput, { target: { value: '12345'}});

    expect(mockDispatch).toHaveBeenCalled();
    expect(screen.getByText(commandData.label)).toBeInTheDocument();
  });

  it('type timer - One hour from now', () => {
    const timerOneHourData = {
      type: 'timer',
      label: 'One hour from now',
      value: incrementDate(today, { hours: 1})
    };
    testRenderComponent(List, getProps(timerOneHourData));

    expect(screen.getByText(timerOneHourData.label)).toBeInTheDocument();
  });

  it('type timer - Two days from now', () => {
    const timerTwoDaysData = {
      type: 'timer',
      label: 'Two days from now',
      value: incrementDate(today, { days: 2})
    };
    testRenderComponent(List, getProps(timerTwoDaysData));

    expect(screen.getByText(timerTwoDaysData.label)).toBeInTheDocument();
  });

  it('type timer - Two weeks from now', () => {
    const timerTwoWeeksData = {
      type: 'timer',
      label: 'Two weeks from now',
      value: incrementDate(today, { weeks: 2})
    };
    testRenderComponent(List, getProps(timerTwoWeeksData));

    expect(screen.getByText(timerTwoWeeksData.label)).toBeInTheDocument();
  });
});