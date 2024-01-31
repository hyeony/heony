'use client';

export default async function MeowArticle() {
  const res = await fetch('http://meowfacts.herokuapp.com', {
    next: {revalidate: 0},
      // cache: 'no-store'
  })
  const data = await res.json();
  const factText = data.data[0];
 return  <article>{factText}</article>;
}