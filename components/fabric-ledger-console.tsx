"use client"

import React, { useState } from "react"
import { 
  Terminal, 
  Layers, 
  ShieldCheck, 
  Lock, 
  CheckCircle, 
  Copy, 
  FileCode, 
  Server, 
  KeyRound,
  ArrowRight
} from "lucide-react"
import { FABRIC_CHAINCODE_SNIPPET } from "@/lib/kissan-data"
import { Badge } from "@/components/ui/badge"

const SAMPLE_BLOCKS = [
  {
    blockNumber: 489229,
    channel: "kissanmart-consortium",
    txCount: 4,
    timestamp: "2 mins ago",
    dataHash: "0x7d8e29a990f12c41872199bde1087cf31a29381c81",
    type: "EscrowDisbursed_eRUPI",
    status: "Committed",
    endorsers: ["Peer0.PunjabAgriMSP", "Peer1.GovtMandiCouncil", "Peer0.ITCProcurement"]
  },
  {
    blockNumber: 489228,
    channel: "kissanmart-consortium",
    txCount: 6,
    timestamp: "7 mins ago",
    dataHash: "0x34cbb0e02914d3a033c4f74d014bcde93efb8e2178",
    type: "BidPlacedWithMarginLock",
    status: "Committed",
    endorsers: ["Peer0.NABARDTrust", "Peer0.AdaniWilmarHub"]
  },
  {
    blockNumber: 489227,
    channel: "kissanmart-consortium",
    txCount: 2,
    timestamp: "18 mins ago",
    dataHash: "0x9c3114d59a1e0b57e7a83359d9c22e4c274fe92348",
    type: "LotMintedWithMLFloor",
    status: "Committed",
    endorsers: ["Peer0.PunjabAgriMSP", "Peer0.KrishiVigyanKendra"]
  }
]

export function FabricLedgerConsole() {
  const [activeTab, setActiveTab] = useState<"blocks" | "chaincode">("blocks")
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(FABRIC_CHAINCODE_SNIPPET)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-400" />
            <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              Hyperledger Fabric 2.5 Enterprise Ledger
            </h3>
            <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 text-xs">
              Raft Consensus • Channel: agri-main
            </Badge>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Private permissioned enterprise consortium linking Indian State Mandis, NABARD, Farmers, and Authorized Corporate Aggregators.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center rounded-xl bg-zinc-900 border border-zinc-800 p-1 text-xs">
          <button
            onClick={() => setActiveTab("blocks")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === "blocks"
                ? "bg-teal-500 text-zinc-950 shadow"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Live Blocks & Consensus
          </button>
          <button
            onClick={() => setActiveTab("chaincode")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === "chaincode"
                ? "bg-teal-500 text-zinc-950 shadow"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Golang Chaincode (Escrow)
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-5">
        {activeTab === "blocks" ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
              <span>Recent Immutable Blocks</span>
              <span className="font-mono text-teal-400">Consensus: Raft / Zero-Knowledge Proofs</span>
            </div>

            <div className="space-y-3">
              {SAMPLE_BLOCKS.map((blk) => (
                <div
                  key={blk.blockNumber}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 transition hover:border-zinc-700"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-teal-400 text-xs">
                        #{blk.blockNumber}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-zinc-200 font-mono">{blk.type}</span>
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] py-0">
                            {blk.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-zinc-500 font-mono mt-0.5">
                          Hash: {blk.dataHash}...
                        </p>
                      </div>
                    </div>

                    <div className="text-right text-xs">
                      <span className="text-zinc-400">{blk.timestamp}</span>
                      <span className="block text-[11px] text-zinc-500 font-mono">{blk.txCount} Txs Committed</span>
                    </div>
                  </div>

                  {/* Endorsing peers */}
                  <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="text-zinc-500 flex items-center gap-1">
                      <KeyRound className="h-3 w-3 text-teal-400" /> Endorsed by:
                    </span>
                    {blk.endorsers.map((peer, i) => (
                      <span key={i} className="rounded-md bg-zinc-800 px-2 py-0.5 text-zinc-300 font-mono text-[10px]">
                        {peer}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4 text-teal-400" />
                <span className="text-xs font-mono text-zinc-300">contracts/agri_escrow_contract.go</span>
              </div>
              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300 hover:text-white transition"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>{copied ? "Copied!" : "Copy Chaincode"}</span>
              </button>
            </div>

            <pre className="mt-3 overflow-x-auto text-[11px] font-mono text-emerald-300 leading-relaxed max-h-[360px] p-2">
              <code>{FABRIC_CHAINCODE_SNIPPET}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
