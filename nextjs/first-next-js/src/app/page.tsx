import Image from "next/image";
import { notFound } from "next/navigation";

export default function Home() {
  // notFound
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Main US!</h1>
    </main>
  );
}
