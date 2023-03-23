import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import Description from '../Description';

test('products details render', async () => {
  let detailsStub = {
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    features: [
      {
        feature: 'Fabric',
        value: 'canvas',
      },
      {
        feature: 'Buttons',
        value: 'Brass',
      },
    ],
  };

  render(<Description details={detailsStub} />);
  // screen.debug();

  // Check that loading state is not displayed
  // expect(screen.queryByText('Loading...')).toBeNull();
  expect(screen.getByText(detailsStub.description)).toBeInTheDocument();
});
