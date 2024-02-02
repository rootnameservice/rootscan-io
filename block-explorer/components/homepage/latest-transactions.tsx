"use client"

import { generateAvatarURL } from "@cfx-kit/wallet-avatar"
import { ArrowLeftRight, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import SectionTitle from "@/components/section-title"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getAddress } from "viem"
import AddressDisplay from "../address-display"
import TimeAgoDate from "../time-ago-date"

export default function LatestTransactions({
  latestTransactions,
}: {
  latestTransactions: any
}) {
  return (
    <div className="flex flex-col gap-4">
      <SectionTitle>Latest EVM Transactions</SectionTitle>
      {/* <Link href="/evm-transactions">
        <div className="rounded-t-2xl p-2">
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-semibold">
              2500 pending transactions
            </span>
          </div>
        </div
      </Link> */}
      <div className="flex flex-col gap-4">
        {latestTransactions?.map((transaction, _) => (
          <Card key={transaction?.hash || _}>
            <CardContent className="flex flex-col gap-4 pt-6">
              <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4">
                    {transaction?.toLookup?.isContract ? (
                      <Badge variant="info">Contract Call</Badge>
                    ) : null}
                    {transaction.status === "success" ? (
                      <Badge variant="success">Confirmed</Badge>
                    ) : null}
                    {transaction?.tags?.map((tag, _) => (
                      <Badge variant="info" key={_}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    <TimeAgoDate date={transaction?.timestamp} />
                  </span>
                </div>
                <div className="flex min-w-0 items-center gap-4">
                  <ArrowLeftRight className="shrink-0 text-muted-foreground" />
                  <Link href={`/tx/${transaction.hash}`} className="truncate">
                    <span className="truncate">{transaction.hash}</span>
                  </Link>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="flex flex-row items-center">
                  <div className="mr-2 hidden size-8 md:block">
                    <Image
                      src={generateAvatarURL(transaction.from)}
                      width={50}
                      height={50}
                      priority
                      unoptimized
                      className="rounded-[5px]"
                      alt="jazz"
                    />
                  </div>
                  <AddressDisplay
                    address={getAddress(transaction.from)}
                    nameTag={transaction?.fromLookup?.nameTag}
                    rnsName={transaction?.fromLookup?.rns}
                    isContract={transaction?.fromLookup?.isContract}
                    useShortenedAddress
                  />
                </div>
                <ChevronRight className="mx-1 size-4 shrink-0 text-muted-foreground" />
                <div className="mr-2 hidden size-8 md:block">
                  <Image
                    src={generateAvatarURL(transaction.to)}
                    width={50}
                    height={50}
                    priority
                    unoptimized
                    className="rounded-[5px]"
                    alt="jazz"
                  />
                </div>
                <AddressDisplay
                  address={getAddress(transaction.to)}
                  nameTag={transaction?.toLookup?.nameTag}
                  rnsName={transaction?.toLookup?.rns}
                  isContract={transaction?.toLookup?.isContract}
                  useShortenedAddress
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Link href="/evm-transactions" className="text-center">
        <span className="text-sm font-medium text-primary/80 hover:text-primary">
          View all EVM Transactions
        </span>
      </Link>
    </div>
  )
}
