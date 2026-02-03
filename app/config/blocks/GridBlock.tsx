import { ComponentConfig, Slot } from '@puckeditor/core';

export type GribBlockProps = {
  columns: number;
  rows: number;
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
    rows: {
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
    rows: 1,
    gap: 4,
    grid: [],
  },
  render: ({ columns, rows, gap, grid: Grid }) => {
    const columnsClass = mapColumnsToGridClass(columns);
    const rowsClass = mapRowsToGridClass(rows);
    const gapClass = mapGapToGridClass(gap);

    return (
      <section>
        <Grid
          className={`grid grid-cols-1 ${columnsClass} ${rowsClass} ${gapClass}`}
        />
      </section>
    );
  },
};

function mapColumnsToGridClass(columns: number) {
  let columnsClass = 'sm:grid-cols-3';

  switch (columns) {
    case 1:
      columnsClass = 'sm:grid-cols-1';
      break;
    case 2:
      columnsClass = 'sm:grid-cols-2';
      break;
    case 3:
      columnsClass = 'sm:grid-cols-3';
      break;
    case 4:
      columnsClass = 'sm:grid-cols-4';
      break;
    case 5:
      columnsClass = 'sm:grid-cols-5';
      break;
    case 6:
      columnsClass = 'sm:grid-cols-6';
      break;
    case 7:
      columnsClass = 'sm:grid-cols-7';
      break;
    case 8:
      columnsClass = 'sm:grid-cols-8';
      break;
    case 9:
      columnsClass = 'sm:grid-cols-9';
      break;
    case 10:
      columnsClass = 'sm:grid-cols-10';
      break;
    case 11:
      columnsClass = 'sm:grid-cols-11';
      break;
    case 12:
      columnsClass = 'sm:grid-cols-12';
      break;
  }

  return columnsClass;
}

function mapRowsToGridClass(rows: number) {
  let rowsClass = 'grid-rows-1';

  switch (rows) {
    case 1:
      rowsClass = 'grid-rows-1';
      break;
    case 2:
      rowsClass = 'grid-rows-2';
      break;
    case 3:
      rowsClass = 'grid-rows-3';
      break;
    case 4:
      rowsClass = 'grid-rows-4';
      break;
    case 5:
      rowsClass = 'grid-rows-5';
      break;
    case 6:
      rowsClass = 'grid-rows-6';
      break;
    case 7:
      rowsClass = 'grid-rows-7';
      break;
    case 8:
      rowsClass = 'grid-rows-8';
      break;
    case 9:
      rowsClass = 'grid-rows-9';
      break;
    case 10:
      rowsClass = 'grid-rows-10';
      break;
    case 11:
      rowsClass = 'grid-rows-11';
      break;
    case 12:
      rowsClass = 'grid-rows-12';
      break;
  }

  return rowsClass;
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
