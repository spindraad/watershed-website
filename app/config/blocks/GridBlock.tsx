import { ComponentConfig, Slot } from '@measured/puck';

export type GribBlockProps = {
  columns: number;
  gap: number;
  grid: Slot;
};

export const GridBlock: ComponentConfig<GribBlockProps> = {
  label: 'Grid',
  fields: {
    columns: {
      type: 'number',
      min: 1,
      max: 12,
    },
    gap: {
      type: 'number',
      min: 0,
      max: 12,
    },
    grid: {
      type: 'slot',
    },
  },
  defaultProps: {
    columns: 3,
    gap: 4,
    grid: [],
  },
  render: ({ columns, gap, grid: Grid }) => {
    const columnsClass = mapColumnsToGridClass(columns);
    const gapClass = mapGapToGridClass(gap);

    return (
      <section>
        <Grid className={`grid ${columnsClass} ${gapClass}`} />
      </section>
    );
  },
};

function mapColumnsToGridClass(columns: number) {
  // We need to map this to explicit Tailwind classes in order for the Tailwind JIT compiler to pick it up

  let columnsClass = 'grid-cols-3';

  switch (columns) {
    case 1:
      columnsClass = 'grid-cols-1';
      break;
    case 2:
      columnsClass = 'grid-cols-2';
      break;
    case 3:
      columnsClass = 'grid-cols-3';
      break;
    case 4:
      columnsClass = 'grid-cols-4';
      break;
    case 5:
      columnsClass = 'grid-cols-5';
      break;
    case 6:
      columnsClass = 'grid-cols-6';
      break;
    case 7:
      columnsClass = 'grid-cols-7';
      break;
    case 8:
      columnsClass = 'grid-cols-8';
      break;
    case 9:
      columnsClass = 'grid-cols-9';
      break;
    case 10:
      columnsClass = 'grid-cols-10';
      break;
    case 11:
      columnsClass = 'grid-cols-11';
      break;
    case 12:
      columnsClass = 'grid-cols-12';
      break;
  }

  return columnsClass;
}

function mapGapToGridClass(gap: number) {
  // We need to map this to explicit Tailwind classes in order for the Tailwind JIT compiler to pick it up

  let gapClass = 'gap-4';

  switch (gap) {
    case 0:
      gapClass = 'gap-0';
      break;
    case 1:
      gapClass = 'gap-1';
      break;
    case 2:
      gapClass = 'gap-2';
      break;
    case 3:
      gapClass = 'gap-3';
      break;
    case 4:
      gapClass = 'gap-4';
      break;
    case 5:
      gapClass = 'gap-5';
      break;
    case 6:
      gapClass = 'gap-6';
      break;
    case 7:
      gapClass = 'gap-7';
      break;
    case 8:
      gapClass = 'gap-8';
      break;
    case 9:
      gapClass = 'gap-9';
      break;
    case 10:
      gapClass = 'gap-10';
      break;
    case 11:
      gapClass = 'gap-11';
      break;
    case 12:
      gapClass = 'gap-12';
      break;
  }

  return gapClass;
}
