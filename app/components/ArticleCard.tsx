import { Tag } from '@prisma/client';
import { Link } from '@remix-run/react';
import { useContext } from 'react';
import { ShoelaceContext } from '~/components/shoelace';
import Tags from '~/components/Tags';

export type Props = {
  /**
   * Article image URL
   */
  imageUrl?: string;

  /**
   * Image alt text
   */
  imageAlt: string;

  /**
   * Article title
   */
  title: string;

  /**
   * Short summary of the article
   */
  summary: string;

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
  summary,
  date,
  slug,
  tags,
}: Props) {
  const { SlCard } = useContext(ShoelaceContext);
  return (
    <Link className="w-full h-full group auto-rows-fr" to={slug}>
      <SlCard>
        {imageUrl ?
          <img
            slot="image"
            className="aspect-square w-full object-cover"
            src={imageUrl}
            alt={imageAlt}
          />
        : null}

        <div className="flex flex-col gap-4">
          <h2 className="text-xl text-black group-hover:text-secondary transition-colors">
            {title}
          </h2>

          <p>{summary}</p>

          <Tags tags={tags} />

          <small className="text-gray-700">{date}</small>
        </div>
      </SlCard>
    </Link>
  );
}
