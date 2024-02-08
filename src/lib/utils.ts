import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CovalentClient, Chains, NftTokenContract } from "@covalenthq/client-sdk";
import data from '@/lib/data.json';
import { IGridObject, ISocialMediaShare } from "@/types";
import { ListBulletIcon, ViewGridIcon, TableIcon, DashboardIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from "react";
import { TwitterIcon, FarcasterIcon, LensterIcon, TelegramIcon } from '@/components/ui/Icons';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const apiService = new CovalentClient(process.env.NEXT_PUBLIC_COVALENT_KEY as string);

export const useNftCollection = (pageNumber: number) => {
  const [loading, setLoading] = useState(false);
  const [listNft, setListNft] = useState<NftTokenContract[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const d = await apiService.NftService.getTokenIdsForContractWithMetadataByPage(data.chain as Chains, data.contract_address, { withUncached: true, pageNumber: pageNumber, pageSize: 25 });
        if (d.error) {
          setListNft([]);
        }
        d.data.items.reduce((_, item) => item.nft_data.external_data.image = data.ipfs_gateway + item.nft_data.external_data.image.slice(21), '');
        setTotalItems(d.data.pagination.total_count);
        setListNft(d.data.items);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setListNft([])
        setLoading(false);
      }
    })()
  }, [pageNumber])

  return {
    loading,
    listNft,
    totalItems
  }

}

export const listGrids: IGridObject[] = [
  {
    icon: ListBulletIcon,
    value: "list"
  },
  {
    icon: ViewGridIcon,
    value: "grid-4"
  },
  {
    icon: TableIcon,
    value: "grid-6"
  },
  {
    icon: DashboardIcon,
    value: "no-dec"
  }
]

export const trimWallet = (s: string) => s.slice(0, 6) + '...' + s.slice(-5);

const buildUrl = (url: string, text: string, textKey: string, urlKey: string, hostname: string) => {
  const u = new URL(url);
  u.searchParams.append(textKey, text);
  u.searchParams.append(urlKey, hostname);
  return u;
}

const textShare = "Unveiling the Alchemist 4.0 NFT collection! Discover unique artwork & join the community."

export const listSocialMediaShare = (hostname: string) => {
  const res : ISocialMediaShare[] = [
    {
      icon: TwitterIcon,
      color: '#000',
      iconColor: '#fff',
      link: buildUrl('https://twitter.com/intent/tweet', textShare, "text", "url", hostname)
    },
    {
      icon: FarcasterIcon,
      color: '#8660cd',
      iconColor: '#fff',
      link: buildUrl('https://warpcast.com/~/compose', textShare, "text", "embeds[]", hostname)
    },
    {
      icon: LensterIcon,
      color: '#3d4b41',
      iconColor: '',
      link: buildUrl("https://lenster.xyz/", textShare, "text", "url", hostname)
    },
    {
      icon: TelegramIcon,
      color: '#229ed9',
      iconColor: '#fff',
      link: buildUrl('https://t.me/share/url', textShare, "text", "url", hostname)
    }
  ]
  return res;
}  