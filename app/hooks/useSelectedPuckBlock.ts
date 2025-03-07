import { usePuck } from '@measured/puck';

export const useSelectedPuckBlock = (componentId: string) => {
  const {
    appState: {
      ui: { itemSelector },
      data,
    },
    dispatch,
  } = usePuck();

  // ItemSelector is empty if we directly click on the editor. If we click TinyMCE's toolbar, it's not empty and everything works.
  // But then, history.historyStore is empty, so an error is thrown.

  if (!itemSelector) {
    return {
      isSelected: false,
      onChange: null,
    };
  }

  const { index: destinationIndex, zone: destinationZone } = itemSelector;

  if (!destinationZone) {
    return {
      isSelected: false,
      onChange: null,
    };
  }

  const item =
    destinationZone !== 'default-zone' ?
      data.zones?.[destinationZone]?.[destinationIndex]
    : data.content[destinationIndex];

  if (item?.props.id !== componentId) {
    return {
      isSelected: false,
      onChange: null,
    };
  }

  return {
    isSelected: true,
    onChange: (props: Partial<typeof item.props>) => {
      dispatch({
        type: 'replace',
        destinationIndex,
        destinationZone,
        data: {
          props: { ...item.props, ...props },
          type: item.type,
        },
      });
    },
  };
};
