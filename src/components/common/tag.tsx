import type { Tag } from '@/types/data/listing.type';

const Tag = ({ tag: { name } }: Tag) => (
  <div className='rounded-lg border border-stroke px-3 py-1.5'>{name}</div>
);

export default Tag;
