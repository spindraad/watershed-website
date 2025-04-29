import { CSSProperties, forwardRef, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { ShoelaceContext } from '~/components/shoelace';
import { NavigationMenuItem } from '~/components/NavigationMenu';
import Heading from '~/components/Heading';

type Props = {
  items: NavigationMenuItem[];
  onChange: (items: NavigationMenuItem[]) => void;
  isSaving?: boolean;
};

export default function MenuEditor({ items, onChange }: Props) {
  const { t } = useTranslation('MenuEditor');
  const [sortedItems, setSortedItems] = useState(
    (() => items.sort((a, b) => a.order - b.order))(),
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setSortedItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        const updatedArray = arrayMove(items, oldIndex, newIndex);

        updatedArray.forEach((item, index) => {
          item.order = index;
        });

        onChange(updatedArray);
        return updatedArray;
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sortedItems}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex flex-col gap-4">
          <Heading level={2}>{t('Title')}</Heading>
          <p>{t('Description')}</p>

          <ul className="flex flex-row gap-2">
            {sortedItems.map((item) => (
              <SortableItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </SortableContext>
    </DndContext>
  );
}

type ItemProps = {
  item: NavigationMenuItem;
  style?: CSSProperties;
};

const Item = forwardRef<HTMLLIElement, ItemProps>(({ item, ...props }, ref) => {
  const { SlIcon } = useContext(ShoelaceContext);
  const { i18n } = useTranslation('MenuEditor');

  return (
    <li
      ref={ref}
      className="flex flex-row gap-4 items-center border border-neutral-100 bg-white px-4 py-2 rounded-md w-full"
      {...props}
    >
      <SlIcon name="grip-vertical" />
      <div className="flex flex-col gap-0">
        {item.title[i18n.language]}
        <span className="text-xs">{item.slug}</span>
      </div>
    </li>
  );
});
Item.displayName = 'Item';

type SortableItemProps = {
  item: NavigationMenuItem;
};

function SortableItem({ item }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Item
      item={item}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
}
