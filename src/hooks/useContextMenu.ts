import { useMemo, useState } from 'react';

export const useContextMenu = () => {
  const [position, setPosition] = useState([0, 0]);

  const [visible, setVisible] = useState(false);

  const returnValue = useMemo(
    () => ({
      x: position[0],
      y: position[1],
      visible,
      setPosition,
      setVisible,
    }),
    [position, visible],
  );

  return returnValue;
};
