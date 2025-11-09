import { AddCategory } from '@/app/(admin)/dashboard/category/_components/add-category';
import { AllCategory } from '@/app/(admin)/dashboard/category/_components/all-category';

export default function Category() {
  return (
    <>
      <section className="mb-6 flex items-center justify-between gap-2">
        <h1 className="font-bold text-2xl">Category</h1>
        <AddCategory />
      </section>

      <AllCategory />
    </>
  );
}
