// @flow
import * as React from 'react';

const IconX = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
    <path
      fill={color}
      d="M28 22.4L19.6 14 28 5.6 22.4 0 14 8.4 5.6 0 0 5.6 8.4 14 0 22.4 5.6 28l8.4-8.4 8.4 8.4z"
    />
  </svg>
);

const IconO = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle stroke={color} cx="50" cy="50" r="36" strokeWidth="28" />
  </svg>
);
export { IconX, IconO };
