"use client"

import { AlertTriangle, Box } from "lucide-react"
import Link from "next/link"

import SectionTitle from "@/components/section-title"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AddressDisplay from "../address-display"
import TimeAgoDate from "../time-ago-date"
import Tooltip from "../tooltip"

export default function LatestBlocks({ latestBlocks }: { latestBlocks: any }) {
  return (
    <div className="flex flex-col gap-4">
      <SectionTitle>Latest Blocks</SectionTitle>
      <div className="group flex flex-col gap-4">
        {latestBlocks?.map((block: any, _: number) => (
          <Card
            key={block.number}
            // className={cn([_ === 0 && "duration-300 animate-in fade-in"])}
          >
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Box className="text-muted-foreground" />
                    <Link href={`/blocks/${block.number}`}>
                      <span>{block.number}</span>
                    </Link>
                  </div>
                  {block?.isFinalized ? (
                    <span className="text-xs text-muted-foreground">
                      <TimeAgoDate date={block.timestamp} />
                    </span>
                  ) : (
                    <Tooltip text="Unfinalized">
                      <AlertTriangle className="size-5 text-orange-400" />
                    </Tooltip>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <span className="text-muted-foreground">EVM Txs</span>
                  <Link href={`/blocks/${block.number}/evm-transactions`}>
                    <span>{block.transactionsCount}</span>
                  </Link>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">Extrinsics</span>
                    <Link href={`/blocks/${block.number}/extrinsics`}>
                      <span>{block.extrinsicsCount}</span>
                    </Link>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">Events</span>
                    <Link href={`/blocks/${block.number}/events`}>
                      <span>{block.eventsCount}</span>
                    </Link>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-muted-foreground">Validator</span>
                  <AddressDisplay
                    address={block.evmBlock.miner}
                    useShortenedAddress
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Link href="/blocks" className="text-center">
        <span className="text-sm font-medium text-primary/80 hover:text-primary">
          View all Blocks
        </span>
      </Link>
    </div>
  )
}
