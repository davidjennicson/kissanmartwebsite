"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { 
  Sprout, 
  ArrowDown, 
  ArrowRight, 
  Heart, 
  Menu, 
  ChevronRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Smartphone,
  Layers,
  Lock,
  Building2,
  QrCode,
  CheckCircle2,
  RefreshCw,
  Coins,
  Activity,
  Boxes,
  Database,
  Server,
  GitBranch,
  ArrowLeftRight,
  Network
} from "lucide-react"

export default function FarmAfricaExactLandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [activeStep, setActiveStep] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-cycle through the 4 supply chain steps for diagram animation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev % 4) + 1)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#1D1D1F] selection:bg-[#107C41] selection:text-[#1D1D1F] overflow-x-hidden">
      
      {/* =========================================================================
          SECTION 1: HERO DARK FOREST SECTION WITH SMOOTH PARALLAX
         ========================================================================= */}
      <section className="relative min-h-screen bg-[#1D1D1F] text-[#FFFFFF] flex flex-col justify-between overflow-hidden px-6 py-6 sm:px-12 sm:py-8">
        
        {/* PARALLAX LAYER 1: Deep Background Leaves */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.08] select-none transition-transform duration-75 ease-out"
          style={{ transform: `translateY(${scrollY * 0.35}px)` }}
        >
          <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" fill="currentColor">
            <g>
              <path d="M160 120 C140 50, 210 10, 280 30 C350 50, 320 120, 250 160 Z" />
              <path d="M1240 180 C1290 100, 1360 130, 1340 210 C1320 290, 1220 260, 1240 180 Z" />
              <path d="M130 680 C70 620, 110 530, 190 550 C270 570, 240 670, 130 680 Z" />
              <path d="M1120 730 C1200 680, 1270 740, 1240 820 C1210 900, 1100 860, 1120 730 Z" />
              <path d="M430 800 C490 740, 560 780, 540 860 C520 930, 410 900, 430 800 Z" />
              <path d="M970 100 C1030 40, 1100 80, 1080 160 C1060 230, 950 200, 970 100 Z" />
            </g>
          </svg>
        </div>

        {/* PARALLAX LAYER 2: Floating Organic Sprout Shapes */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.14] select-none transition-transform duration-75 ease-out flex justify-between items-center"
          style={{ transform: `translateY(${scrollY * 0.18}px)` }}
        >
          <Sprout className="h-80 w-80 text-[#2E7D32] -translate-x-12 rotate-12" />
          <Sprout className="h-80 w-80 text-[#107C41] translate-x-12 -rotate-12" />
        </div>

        {/* Top Navbar */}
        <header className="relative z-20 flex items-center justify-between w-full max-w-7xl mx-auto">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center gap-2">
              <Sprout className="h-7 w-7 text-[#F8F6F0] stroke-[2.5]" />
              <span className="text-xl sm:text-2xl font-black tracking-widest text-[#F8F6F0] uppercase font-sans">
                KISSAN MART
              </span>
            </div>
          </Link>

          {/* Center Top Arch Menu Button */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-6 sm:-top-8">
            <div className="h-16 w-24 sm:h-20 sm:w-28 rounded-b-full bg-[#107C41] border-b-2 border-x-2 border-[#1B3E25] flex items-end justify-center pb-3 shadow-lg cursor-pointer hover:bg-[#00601F] transition">
              <Menu className="h-6 w-6 text-[#FFFFFF]" />
            </div>
          </div>

          {/* Right Action: Farm Africa Yellow Pill */}
          <div>
            <Link
              href="/demo"
              className="bg-[#107C41] hover:bg-[#E5BE32] text-[#1D1D1F] px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight shadow-md transition flex items-center gap-2"
            >
              <Heart className="h-4 w-4 fill-current text-[#1D1D1F]" />
              <span>Explore Demo</span>
            </Link>
          </div>

        </header>

        {/* Center Provocative Question in Newsreader Font */}
        <div 
          className="relative z-10 my-auto text-center max-w-4xl mx-auto px-4 py-16 transition-transform duration-75 ease-out"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-sans font-normal text-[#F8F6F0] leading-[1.18] tracking-tight">
            What if there was a{" "}
            <span className="text-[#107C41] font-sans italic underline decoration-[#107C41]/40 decoration-wavy underline-offset-8">
              solution
            </span>{" "}
            to farmer debt, mandi cartels and delayed crop payments?
          </h1>

          <p className="mt-8 text-base sm:text-lg text-[#F5F5F7] max-w-2xl mx-auto font-sans font-light leading-relaxed">
            By connecting smallholder farmers directly to corporate buyers through <strong>Python ML dynamic floor rates</strong> and <strong>24-hour smart contract escrow</strong>, KissanMart ensures no farmer sells at a distress loss.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/demo"
              className="bg-[#107C41] hover:bg-[#0E6B37] text-[#FFFFFF] px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg transition transform hover:scale-105 flex items-center gap-2 font-sans"
            >
              <span>Launch Live App Demo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Down Arrow Pill */}
        <div className="relative z-10 flex justify-center pb-2">
          <a
            href="#section-diagram"
            className="h-11 w-11 rounded-full bg-[#F8F6F0] text-[#107C41] flex items-center justify-center shadow-lg hover:scale-110 transition animate-bounce"
          >
            <ArrowDown className="h-5 w-5" />
          </a>
        </div>

      </section>


      {/* =========================================================================
          SECTION 2: ANIMATED SUPPLY CHAIN FLOW DIAGRAM (Replaces Testimonial)
          Interactive 4-Step Animated Pipeline:
          Farmer -> Python ML Pricing -> 24h Fabric Auction -> e-RUPI Escrow Payout
         ========================================================================= */}
      <section id="section-diagram" className="bg-[#F8F6F0] px-6 py-20 lg:py-28 border-b border-[#E5E5EA]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#107C41]">
              Automated Protocol Pipeline
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-[#107C41]">
              Decentralized Supply Chain in Motion
            </h2>
            <p className="text-[#86868B] text-base font-sans">
              Watch how our 4-stage smart contract automation eliminates middlemen, secures corporate deposits, and guarantees sub-24h farmer payout.
            </p>
          </div>

          {/* Animated Pipeline Diagram */}
          <div className="relative bg-[#FFFFFF] border-2 border-[#E5E5EA] rounded-3xl p-8 sm:p-12 shadow-sm">
            
            {/* Step Selection Toggles */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
              {[
                { step: 1, title: "1. Farmer Minting", icon: Smartphone },
                { step: 2, title: "2. Python ML Floor", icon: Cpu },
                { step: 3, title: "3. 24h Fabric Bid", icon: Building2 },
                { step: 4, title: "4. Escrow e-RUPI", icon: Lock },
              ].map((s) => {
                const IconComponent = s.icon
                const isCurrent = activeStep === s.step
                return (
                  <button
                    key={s.step}
                    onClick={() => setActiveStep(s.step)}
                    className={`flex items-center gap-3 p-4 rounded-2xl transition border text-left ${
                      isCurrent
                        ? "bg-[#107C41] text-[#F8F6F0] border-[#107C41] shadow-md scale-[1.02]"
                        : "bg-[#F8F6F0] text-[#1D1D1F] border-[#E5E5EA] hover:bg-[#F5F5F7]"
                    }`}
                  >
                    <IconComponent className={`h-5 w-5 ${isCurrent ? "text-[#107C41]" : "text-[#86868B]"}`} />
                    <span className="text-xs sm:text-sm font-bold font-sans">{s.title}</span>
                  </button>
                )
              })}
            </div>

            {/* Visual Animated Pipeline Arena */}
            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              
              {/* STAGE 1: Farmer Input */}
              <div className={`p-6 rounded-2xl transition-all border-2 ${
                activeStep === 1 
                  ? "bg-[#F0FDF4] border-[#107C41] shadow-lg ring-2 ring-[#107C41]/30 scale-[1.03]" 
                  : "bg-[#F8F6F0] border-[#E5E5EA] opacity-80"
              }`}>
                <div className="h-12 w-12 rounded-full bg-[#107C41] text-[#F8F6F0] flex items-center justify-center font-sans text-lg font-bold mb-3 shadow">
                  1
                </div>
                <h4 className="text-lg font-sans font-bold text-[#107C41]">Farmer Batch</h4>
                <p className="text-xs text-[#86868B] mt-1 font-sans">
                  DigiLocker KYC + Harvest Crop registered with moisture reading on-chain.
                </p>
                <div className="mt-4 pt-3 border-t border-[#E5E5EA] text-[11px] font-mono text-[#1D1D1F] font-bold">
                  Status: {activeStep === 1 ? "Active Minting..." : "Verified"}
                </div>
              </div>

              {/* STAGE 2: Python ML Engine */}
              <div className={`p-6 rounded-2xl transition-all border-2 ${
                activeStep === 2 
                  ? "bg-[#F0FDF4] border-[#107C41] shadow-lg ring-2 ring-[#107C41]/30 scale-[1.03]" 
                  : "bg-[#F8F6F0] border-[#E5E5EA] opacity-80"
              }`}>
                <div className="h-12 w-12 rounded-full bg-[#107C41] text-[#FFFFFF] flex items-center justify-center font-sans text-lg font-bold mb-3 shadow">
                  2
                </div>
                <h4 className="text-lg font-sans font-bold text-[#107C41]">Python ML Floor</h4>
                <p className="text-xs text-[#86868B] mt-1 font-sans">
                  XGBoost evaluates pan-India mandi arrival curves to compute floor quote.
                </p>
                <div className="mt-4 pt-3 border-t border-[#E5E5EA] text-[11px] font-mono text-[#107C41] font-bold">
                  Floor: ₹2,850/Qtl (+18%)
                </div>
              </div>

              {/* STAGE 3: 24h Auction Bidding */}
              <div className={`p-6 rounded-2xl transition-all border-2 ${
                activeStep === 3 
                  ? "bg-[#F0FDF4] border-[#107C41] shadow-lg ring-2 ring-[#107C41]/30 scale-[1.03]" 
                  : "bg-[#F8F6F0] border-[#E5E5EA] opacity-80"
              }`}>
                <div className="h-12 w-12 rounded-full bg-[#107C41] text-[#107C41] flex items-center justify-center font-sans text-lg font-bold mb-3 shadow">
                  3
                </div>
                <h4 className="text-lg font-sans font-bold text-[#107C41]">24h Bidding</h4>
                <p className="text-xs text-[#86868B] mt-1 font-sans">
                  ITC and Adani place bids. 15% margin quarantined automatically in vault.
                </p>
                <div className="mt-4 pt-3 border-t border-[#E5E5EA] text-[11px] font-mono text-[#107C41] font-bold">
                  Bid: ₹3,180/Qtl (15% Lock)
                </div>
              </div>

              {/* STAGE 4: Escrow e-RUPI Settlement */}
              <div className={`p-6 rounded-2xl transition-all border-2 ${
                activeStep === 4 
                  ? "bg-[#F0FDF4] border-[#107C41] shadow-lg ring-2 ring-[#107C41]/30 scale-[1.03]" 
                  : "bg-[#F8F6F0] border-[#E5E5EA] opacity-80"
              }`}>
                <div className="h-12 w-12 rounded-full bg-[#107C41] text-[#1D1D1F] flex items-center justify-center font-sans text-lg font-bold mb-3 shadow">
                  4
                </div>
                <h4 className="text-lg font-sans font-bold text-[#107C41]">e-RUPI Payout</h4>
                <p className="text-xs text-[#86868B] mt-1 font-sans">
                  Direct Benefit Transfer tokens dispatched directly to farmer SBI account.
                </p>
                <div className="mt-4 pt-3 border-t border-[#E5E5EA] text-[11px] font-mono text-[#107C41] font-bold">
                  Settled: Block #489,229
                </div>
              </div>

            </div>

            {/* Supply Chain Details Callout Banner */}
            <div className="mt-10 rounded-2xl bg-[#107C41] text-[#F8F6F0] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-[#107C41] tracking-widest font-sans">
                  Autonomous Protocol Consensus
                </span>
                <h3 className="text-2xl font-sans font-bold">
                  Want to interactively test this full pipeline live?
                </h3>
                <p className="text-xs sm:text-sm text-[#F5F5F7] font-sans">
                  Simulate crop submission, calculate machine learning floor prices, and trigger smart escrow payout.
                </p>
              </div>

              <Link
                href="/demo"
                className="bg-[#107C41] hover:bg-[#E8BB1D] text-[#1D1D1F] px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-wider shadow transition shrink-0 font-sans"
              >
                Launch Studio Simulator →
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2.5: SYSTEM ARCHITECTURE & HYPERLEDGER FABRIC NETWORK DIAGRAM
         ========================================================================= */}
      <section className="bg-[#FFFFFF] text-[#1D1D1F] px-6 py-20 border-t border-b border-[#E5E5EA]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-bold text-[#107C41] tracking-widest font-mono">
              Consortium Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-[#1D1D1F]">
              Hyperledger Fabric Enterprise Network Architecture
            </h2>
            <p className="text-sm sm:text-base text-[#86868B] font-sans leading-relaxed">
              Decentralized, permissioned ledger protocol designed for high-throughput mandi spot settlements, zero-leakage escrow holding, and algorithmic price discovery.
            </p>
          </div>

          {/* Interactive Clean Architecture Diagram */}
          <div className="border-2 border-[#1D1D1F] p-6 sm:p-8 bg-[#F5F5F7] space-y-8">
            
            {/* Top Row: User Applications & APIs */}
            <div>
              <div className="flex items-center justify-between border-b border-[#E5E5EA] pb-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#107C41] font-mono">
                  Layer 1: Client Interfaces & SDK Gateways
                </span>
                <span className="text-[11px] font-mono text-[#86868B]">gRPC / TLS 1.3 Endpoints</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-[#E5E5EA] bg-[#FFFFFF] p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-[#107C41]" />
                    <h4 className="text-xs font-bold uppercase text-[#1D1D1F]">Farmer PWA (Next.js)</h4>
                  </div>
                  <p className="text-xs text-[#86868B]">
                    DigiLocker KYC, offline SMS fallback, live bidding ticker, GPS transit tracking.
                  </p>
                </div>

                <div className="border border-[#E5E5EA] bg-[#FFFFFF] p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-[#107C41]" />
                    <h4 className="text-xs font-bold uppercase text-[#1D1D1F]">Buyer Enterprise Portal</h4>
                  </div>
                  <p className="text-xs text-[#86868B]">
                    ITC / Adani procurement console, real-time bid placement, 2-party escrow release.
                  </p>
                </div>

                <div className="border border-[#E5E5EA] bg-[#FFFFFF] p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-[#107C41]" />
                    <h4 className="text-xs font-bold uppercase text-[#1D1D1F]">Python ML Engine</h4>
                  </div>
                  <p className="text-xs text-[#86868B]">
                    XGBoost & Prophet microservice analyzing daily Agmarknet mandi arrivals & rainfall curves.
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Row: Hyperledger Fabric Consortium Channel */}
            <div>
              <div className="flex items-center justify-between border-b border-[#E5E5EA] pb-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#107C41] font-mono">
                  Layer 2: Hyperledger Fabric 2.5 Consortium Network (`agri-channel`)
                </span>
                <span className="text-[11px] font-mono text-[#107C41]">Channel: `kissanmart-mainnet`</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Org 1 Peer: APMC Mandi Node */}
                <div className="border-2 border-[#107C41] bg-[#FFFFFF] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono text-[#107C41]">ORG1: APMC</span>
                    <Server className="h-4 w-4 text-[#107C41]" />
                  </div>
                  <h5 className="text-xs font-bold text-[#1D1D1F]">Peer0.GovtMandi.in</h5>
                  <p className="text-[11px] text-[#86868B]">
                    Endorsement node for weighing bridge data & mandi gate-pass verification.
                  </p>
                  <span className="text-[10px] font-mono text-[#107C41] block">State DB: CouchDB v3.3</span>
                </div>

                {/* Org 2 Peer: Corporate Buyer Node */}
                <div className="border border-[#E5E5EA] bg-[#FFFFFF] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono text-[#1D1D1F]">ORG2: BUYER</span>
                    <Server className="h-4 w-4 text-[#1D1D1F]" />
                  </div>
                  <h5 className="text-xs font-bold text-[#1D1D1F]">Peer0.ITCAgri.com</h5>
                  <p className="text-[11px] text-[#86868B]">
                    Validates purchase lots, commits escrow margin collateral, and signs delivery acceptance.
                  </p>
                  <span className="text-[10px] font-mono text-[#107C41] block">State DB: CouchDB v3.3</span>
                </div>

                {/* Org 3 Peer: Farmer Cooperative Node */}
                <div className="border border-[#E5E5EA] bg-[#FFFFFF] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono text-[#1D1D1F]">ORG3: FPO UNION</span>
                    <Server className="h-4 w-4 text-[#1D1D1F]" />
                  </div>
                  <h5 className="text-xs font-bold text-[#1D1D1F]">Peer0.FPOFederation.org</h5>
                  <p className="text-[11px] text-[#86868B]">
                    Farmer producer org guardian node verifying crop MSP floor compliance.
                  </p>
                  <span className="text-[10px] font-mono text-[#107C41] block">State DB: CouchDB v3.3</span>
                </div>

                {/* Raft Orderer Node */}
                <div className="border border-[#E5E5EA] bg-[#FFFFFF] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono text-[#107C41]">CONSENSUS</span>
                    <Network className="h-4 w-4 text-[#107C41]" />
                  </div>
                  <h5 className="text-xs font-bold text-[#1D1D1F]">Orderer.Raft (5-Node)</h5>
                  <p className="text-[11px] text-[#86868B]">
                    Crash fault-tolerant block ordering service creating verifiable transaction blocks every 1.5s.
                  </p>
                  <span className="text-[10px] font-mono text-[#107C41] block">BatchTimeout: 1.5s</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Smart Contract Chaincode & Settlement Rails */}
            <div>
              <div className="flex items-center justify-between border-b border-[#E5E5EA] pb-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#107C41] font-mono">
                  Layer 3: Golang Smart Contract Chaincode & e-RUPI Settlement
                </span>
                <span className="text-[11px] font-mono text-[#86868B]">Chaincode: `kissan-escrow.go`</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="border border-[#E5E5EA] bg-[#FFFFFF] p-4 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-[#107C41] block">Chaincode Function</span>
                  <h5 className="font-bold text-[#1D1D1F]">`CreateAuctionLot()`</h5>
                  <p className="text-[#86868B] text-[11px]">
                    Farmer mints consignment lot with Python ML reserve price & GPS pickup coordinates.
                  </p>
                </div>

                <div className="border border-[#E5E5EA] bg-[#FFFFFF] p-4 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-[#107C41] block">Chaincode Function</span>
                  <h5 className="font-bold text-[#1D1D1F]">`LockBuyerEscrow()`</h5>
                  <p className="text-[#86868B] text-[11px]">
                    Locks 100% consignment funds in smart contract vault until quality inspection.
                  </p>
                </div>

                <div className="border border-[#E5E5EA] bg-[#FFFFFF] p-4 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-[#107C41] block">Settlement Rail</span>
                  <h5 className="font-bold text-[#107C41]">`Disburse_eRUPI_DBT()`</h5>
                  <p className="text-[#86868B] text-[11px]">
                    RBI/NPCI digital voucher rail settles directly to farmer bank account with zero fee deductions.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: LIME-GREEN "YOU HAVE THE POWER" & PIE CHART BREAKDOWN
          (Exact visual match to Screenshot 2)
         ========================================================================= */}
      <section className="bg-[#2E7D32] text-[#1D1D1F] px-6 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle & 2 Pill Buttons */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-sans font-bold text-[#1D1D1F] leading-[1.12] tracking-tight">
              You have the power to make a difference
            </h2>

            <p className="text-lg sm:text-xl text-[#1D1D1F]/85 font-sans leading-relaxed">
              Help make real change to the lives of Indian farming families by eliminating predatory middlemen and adopting decentralized supply chain technology.
            </p>

            <div className="pt-4 space-y-3.5 max-w-sm">
              <Link
                href="/demo"
                className="w-full bg-[#107C41] hover:bg-[#004215] text-[#FFFFFF] py-4 px-6 rounded-xl font-sans font-bold text-sm tracking-wide shadow-md transition flex items-center justify-center gap-2"
              >
                <Smartphone className="h-4 w-4" />
                <span>Simulate Farmer Harvest Batch</span>
              </Link>

              <Link
                href="/demo"
                className="w-full bg-[#107C41] hover:bg-[#0E6B37] text-[#FFFFFF] py-4 px-6 rounded-xl font-sans font-bold text-sm tracking-wide shadow-md transition flex items-center justify-center gap-2"
              >
                <Heart className="h-4 w-4 fill-current" />
                <span>Simulate Corporate Wholesale Bidding</span>
              </Link>
            </div>
          </div>

          {/* Right Column: "Where your money's going" Card with Donut Chart Breakdown */}
          <div className="lg:col-span-6">
            <div className="bg-[#FFFFFF] border-2 border-[#1D1D1F]/20 rounded-2xl p-8 sm:p-10 shadow-lg">
              
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-[#1D1D1F] text-center mb-8">
                Where every rupee goes in KissanMart
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
                
                {/* Visual Donut Chart with Sprout in Center */}
                <div className="sm:col-span-6 flex justify-center">
                  <div className="relative h-44 w-44 rounded-full border-[18px] border-[#107C41] flex items-center justify-center shadow-inner">
                    <div className="absolute inset-0 rounded-full border-[18px] border-transparent border-t-[#4CB9D1] border-r-[#107C41] rotate-45" />
                    <div className="text-center z-10">
                      <Sprout className="h-9 w-9 text-[#107C41] mx-auto" />
                    </div>
                  </div>
                </div>

                {/* Breakdown Legend Items */}
                <div className="sm:col-span-6 space-y-4 text-xs sm:text-sm font-sans">
                  <p className="font-bold text-[#1D1D1F] text-base mb-2 font-sans">In every ₹100 settled:</p>
                  
                  <div className="flex items-start gap-3">
                    <span className="h-4 w-4 rounded-full bg-[#107C41] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#1D1D1F] block text-base font-sans">₹98.20</span>
                      <span className="text-[#86868B]">Direct payment credited to farmer bank account</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="h-4 w-4 rounded-full bg-[#4CB9D1] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#1D1D1F] block text-base font-sans">₹1.40</span>
                      <span className="text-[#86868B]">Refrigerated GPS transport & cold chain corridor</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="h-4 w-4 rounded-full bg-[#107C41] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#1D1D1F] block text-base font-sans">₹0.40</span>
                      <span className="text-[#86868B]">Decentralized Hyperledger protocol consensus</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Bottom "Did you know?" 3-column statistics */}
        <div className="max-w-7xl mx-auto mt-16 pt-12 border-t border-[#1D1D1F]/20">
          <div className="text-center mb-8">
            <h4 className="text-2xl sm:text-3xl font-sans font-bold text-[#1D1D1F]">
              Did you know?
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="flex items-baseline gap-4">
              <span className="text-4xl sm:text-5xl font-sans font-bold text-[#1D1D1F] shrink-0">
                ₹370
              </span>
              <p className="text-xs sm:text-sm text-[#1D1D1F]/80 leading-relaxed font-sans">
                average net income uplift per quintal when farmers sell through competitive 24h auctions instead of physical mandi cartels.
              </p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl sm:text-5xl font-sans font-bold text-[#1D1D1F] shrink-0">
                24h
              </span>
              <p className="text-xs sm:text-sm text-[#1D1D1F]/80 leading-relaxed font-sans">
                strict automated smart contract settlement window, ending the traditional 45-day delay in physical cheque clearance.
              </p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl sm:text-5xl font-sans font-bold text-[#1D1D1F] shrink-0">
                100%
              </span>
              <p className="text-xs sm:text-sm text-[#1D1D1F]/80 leading-relaxed font-sans">
                bids backed by mandatory 15% escrow margin locks on Hyperledger Fabric, eliminating fraudulent bad-faith buyer bids.
              </p>
            </div>

          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E5E5EA] bg-[#FFFFFF] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#86868B] font-sans">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[#107C41] text-[#107C41] flex items-center justify-center font-bold">
              <Sprout className="h-4 w-4" />
            </div>
            <span className="font-sans font-bold text-sm text-[#107C41]">KissanMart Consortium</span>
            <span>• Hyperledger Fabric 2.5, Golang, Python ML & Next.js 16</span>
          </div>

          <div>
            Built for Indian Digital Public Infrastructure (DPI) & Agmarknet integration.
          </div>
        </div>
      </footer>

    </div>
  )
}
