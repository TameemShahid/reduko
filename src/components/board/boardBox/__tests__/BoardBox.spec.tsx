import '@testing-library/react/dont-cleanup-after-each';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import store from '../../../../store/store';
import { Provider } from 'react-redux';
import BoardBox from '../BoardBox';

describe('BoardBox', () => {
  const handleChange = jest.fn();

  render(
    <Provider store={store}>
      <table>
        <tbody>
          <tr>
            <BoardBox id="A1" />
          </tr>
        </tbody>
      </table>
    </Provider>,
  );
  const input: HTMLInputElement = screen.getByTestId('A1');

  it('should only allow numbers', () => {
    userEvent.type(input, 'a');
    expect(input.value).toBe('');
  });

  it('should only allow numbers between 1 and 9 inclusive', async () => {
    userEvent.paste(input, '456456');
    expect(input.value).toBe('');

    userEvent.type(input, '5');
    expect(input.value).toBe('5');
  });
});
