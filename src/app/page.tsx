'use client';

import { DetailCollection } from "@/components/ui/home/DetailCollection";
import { ListNft } from "@/components/ui/home/ListNft";
import { useNftCollection } from "@/lib/utils";
import { Suspense, useState } from "react";

export default function Home() {
  const [page, setPage] = useState(0)
  const { listNft, loading, totalItems, hasMore } = useNftCollection(page);

  return (
    <main>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_350px]">
        <div className="order-last md:order-first md:my-4">
            <ListNft listNft={listNft} loading={loading} page={page} setPage={(n: number) => setPage(n)} hasMore={hasMore} />
        </div>
        <div className="order-first py-4 md:order-last">
          <div className="sticky top-[104px]">
            <DetailCollection loading={loading} totalItems={totalItems} />
          </div>
        </div>
      </div>
    </main>
  );
}
