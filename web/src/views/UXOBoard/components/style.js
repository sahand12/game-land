// @flow
import { css } from 'emotion';

const miniBoardCellCS = css`
  width: 44px;
  height: 44px;
  text-align: center;
  border: 1px solid gray;
`;
const miniBoardTableCS = css`
  border-collapse: collapse;

  &.active {
    td {
      cursor: pointer;
    }
  }
`;



export { miniBoardCellCS, miniBoardTableCS };
