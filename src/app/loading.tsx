import { Spinner } from "./components/spinner";

export default function Loading() {
  return (
    <main className="px-4 py-8">
      <h1 className="font-bold text-4xl">Pokedex</h1>

      <div className="mt-6 flex justify-center">
        <Spinner />
      </div>
    </main>
  );
}
