import { Spinner } from "../components/spinner";

export default function Loading() {
  return (
    <main className="h-screen flex justify-center items-center">
      <Spinner />
    </main>
  );
}
