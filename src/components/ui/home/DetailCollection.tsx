/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button"
import { Share1Icon, DotsHorizontalIcon, CopyIcon } from "@radix-ui/react-icons"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IDetailCollection } from "@/types"
import data from '@/lib/data.json';
import { trimWallet } from "@/lib/utils"
import { Skeleton } from "../skeleton"

export const DetailCollection = ({ loading, totalItems }: IDetailCollection) => {
  const [readMore, setReadmore] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-4">
      <img src="/alchemist-logo.webp" className="w-28 h-28" alt="" />
      <h3 className="text-[2rem] font-semibold text-[#ff4c8b]">Alchemist 4.0</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/covalent-logo.png" className="w-8 h-8 rounded-full" alt="" />
          <div>Covalent</div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Share1Icon className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="focus-visible:ring-0">
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div>
        <p className={`text-sm ${readMore ? '' : 'line-clamp-2'}`}>
          Special-made NFTs for Alchemists that have shown above and beyond contributions to the ecosystem and community.
          <br />
          <br />
          These are available for a limited time for version Alchemist 4.0.
        </p>
        <p className="underline underline-offset-4 text-xs font-semibold mt-2 cursor-pointer" onClick={() => setReadmore(!readMore)}>{readMore ? 'less' : 'more'}</p>
      </div>
      <Separator />
      <div className="text-xs grid grid-cols-1 gap-2">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">Contract Address</div>
          {!loading && <a href={data.block_explorer + 'address/' + data.contract_address} target="_blank" rel="noopener noreferrer"><Button variant="link" className="text-xs !px-0 !py-0 !h-fit font-normal">{trimWallet(data.contract_address)}</Button></a>}
          {loading && <Skeleton className="w-12 h-2" />}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">Total Items</div>
          {!loading && <div>{totalItems}</div>}
          {loading && <Skeleton className="w-12 h-2" />}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">Network</div>
          {!loading && <div>Zora Mainnet</div>}
          {loading && <Skeleton className="w-12 h-2" />}
        </div>
      </div>
      <Separator />
    </div>
  )
}