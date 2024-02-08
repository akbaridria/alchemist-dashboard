/* eslint-disable @next/next/no-img-element */
import { useNftCollection, trimWallet } from '@/lib/utils'
import { useState } from 'react'
import { NftTokenContract } from '@covalenthq/client-sdk';
import {
  Card,
  CardFooter,
} from "@/components/ui/card"
import { HeartIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { listGrids } from '@/lib/utils';
import { GridValue } from '@/types';
import { LazyImage } from '../LazyImage';
import { Skeleton } from '../skeleton';

export const ListNft = ({ listNft, loading} : { listNft: NftTokenContract[], loading: boolean}) => {
  const [selectedGrid, setSelectedGrid] = useState<GridValue>("grid-4");

  return (
    <>
      <div className="flex items-center justify-end sticky top-[62px] z-[10] bg-background">
        <div className="inline-flex items-center justify-center rounded-lg bg-primary-black border border-input p-1 text-muted-foreground grid grid-cols-4 mb-4">
          {
            listGrids.map((item) => {
              return (
                <div
                  key={item.value}
                  data-state={selectedGrid === item.value ? 'active' : 'inactive'}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md p-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#ff4c8b] data-[state=active]:text-white data-[state=active]:shadow cursor-pointer"
                  onClick={() => setSelectedGrid(item.value)}
                >
                  <item.icon className='w-4 h-4' />
                </div>
              )
            })
          }
        </div>
      </div>
      {
        loading ?
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {
              Array(16).fill(0).map((_, index) => {
                return (
                  <Card key={index}>
                    <Skeleton className='w-full aspect-square rounded-t-lg' />
                    <CardFooter className='px-2 py-4 flex-col items-start gap-1'>
                      <Skeleton className='w-[50%] h-4' />
                      <Skeleton className='w-[80%] h-4' />
                    </CardFooter>
                  </Card>
                )
              } )
            }
          </div> :
          <>
            <div className={`${selectedGrid === 'grid-4' ? 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ' : 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'}`}>
              {selectedGrid !== 'list' &&
                listNft.map((item) => {
                  return (
                    <Card key={item.nft_data.token_id}>
                      <div className={`overflow-hidden rounded-t-lg ${selectedGrid === 'no-dec' ? 'rounded-b-lg' : ''}`}>
                        <LazyImage
                          src={item.nft_data.external_data.image}
                          alt={item.nft_data.external_data.name}
                          classname={`object-contain aspect-square rounded-t-lg ${selectedGrid === 'no-dec' ? 'rounded-b-lg' : ''} transform hover:scale-110 transition duration-200`}
                        />
                      </div>
                      {
                        selectedGrid !== 'no-dec' &&
                        <CardFooter className='px-2 py-4 flex-col items-start gap-1'>
                          <div className='w-full flex justify-end gap-2'>
                            <div className='flex items-center gap-1'>
                              <EyeOpenIcon className='w-4 h-4' />
                              <div className='text-xs'>100</div>
                            </div>
                            <div className='flex items-center gap-1'>
                              <HeartIcon className='w-4 h-4' />
                              <div className='text-xs'>100</div>
                            </div>
                          </div>
                          <div className='mt-2'>
                            <p className='text-sm font-semibold'>{item.contract_name} <span className='text-primary-covalent'>#{Number(item.nft_data.token_id)}</span></p>
                            <p className='text-xs line-clamp-1'>{item.nft_data.external_data.name}</p>
                          </div>
                        </CardFooter>
                      }
                    </Card>
                  )
                })}
            </div>
            {
              selectedGrid === 'list' && <TableListNft data={listNft} />
            }
          </>
      }
    </>
  )
}

const TableListNft = ({ data }: { data: NftTokenContract[] }) => {
  const listColumns = ['NFT Item', 'Name', 'Description', 'Owner']
  return (
    <div className='overflow-auto'>
      <div className='grid grid-cols-[minmax(200px,1fr)_minmax(200px,1fr)_minmax(100px,1fr)]  xl:grid-cols-[minmax(200px,1fr)_minmax(200px,1fr)_minmax(500px,1fr)_minmax(100px,1fr)] gap-4 items-center px-2 py-4 text-muted-foreground text-sm'>
        <div>NFT Item</div>
        <div>Name</div>
        <div className='hidden xl:block'>Description</div>
        <div>Original Owner</div>
      </div>
      {
        data.map((item) => {
          return (
            <div key={item.nft_data.token_id} className='grid grid-cols-[minmax(200px,1fr)_minmax(200px,1fr)_minmax(100px,1fr)] xl:grid-cols-[minmax(200px,1fr)_minmax(200px,1fr)_minmax(500px,1fr)_minmax(100px,1fr)] border-t w-fit px-2 py-4 gap-4 items-center text-sm hover:bg-muted/50 transition-colors'>
              <div className='flex items-center gap-2 font-semibold whitespace-nowrap'>
                <div className='w-12 h-12 rounded-lg'>
                  <img src={item.nft_data.external_data.image} className='rounded-lg object-contain w-full h-full aspect-square rounded-lg' alt="" />
                </div>
                {item.contract_name}
                <div className='text-primary-covalent'>
                  #{Number(item.nft_data.token_id)}
                </div>
              </div>
              <div className='truncate'>
                {item.nft_data.external_data.name}
              </div>
              <div className='truncate hidden xl:block'>
                {item.nft_data.external_data.description}
              </div>
              <div>
                {trimWallet(item.nft_data.original_owner)}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}