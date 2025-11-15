import { ButtonTrash } from '@/components/button-trash';
import { EmptyState } from '@/components/empty-state';
import { getCategory } from '@/server/query/category';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@bakan/ui/components/item';
import { TagsIcon } from 'lucide-react';

export async function AllCategory() {
  const category = await getCategory();

  if (category.length <= 0) {
    return (
      <EmptyState
        Icon={TagsIcon}
        title="There are no categories yet"
        description="Create categories to keep your products organized and make it easier for customers to find what they’re looking for."
      />
    );
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {category.map((item) => (
        <Item variant="outline" key={item.id}>
          <ItemMedia variant="icon">
            <TagsIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{item.name}</ItemTitle>
            <ItemDescription>
              {item.productsTotal} Product{item.productsTotal > 1 && 's'}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ButtonTrash id={item.id} title={item.name} section="category" />
          </ItemActions>
        </Item>
      ))}
    </section>
  );
}
