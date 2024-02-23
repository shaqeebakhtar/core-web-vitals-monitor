import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="container mx-auto py-12 text-center space-y-2">
      <h1 className="text-6xl font-bold">
        Lorem ipsum dolor sit amet, consectetur.
      </h1>
      <p className="text-lg">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi ducimus,
        obcaecati consequuntur tenetur non expedita?
      </p>
      <Button size={'lg'} className="font-semibold">
        Click Me
      </Button>
    </main>
  );
}
