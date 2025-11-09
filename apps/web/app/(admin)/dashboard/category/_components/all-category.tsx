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

  return (
    <section className="grid gap-4 lg:grid-cols-4">
      {category.map((item) => (
        <Item variant="outline" key={item.id}>
          <ItemMedia variant="icon">
            <TagsIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{item.name}</ItemTitle>
            <ItemDescription>total</ItemDescription>
          </ItemContent>
          <ItemActions />
        </Item>
      ))}
    </section>
  );
}
