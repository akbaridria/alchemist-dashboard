import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CovalentClient, Chains, NftTokenContract } from "@covalenthq/client-sdk";
import data from '@/lib/data.json';
import { IGridObject } from "@/types";
import { ListBulletIcon, ViewGridIcon, TableIcon, DashboardIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from "react";

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