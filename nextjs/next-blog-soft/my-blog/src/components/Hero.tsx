import Image from 'next/image'
import React from 'react'
import profileImage from '../../public/images/profile.png'
import Link from 'next/link'

export default function Hero() {
  return (
    <section>
      <Image src={profileImage} alt='pic' width={150} height={150} priority />
      <h2 className='text-3xl font-bold mt-2'>{"Hallo, ich bin Jihyun"}</h2>
      <h3 className='text-xl font-semibold'>Ich bin ein UI/UX-Entwickler</h3>
      <p>Heute ist es besser, als gestern</p>
      <Link href='/contact'>
        <button className='bg-yellow-200 font-bold rounded-xl py-1 px-4 my-2' type='button'>Contact Me</button>
      </Link>
    </section>
  )
}
