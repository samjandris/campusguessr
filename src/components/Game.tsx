'use client';

import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Game({
  data,
}: {
  data?: { name: string; image: string; filterId: string; filterValue: string };
}) {
  const router = useRouter();

  function loadGame() {
    if (!data) return;

    console.log('clicked');
    router.push('/guess/' + data.filterId + '/' + data.filterValue);
  }

  return data ? (
    <div
      onClick={loadGame}
      className="hover:shadow-lg hover:-translate-y-1 hover:scale-110 hover:cursor-pointer rounded-2xl transition duration-300 ease-in-out transform"
    >
      <div className="flex flex-col items-center w-[270px] h-[200px] bg-secondary rounded-2xl">
        <div className="relative w-full h-[130px]">
          <Image
            src={data.image}
            alt={'Picture representing ' + data.name}
            className="rounded-t-2xl"
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="flex items-center flex-grow">
          <h4 className="text-[30px] mb-0.5">{data.name}</h4>
        </div>
      </div>
    </div>
  ) : (
    <Skeleton className="w-[270px] h-[200px] rounded-2xl" />
  );
}
