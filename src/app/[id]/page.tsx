import { DetailNFT } from "@/components/ui/detail/DetailNFT";
import { CovalentClient } from '@covalenthq/client-sdk'
import { Metadata, ResolvingMetadata } from 'next'
import data from '@/lib/data.json'
import { Chain } from "@covalenthq/client-sdk";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id

  let title = 'Alchemist 4.0'
  let images = 'https://www.datocms-assets.com/86369/1697820116-alchemists_background.jpg?dpr=0.5&fm=webp'
  let description = 'Alchemist 4.0'
  const apiService = new CovalentClient(process.env.NEXT_PUBLIC_COVALENT_KEY as string);
  
  try {
    const res = await apiService.NftService.getNftMetadataForGivenTokenIdForContract(data.chain as Chain, data.contract_address, id, { withUncached: true });
    if (!res.error) {
      res.data.items.reduce((_, item) => item.nft_data.external_data.image = data.ipfs_gateway + item.nft_data.external_data.image.slice(21), '');
      res.data.items.reduce((_, item) => item.nft_data.external_data.animation_url = data.ipfs_gateway + item.nft_data.external_data.animation_url.slice(7), '');
      title = res.data.items[0].nft_data.external_data.name;
      images = res.data.items[0].nft_data.external_data.image;
      description = res.data.items[0].nft_data.external_data.description
    }
  } catch (error) {
    console.log(error);
  }

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: title,
    icons: {
      icon: images
    },
    openGraph: {
      type: "website",
      description: description,
      title: title,
      images: [images, ...previousImages]
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [images, ...previousImages]
    }
  }
}

export default function DynamicToken({ params }: { params: { id: string } }) {
  return (
    <DetailNFT id={params.id} />
  )
}