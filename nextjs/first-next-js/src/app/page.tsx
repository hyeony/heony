import Image from "next/image";
import { notFound } from "next/navigation";
import os from 'os';
import Counter from "./components/Counter";


export default function Home() {
  console.log('아녕! - 서버');
  // notFound
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Main US!</h1>
        <Counter />
      </main>
    </>
  );
}
