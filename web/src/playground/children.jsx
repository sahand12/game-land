// @flow
import * as React from 'react';

const Example = () => (
  <RadioGroup>
    <RadioButton value='first'>first</RadioButton>
    <RadioButton value='second'>Second</RadioButton>
    <RadioButton value='third'>Third</RadioButton>
  </RadioGroup>
);

const RadioGroup = ({children}: {children: React.Node}) => {
  return <div className="radio-group">
    {children}
  </div>
};

const RadiButton = ({children, value}: {children: React.Node, value: string}) => {
  return <input value={value} />;
};


export default Example;
