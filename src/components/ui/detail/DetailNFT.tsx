'use client'

import { useNftCollectionById } from '@/lib/utils'
import { DetailImage } from './DetailImage';
import { DetailDescription } from './DetailDescription';

export const DetailNFT = ({ id }: { id: string }) => {
  const { dataNft, sizeNft, loading, totalView } = useNftCollectionById(id);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_450px] py-0 md:py-4">
      <DetailImage url={dataNft[0]?.nft_data.external_data.animation_url} />
      <DetailDescription dataNft={dataNft} id={id} sizeNft={sizeNft} loading={loading} totalView={totalView} />
    </div>
  )
}