import { expect, test } from 'vitest';
import React from 'react';
import HelloWorld from '../src/pages/HelloWorld';
import { render } from 'vitest-browser-react';

test('renders name', async () => {
  const { getByText } = render(<HelloWorld name="Vitest" />);
  await expect.element(getByText('Hello Vitest')).toBeInTheDocument();
});
