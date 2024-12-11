import { Tag } from '@prisma/client';
import { Link } from '@remix-run/react';
import { useContext } from 'react';
import { ShoelaceContext } from '~/components/shoelace';
import Tags from '~/components/Tags';

export type Props = {
  /**
   * Article image URL
   */
  imageUrl: string;

  /**
   * Image alt text
   */
  imageAlt: string;

  /**
   * Article title
   */
  title: string;

  /**
   * Short description of the article
   */
  description: string;

  /**
   * Published date
   */
  date: string;

  /**
   * Tags
   */
  tags: Tag[];

  /**
   * Article slug
   */
  slug: string;
};

export default function ArticleCard({
  imageUrl,
  imageAlt,
  title,
  description,
  date,
  slug,
  tags,
}: Props) {
  const { SlCard } = useContext(ShoelaceContext);
  return (
    <Link to={slug}>
      <SlCard className="w-full h-full max-w-sm group">
        <img
          slot="image"
          className="aspect-square w-full object-cover"
          src={imageUrl}
          alt={imageAlt}
        />
        <div className="flex flex-col gap-4">
          <h2 className="text-xl text-black group-hover:text-secondary transition-colors">
            {title}
          </h2>

          <p>{description}</p>

          <Tags tags={tags} />

          <small className="text-gray-700">{date}</small>
        </div>
      </SlCard>
    </Link>
  );
}
