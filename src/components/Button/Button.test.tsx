import { render } from '@testing-library/react';
import { Button } from 'src/components/Button';

it('renders', () => {
  const { container } = render(<Button />);
  expect(container).toBeInTheDocument();
});
