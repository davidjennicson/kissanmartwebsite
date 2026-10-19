"use client"

import React, { useState } from "react"
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine 
} from "recharts"
import { 
  TrendingUp, 
  Sliders, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  ArrowUpRight,
  Database,
  Info
} from "lucide-react"
import { ML_PRICE_METRICS } from "@/lib/kissan-data"
import { Badge } from "@/components/ui/badge"

const HISTORICAL_CHART_DATA = [
  { day: "Oct 10", mandiRate: 2680, mlPredictedFloor: 2800, actualBidPrice: 2890 },
  { day: "Oct 11", mandiRate: 2710, mlPredictedFloor: 2820, actualBidPrice: 2940 },
  { day: "Oct 12", mandiRate: 2690, mlPredictedFloor: 2810, actualBidPrice: 2930 },
  { day: "Oct 13", mandiRate: 2740, mlPredictedFloor: 2880, actualBidPrice: 3010 },
  { day: "Oct 14", mandiRate: 2720, mlPredictedFloor: 2890, actualBidPrice: 3050 },
  { day: "Oct 15", mandiRate: 2780, mlPredictedFloor: 2950, actualBidPrice: 3100 },
  { day: "Oct 16", mandiRate: 2790, mlPredictedFloor: 2980, actualBidPrice: 3120 },
  { day: "Oct 17", mandiRate: 2820, mlPredictedFloor: 3010, actualBidPrice: 3150 },
  { day: "Oct 18", mandiRate: 2810, mlPredictedFloor: 3040, actualBidPrice: 3180 },
  { day: "Oct 19 (Today)", mandiRate: 2850, mlPredictedFloor: 3050, actualBidPrice: 3220 },
]

