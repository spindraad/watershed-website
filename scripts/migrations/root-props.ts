export type RootPropMigration = {
  version: number;
  description: string;
  migrate: (props: Record<string, unknown>) => Record<string, unknown>;
};

export const MIGRATION_V1_TITLE_FLATTEN: RootPropMigration = {
  version: 1,
  description: 'Flatten title object to title + titleIsHidden',
  migrate: (props) => {
    // Handle old format: title as object
    const titleObj = props.title as
      | { text: string; hidden?: boolean }
      | undefined;
    if (
      typeof titleObj === 'object' &&
      titleObj !== null &&
      'text' in titleObj
    ) {
      // `title` is being extracted from the props, so it is not included in `rest`
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { title, ...rest } = props;
      return {
        ...rest,
        title: (titleObj as { text: string }).text,
        titleIsHidden: (titleObj as { hidden: boolean }).hidden ?? false,
      };
    }
    // Already new format or missing - ensure titleIsHidden exists
    if (!('titleIsHidden' in props)) {
      return { ...props, titleIsHidden: false };
    }
    return props;
  },
};

export const ROOT_PROP_MIGRATIONS: RootPropMigration[] = [
  MIGRATION_V1_TITLE_FLATTEN,
];

export function migrateRootProps(
  props: Record<string, unknown>,
): Record<string, unknown> {
  return ROOT_PROP_MIGRATIONS.reduce((acc, m) => m.migrate(acc), props);
}
