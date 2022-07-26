import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Paper } from './paper';

describe('Paper', () => {
  it('should display children', () => {
    render(<Paper>test</Paper>);

    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
