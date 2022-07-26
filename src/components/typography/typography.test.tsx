import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Typography } from './typography';

describe('Typography', () => {
  it('should display children and apply default styles', () => {
    render(<Typography>test</Typography>);

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('test')).toHaveClass('regular paragraph-0');
  });
});
