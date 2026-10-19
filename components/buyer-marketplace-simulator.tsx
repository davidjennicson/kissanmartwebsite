"use client"

import React, { useState } from "react"
import { 
  Building2, 
  Search, 
  Filter, 
  TrendingUp, 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  CheckCircle, 
  Flame, 
  Clock, 
  MapPin, 
  ArrowUpRight,
  ExternalLink,
  Layers,
  Sparkles,
  DollarSign
} from "lucide-react"
import { INITIAL_CROPS, CropLot } from "@/lib/kissan-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function BuyerMarketplaceSimulator() {
  const [crops, setCrops] = useState<CropLot[]>(INITIAL_CROPS)
  const [selectedLot, setSelectedLot] = useState<CropLot>(INITIAL_CROPS[0])
  const [bidIncrement, setBidIncrement] = useState<number>(50)
  const [escrowSuccess, setEscrowSuccess] = useState<string | null>(null)
  const [filterState, setFilterState] = useState<string>("All")

  const handlePlaceBid = () => {
    const newBid = selectedLot.currentHighestBid + bidIncrement
    const updatedCrops = crops.map((item) => {
      if (item.id === selectedLot.id) {
        return {
          ...item,
          currentHighestBid: newBid,
          bidsCount: item.bidsCount + 1,
        }
      }
      return item
    })
    setCrops(updatedCrops)
    setSelectedLot({
      ...selectedLot,
      currentHighestBid: newBid,
      bidsCount: selectedLot.bidsCount + 1,
    })
    setEscrowSuccess(`Escrow Deposit ₹${(newBid * selectedLot.quantityQuintals * 0.15).toLocaleString("en-IN")} (15% Margin) Locked on Hyperledger!`)
    setTimeout(() => setEscrowSuccess(null), 4000)
  }

  const filteredCrops = filterState === "All" 
    ? crops 
    : crops.filter(c => c.state === filterState)

  return (
    <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-950/90 p-5 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              Buyer & Wholesaler Procurement Terminal
            </h3>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-xs">
              Live Mandi Gateway
            </Badge>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Verified corporate buyers (ITC, Adani Wilmar, BigBasket, Reliance Retail) participate in 24-hr auto-settlement auctions.
          </p>
        </div>

        {/* State filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["All", "Punjab", "Maharashtra", "Madhya Pradesh", "Andhra Pradesh"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterState(st)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition whitespace-nowrap ${
                filterState === st
                  ? "bg-emerald-500 text-zinc-950 font-bold"
                  : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Lots table and Bid Terminal */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Lots list */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <span>Available Batches (24-Hour Settlement Rule)</span>
            <span>{filteredCrops.length} Active Auctions</span>
          </div>

          <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {filteredCrops.map((crop) => {
              const isSelected = crop.id === selectedLot.id
              return (
                <div
                  key={crop.id}
                  onClick={() => setSelectedLot(crop)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
                    isSelected
                      ? "border-emerald-500/60 bg-emerald-950/20 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/30"
                      : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-zinc-100">{crop.crop}</span>
                        <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 text-[10px] py-0">
                          Grade {crop.grade}
                        </Badge>
                        {crop.aiPriceTrend === "SURGING" && (
                          <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded-full border border-amber-400/20">
                            <Flame className="h-3 w-3" /> High Demand
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                        <MapPin className="h-3 w-3 text-emerald-400" />
                        <span>{crop.mandi}, {crop.district} ({crop.state})</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-zinc-400 block">Highest Offer</span>
                      <span className="text-base font-extrabold text-emerald-400 font-mono">
                        ₹{crop.currentHighestBid.toLocaleString("en-IN")}
                        <span className="text-xs font-normal text-zinc-400">/Qtl</span>
                      </span>
                    </div>
                  </div>

                  {/* Micro stats */}
                  <div className="mt-3 grid grid-cols-4 gap-2 border-t border-zinc-800/80 pt-2 text-[11px]">
                    <div>
                      <span className="text-zinc-500 text-[10px] block">Lot Volume</span>
                      <span className="font-semibold text-zinc-200">{crop.quantityQuintals} Quintals</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px] block">Moisture</span>
                      <span className="font-semibold text-zinc-200">{crop.moistureContent}%</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px] block">ML Floor</span>
                      <span className="font-semibold text-zinc-300">₹{crop.aiBasePrice}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px] block">Closes In</span>
                      <span className="font-semibold text-amber-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {crop.biddingClosesAt}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Selected Lot Console & Smart Escrow Deposit */}
        <div className="lg:col-span-5 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-xs font-mono">
                  {selectedLot.id}
                </Badge>
                <span className="text-xs text-zinc-400 font-mono">Block #{selectedLot.fabricBlockNumber}</span>
              </div>
              <h4 className="text-lg font-bold text-zinc-100 mt-2">{selectedLot.crop}</h4>
              <p className="text-xs text-zinc-400">
                Farmer: <span className="text-zinc-200 font-semibold">{selectedLot.farmerName}</span> • {selectedLot.farmerPhone}
              </p>
            </div>

            {/* AI Demand & Cold Storage telemetry */}
            <div className="rounded-xl bg-zinc-950/70 border border-zinc-800 p-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                  AI Market Demand Velocity
                </span>
                <span className="font-mono font-bold text-emerald-400">{selectedLot.aiDemandIndex} / 100</span>
              </div>
              
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" 
                  style={{ width: `${selectedLot.aiDemandIndex}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                <span>Storage Telemetry:</span>
                <span className="font-mono text-zinc-300">{selectedLot.storageTemp}</span>
              </div>
            </div>

            {/* Price Breakdown Calculation */}
            <div className="rounded-xl bg-emerald-950/20 border border-emerald-500/20 p-3 text-xs space-y-1.5">
              <div className="flex justify-between text-zinc-300">
                <span>Current Leader Bid:</span>
                <span className="font-mono font-bold text-white">₹{selectedLot.currentHighestBid}/Qtl</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Total Consignment (₹):</span>
                <span className="font-mono font-bold text-emerald-400">
                  ₹{(selectedLot.currentHighestBid * selectedLot.quantityQuintals).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400 text-[11px] border-t border-zinc-800/80 pt-1.5">
                <span>Required 15% Escrow Margin:</span>
                <span className="font-mono text-zinc-300">
                  ₹{(selectedLot.currentHighestBid * selectedLot.quantityQuintals * 0.15).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Bidding Controls */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300">Choose Bid Increment (₹/Quintal)</label>
              <div className="grid grid-cols-3 gap-2">
                {[50, 100, 250].map((inc) => (
                  <button
                    key={inc}
                    onClick={() => setBidIncrement(inc)}
                    className={`py-1.5 rounded-lg text-xs font-semibold border transition ${
                      bidIncrement === inc
                        ? "bg-emerald-500 border-emerald-400 text-zinc-950 shadow"
                        : "bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                    }`}
                  >
                    +₹{inc}
                  </button>
                ))}
              </div>

              <div className="mt-3">
                <Button
                  onClick={handlePlaceBid}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Place Bid ₹{(selectedLot.currentHighestBid + bidIncrement).toLocaleString("en-IN")} & Fund Escrow
                </Button>
              </div>

              {escrowSuccess && (
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-[11px] text-emerald-300 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{escrowSuccess}</span>
                </div>
              )}
            </div>

          </div>

          {/* Hyperledger Fabric Provenance footer */}
          <div className="mt-4 pt-3 border-t border-zinc-800 text-[10px] text-zinc-400 flex items-center justify-between">
            <span className="truncate max-w-[200px] font-mono text-zinc-500">
              Tx: {selectedLot.fabricTxHash.slice(0, 18)}...
            </span>
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <ShieldCheck className="h-3 w-3" /> Consensus Verified
            </span>
          </div>

        </div>

      </div>
    </div>
  )
}
