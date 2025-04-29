import { ReactNode, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { ShoelaceContext } from '~/components/shoelace';
import { NavigationMenuItem } from '~/components/NavigationMenu';
import Heading from '~/components/Heading';

type Props = {
  items: NavigationMenuItem[];
};

export default function MenuEditor({ items }: Props) {
  const { t } = useTranslation('MenuEditor');
  const { SlButton } = useContext(ShoelaceContext);
  const [activeID, setActiveID] = useState(null);

  function handleDragStart(event: any) {
    const { active } = event;
    setActiveID(active.id);
  }

  function handleDragEnd(event: any) {
    console.log('Drag end', event);
    setActiveID(null);
  }

  const activeItem = items.find((item) => item.id === activeID);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-4">
        <Heading level={3}>{t('Title')}</Heading>
        <p>{t('Description')}</p>

        <Droppable>
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <Draggable key={item.id} id={item.id}>
                <Item item={item} />
              </Draggable>
            ))}
          </ul>
        </Droppable>

        <DragOverlay>
          {activeID && activeItem ?
            <Item item={activeItem} />
          : null}
        </DragOverlay>

        <SlButton className="w-32 self-end" variant="primary" size="large">
          {t('SaveButtonCaption')}
        </SlButton>
      </div>
    </DndContext>
  );
}

type DroppableProps = {
  children: ReactNode;
};

function Droppable({ children }: DroppableProps) {
  const { setNodeRef } = useDroppable({
    id: 'menu-editor-droppable',
  });

  return (
    <div ref={setNodeRef} className="flex flex-col gap-2">
      {children}
    </div>
  );
}

type DraggableProps = {
  id: string;
  children: ReactNode;
};

function Draggable({ id, children }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `menu-editor-draggable-${id}`,
  });

  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <li ref={setNodeRef} {...attributes} {...listeners} key={id} style={style}>
      {children}
    </li>
  );
}

type ItemProps = {
  item: NavigationMenuItem;
};

function Item({ item }: ItemProps) {
  const { SlIcon } = useContext(ShoelaceContext);

  return (
    <div className="flex flex-row gap-4 items-center border border-neutral-100 bg-white px-4 py-2 rounded-md">
      <SlIcon name="grip-vertical" />
      <div className="flex flex-col gap-0">
        {item.title.nl}
        <span className="text-xs">{item.slug}</span>
      </div>
    </div>
  );
}
