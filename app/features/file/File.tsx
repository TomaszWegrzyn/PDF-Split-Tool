import React, { Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { splitFile, selectFileName, selectSplitting } from './fileSlice';

function renderSplitButton(
  fileName: string,
  dispatch: Dispatch<unknown>
): React.ReactNode {
  if (!fileName) {
    return null;
  }
  return (
    <button onClick={() => dispatch(splitFile())} type="button">
      split file
    </button>
  );
}

function renderProgress(progress: boolean): React.ReactNode {
  if (!progress) {
    return null;
  }
  return <LinearProgress />;
}

export default function File(): React.ReactNode {
  const fileName: string = useSelector(selectFileName);
  const splitting: boolean = useSelector(selectSplitting);
  const dispatch = useDispatch();
  const splitButton = renderSplitButton(fileName, dispatch);
  const progress = renderProgress(splitting);
  return (
    <div>
      {fileName}
      {splitButton}
      {progress}
    </div>
  );
}
