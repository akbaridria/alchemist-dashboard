/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button"
import { Share1Icon, DotsHorizontalIcon, DownloadIcon, ImageIcon } from "@radix-ui/react-icons"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
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
import { trimWallet, listSocialMediaShare } from "@/lib/utils"
import { Skeleton } from "../skeleton"
import { OpenseaIcon } from "../Icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const DetailCollection = ({ loading, totalItems }: IDetailCollection) => {
  const [readMore, setReadmore] = useState(false);
  const [hostname, setHostname] = useState('');

  useEffect(() => {
    (() => {
      setHostname(window.location.href);
    })()
  }, [])

  return (
    <div className="grid grid-cols-1 gap-4">
      <img src="/alchemist-logo.jpeg" className="w-28 h-28" alt="" />
      <h3 className="text-[2rem] font-semibold text-[#ff4c8b]">Alchemist 4.0</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/covalent-logo.png" className="w-8 h-8 rounded-full" alt="" />
          <div>Covalent</div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger>
              <Button variant="ghost" size="icon">
                <Share1Icon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[80%] max-w-[300px] md:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Share</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center justify-center md:justify-start gap-2 py-4">
                    {listSocialMediaShare(hostname).map((item) => {
                      return (
                        <a href={item.link.toString()} target="_blank" rel="noopener noreferrer" key={item.color} className={`flex items-center justify-center w-12 h-12 rounded-full`} style={{ backgroundColor: item.color }}>
                          <item.icon className={`w-6 h-6 stroke-white fill-white`} />
                        </a>
                      )
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 border-input border rounded-md px-2 py-2 truncate flex-start">
                      {hostname}
                    </div>
                    <div className="flex-none -mr-1">
                      <Button variant="default" size="sm">Copy</Button>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="focus-visible:ring-0">
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <a href="/alchemist-logo.jpeg" target="_blank" rel="noopener noreferrer">
                <DropdownMenuItem>
                  <div className="flex items-center gap-2 text-sm">
                    <DownloadIcon className="w-4 h-4" />
                    <div>Download</div>
                  </div>
                </DropdownMenuItem>
              </a>
              <a href="/alchemist-logo.jpeg" target="_blank" rel="noopener noreferrer">
                <DropdownMenuItem>
                  <div className="flex items-center gap-2 text-sm">
                    <ImageIcon className="w-4 h-4" />
                    <div>View Token Thumbnail</div>
                  </div>
                </DropdownMenuItem>
              </a>
              <DropdownMenuSeparator />
              <a href={data.block_explorer + 'address/' + data.contract_address} target="_blank" rel="noopener noreferrer">
                <DropdownMenuItem>
                  <div className="flex items-center gap-2 text-sm">
                    <img src="/zora.png" alt="zora" className="w-4 h-4" />
                    <div>Explore</div>
                  </div>
                </DropdownMenuItem>
              </a>
              <a href="https://opensea.io/assets/zora/0xfeee3700698f8d75bcc18e009022c7b44d2af44f" target="_blank">
                <DropdownMenuItem>
                  <div className="flex items-center gap-2 text-sm">
                    <OpenseaIcon className="w-4 h-4" />
                    <div>Opensea</div>
                  </div>
                </DropdownMenuItem>
              </a>
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
          {loading && <Skeleton className="w-20 h-3" />}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">Total Items</div>
          {!loading && <div>{totalItems}</div>}
          {loading && <Skeleton className="w-20 h-3" />}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">Network</div>
          {!loading && <div>Zora Mainnet</div>}
          {loading && <Skeleton className="w-20 h-3" />}
        </div>
      </div>
      <Separator />
    </div>
  )
}