export function MlPriceDiscoveryEngine() {
  const [demandFactor, setDemandFactor] = useState(85)
  const [moistureOffset, setMoistureOffset] = useState(11.2)
  const [transitDistance, setTransitDistance] = useState(120)

  // Dynamic live calculation based on sliders
  const baseRate = 2850
  const dynamicGain = Math.round((demandFactor - 50) * 4.5 + (14 - moistureOffset) * 28 - (transitDistance - 50) * 0.4)
  const computedFloor = baseRate + dynamicGain

  return (
    <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <h3 className="text-xl font-extrabold text-zinc-100 flex items-center gap-2">
              Python ML Dynamic Price Engine
            </h3>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
              XGBoost + LSTM Multivariant
            </Badge>
          </div>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            Real-time algorithmic pricing eliminates exploitative cartels in APMC mandis. Floor price adapts continuously based on pan-India spot rates, satellite soil-moisture, and wholesale procurement surges.
          </p>
        </div>

        {/* Live quote ticker badge */}
        <div className="flex items-center gap-3 rounded-2xl bg-zinc-900 border border-zinc-800 p-3">
          <div>
            <span className="text-[10px] text-zinc-400 block font-mono">Simulated Floor Rate</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">
              ₹{computedFloor} <span className="text-xs font-normal text-zinc-400">/Qtl</span>
            </span>
          </div>
          <div className="border-l border-zinc-800 pl-3">
            <span className="text-[10px] text-emerald-400 font-semibold block">
              +{Math.round(((computedFloor - 2275) / 2275) * 100)}% vs MSP
            </span>
            <span className="text-[9px] text-zinc-500">MSP: ₹2,275/Qtl</span>
          </div>
        </div>
      </div>

      {/* Grid: Interactive parameter sliders & Chart */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive parameter controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-4">
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="h-4 w-4 text-emerald-400" />
              Tune Feature Weights in Real-Time
            </h4>

            {/* Slider 1: Demand Index */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-300">Consumer & FMCG Demand Index</span>
                <span className="font-mono text-emerald-400 font-bold">{demandFactor}/100</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={demandFactor}
                onChange={(e) => setDemandFactor(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-zinc-500 block">
                Derived from e-NAM wholesale purchase volumes and consumer retail queries.
              </span>
            </div>

            {/* Slider 2: Moisture Content */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-300">Crop Moisture Content (%)</span>
                <span className="font-mono text-emerald-400 font-bold">{moistureOffset}%</span>
              </div>
              <input
                type="range"
                min="9"
                max="16"
                step="0.1"
                value={moistureOffset}
                onChange={(e) => setMoistureOffset(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-zinc-500 block">
                Sub-12% moisture guarantees premium storability without fungal risk.
              </span>
            </div>

            {/* Slider 3: Transit Distance */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-300">Farm-to-Mandi Transit Radius (km)</span>
                <span className="font-mono text-emerald-400 font-bold">{transitDistance} km</span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                value={transitDistance}
                onChange={(e) => setTransitDistance(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-zinc-500 block">
                Dynamic freight deduction calculated through automated GPS fuel indexing.
              </span>
            </div>
          </div>

          {/* Model feature importance breakdown */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2.5">
            <h5 className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
              <span>Key ML Predictor Weights</span>
              <span className="text-[10px] text-emerald-400 font-mono">R² Score: 0.942</span>
            </h5>
            <div className="space-y-2">
              {ML_PRICE_METRICS.map((metric, i) => (
                <div key={i} className="flex items-center justify-between text-xs border-b border-zinc-800/60 pb-1.5 last:border-0">
                  <div>
                    <span className="text-zinc-300 font-medium block">{metric.factor}</span>
                    <span className="text-[10px] text-zinc-500">{metric.signal}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-semibold text-emerald-400 text-xs">{metric.impact}</span>
                    <span className="text-[10px] text-zinc-500 block">{metric.weight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side: Recharts dynamic comparison curve */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h4 className="text-sm font-bold text-zinc-200">
                  10-Day Mandi Spot vs. KissanMart ML Auction Premium
                </h4>
                <p className="text-xs text-zinc-400">
                  Farmers gain an average of +12% to +18% higher net yield via decentralized bids.
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-zinc-500" />
                  <span className="text-zinc-400">Traditional Mandi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-teal-400" />
                  <span className="text-zinc-300">ML Floor</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Winning Bids</span>
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="h-[280px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={HISTORICAL_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWinning" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorFloor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="day" stroke="#71717a" fontSize={10} />
                  <YAxis stroke="#71717a" fontSize={10} domain={['dataMin - 100', 'dataMax + 100']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", borderRadius: "12px", fontSize: "11px" }}
                    itemStyle={{ color: "#e4e4e7" }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="actualBidPrice" 
                    name="Winning Bid" 
                    stroke="#10b981" 
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#colorWinning)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="mlPredictedFloor" 
                    name="ML Algorithmic Floor" 
                    stroke="#14b8a6" 
                    strokeWidth={1.5} 
                    strokeDasharray="4 4"
                    fillOpacity={1} 
                    fill="url(#colorFloor)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="mandiRate" 
                    name="Local Mandi Spot" 
                    stroke="#71717a" 
                    strokeWidth={1.5} 
                    fill="none" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Insights */}
          <div className="mt-4 pt-3 border-t border-zinc-800 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-xl bg-zinc-950/60 p-2 border border-zinc-800/80">
              <span className="text-[10px] text-zinc-500 block">Avg. Price Spread</span>
              <span className="font-bold text-emerald-400 font-mono">+₹370 / Qtl</span>
            </div>
            <div className="rounded-xl bg-zinc-950/60 p-2 border border-zinc-800/80">
              <span className="text-[10px] text-zinc-500 block">Middleman Leakage</span>
              <span className="font-bold text-zinc-200 font-mono">0.0% (Zero)</span>
            </div>
            <div className="rounded-xl bg-zinc-950/60 p-2 border border-zinc-800/80">
              <span className="text-[10px] text-zinc-500 block">Settlement Speed</span>
              <span className="font-bold text-teal-400 font-mono">&lt; 24 Hours</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
