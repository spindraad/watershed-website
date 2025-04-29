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
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ShoelaceContext } from '~/components/shoelace';
import { NavigationMenuItem } from '~/components/NavigationMenu';
import Heading from '~/components/Heading';

type Props = {
  items: NavigationMenuItem[];
  onSave: (items: NavigationMenuItem[]) => void;
  isSaving?: boolean;
};

export default function MenuEditor({ items, onSave, isSaving }: Props) {
  const { t } = useTranslation('MenuEditor');
  const { SlButton } = useContext(ShoelaceContext);
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

        return updatedArray;
      });
    }
  }

  function handleSave() {
    onSave(sortedItems);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sortedItems}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-4">
          <Heading level={2}>{t('Title')}</Heading>
          <p>{t('Description')}</p>

          <ul className="flex flex-col gap-2">
            {sortedItems.map((item) => (
              <SortableItem key={item.id} item={item} />
            ))}
          </ul>

          <SlButton
            className="w-32 self-end"
            variant="primary"
            size="large"
            onClick={handleSave}
            disabled={isSaving}
            loading={isSaving}
          >
            {t('SaveButtonCaption')}
          </SlButton>
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
      className="flex flex-row gap-4 items-center border border-neutral-100 bg-white px-4 py-2 rounded-md"
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
