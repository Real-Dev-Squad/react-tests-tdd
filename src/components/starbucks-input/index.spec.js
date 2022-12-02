import StarbucksInput from './index.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

describe.skip('starbucks input tests', () => {
  test('it renders input component', async () => {
    // Assemble
    const elName = 'nickname';

    render(<StarbucksInput name={elName} />);

    // Act
    const sbInput = screen.getByRole('textbox', { name: /nickname/i });

    // Assert
    expect(sbInput).toBeInTheDocument();
  });

  test('it responds with updated input', async () => {
    // Assemble
    const elName = 'nickname';
    const currentVal = 'Ank';
    const nextChar = 'u';
    const expectedString = `${currentVal}${nextChar}`;

    const onChangeStub = jest.fn();

    // Act
    render(<StarbucksInput name={elName} value={currentVal} onChange={onChangeStub} />);

    const sbInput = screen.getByRole('textbox', { name: /nickname/i });

    await userEvent.type(sbInput, nextChar);

    // Assert
    expect(onChangeStub).toHaveBeenCalledTimes(1);
    expect(onChangeStub).toHaveBeenLastCalledWith(expectedString);
  });

  test('it renders error correctly', async () => {
    // Assemble
    const error = 'Please provide valid star wars name';

    render(<StarbucksInput error={error} />);

    const sbError = screen.getByText(error)

    // Assert
    expect(sbError).toBeInTheDocument();
  });
})
