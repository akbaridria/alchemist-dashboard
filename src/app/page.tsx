'use client';

import { DetailCollection } from "@/components/ui/home/DetailCollection";
import { ListNft } from "@/components/ui/home/ListNft";
import { useNftCollection } from "@/lib/utils";

export default function Home() {
  const { listNft, loading, totalItems } = useNftCollection(0);
    
  return (
    <main>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_350px]">
        <div className="order-last md:order-first md:my-8">
          <ListNft listNft={listNft} loading={loading} />
        </div>
        <div className="order-first py-8 md:order-last">
          <div className="sticky top-[104px]">
            <DetailCollection loading={loading} totalItems={totalItems} />
          </div>
        </div>
      </div>
    </main>
  );
}
