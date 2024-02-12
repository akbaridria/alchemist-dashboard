/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button"
import { Share1Icon, DotsHorizontalIcon, DownloadIcon, ImageIcon } from "@radix-ui/react-icons"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export const DetailCollection = ({ loading, totalItems }: IDetailCollection) => {
  const [readMore, setReadmore] = useState(false);
  const [hostname, setHostname] = useState('');
  const [isCopy, setIsCopy] = useState(false);

  useEffect(() => {
    (() => {
      setHostname(window.location.href);
    })()
  }, [])

  const handleCopy = () => {
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 2000)
  }

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
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex">
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
                  <div className="flex items-center gap-2 max-w-[calc(250px_-_3rem)] md:max-w-[calc(400px_-_3rem)]">
                    <div className="flex-1 border-input border rounded-md px-2 py-2 truncate flex justify-start">
                      {hostname}
                    </div>
                    <div className="flex-none -mr-1">
                      <CopyToClipboard text={hostname} onCopy={handleCopy}>
                        <Button variant="default" size="sm">{isCopy ? 'Copied' : 'Copy'}</Button>
                      </CopyToClipboard>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="flex md:hidden">
                <Share1Icon className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="focus-visible:outline-none">
              <DrawerHeader className="py-4 mb-4">
                <div className="text-left mb-4"><DrawerTitle>Share</DrawerTitle></div>
                <div className="grid gried-cols-1 gap-4">
                  <div className="flex items-center justify-start md:justify-start gap-2 py-1">
                    {listSocialMediaShare(hostname).map((item) => {
                      return (
                        <a href={item.link.toString()} target="_blank" rel="noopener noreferrer" key={item.color} className={`flex items-center justify-center w-12 h-12 rounded-full`} style={{ backgroundColor: item.color }}>
                          <item.icon className={`w-6 h-6 stroke-white fill-white`} />
                        </a>
                      )
                    })}
                  </div>
                  <div className="flex items-center gap-2 max-w-[calc(100vw_-_3rem)] md:max-w-[calc(400px_-_3rem)]">
                    <div className="flex-1 border-input border rounded-md px-2 py-2 truncate flex justify-start">
                      {hostname}
                    </div>
                    <div className="flex-none -mr-1">
                      <CopyToClipboard text={hostname} onCopy={handleCopy}>
                        <Button variant="default" size="sm">{isCopy ? 'Copied' : 'Copy'}</Button>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>

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
      <div className="text-sm grid grid-cols-1 gap-2">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">Contract Address</div>
          {!loading && <a href={data.block_explorer + 'address/' + data.contract_address} target="_blank" rel="noopener noreferrer"><Button variant="link" className="text-sm !px-0 !py-0 !h-fit font-normal">{trimWallet(data.contract_address)}</Button></a>}
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
      {
        !loading &&
        <div className="my-4">
          <Dialog >
            <DialogTrigger className="w-full hidden md:flex" asChild>
              <Button variant="default" className="w-full bg-primary-covalent text-white hover:opacity-[0.75] hover:bg-primary-covalent transition-all" size="icon">
                Mint Info
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription className="text-sm text-left">
                  <MintInfoDesc />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="default" className="flex md:hidden w-full bg-primary-covalent text-white hover:opacity-[0.75] hover:bg-primary-covalent transition-all" size="icon">
                Mint Info
              </Button>
            </DrawerTrigger>
            <DrawerContent className="focus-visible:outline-none">
              <DrawerHeader className="py-4 mb-4 text-sm text-left">
                <MintInfoDesc />
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </div>
      }
    </div>
  )
}

const MintInfoDesc = () => {
  const benefits = [
    'Growth and development (grow personally and professionally)',
    'Exclusive access to product releases before the general public',
    'Embark on thrilling bounties and challenges',
    'Open up a career path in Web 3.0',
    'Learn about entrepreneurship',
    'Unlock your inner data nerd',
    'Build your project',
    'Alpha Leaks'
  ]
  return (
    <>
      <p>
        <strong>Do you want this wicked-cool Alchemist 4.0 NFT ?</strong>
      </p>
      <br />
      <p>
        Be an alchemist to mint one and get others benefit like:
        <ul>
          {
            benefits.map((item) => {
              return (
                <li key={item}>
                  <div className="grid gap-1 grid-cols-[1rem_1fr]">
                    <div>🧪</div>
                    <div>{item}</div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </p>
      <br />
      <p>
        <strong>Become an Alchemist now!</strong>
      </p>
      <p>
        Next registration opens on Covalent Discord. Join <a href={data.socialMedia.discord} target="_blank" rel="noopener noreferrer" className="underline-offset-4 underline text-primary-covalent">here</a>
      </p>
    </>
  )
}