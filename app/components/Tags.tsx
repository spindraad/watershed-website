import { Tag as DbTag } from '@prisma/client';
import { Link } from 'react-router';
import { useContext } from 'react';
import { ShoelaceContext } from '~/components/shoelace';

type Tag = Omit<DbTag, 'contentRelationId' | 'createdAt' | 'updatedAt'>;

type Props = {
  /**
   * The list of tags
   */
  tags: Tag[];
};

export default function Tags({ tags }: Props) {
  const { SlTag } = useContext(ShoelaceContext);

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <SlTag
          className="tag-link transition-colors"
          key={tag.id}
          variant="primary"
          size="small"
        >
          <Link to={tag.slug}>{tag.name.en}</Link>
        </SlTag>
      ))}
    </div>
  );
}
