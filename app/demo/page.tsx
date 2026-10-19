"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Camera, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  ArrowDown,
  RotateCcw, 
  QrCode, 
  Sprout, 
  Cpu, 
  Check, 
  Lock, 
  Coins, 
  TrendingUp, 
  Building2,
  PlusCircle,
  Truck,
  FileText,
  BadgePercent,
  Wallet,
  PhoneCall,
  Flame,
  Volume2,
  ChevronRight,
  ShieldCheck,
  Building,
  Scale,
  Sparkles,
  ExternalLink,
  Search,
  CheckCheck,
  AlertCircle,
  Radio,
  Send,
  HelpCircle,
  X
} from "lucide-react"

interface Bidder {
  id: string
  buyerName: string
  buyerType: string
  bidPerQtl: number
  totalAmount: number
  escrowMargin: number
  time: string
  status: "active" | "winning" | "accepted"
  rating: string
}

export default function AppleMinimalKissanMartDemo() {
  // Active View Tab: Farmer Mobile View vs Corporate Buyer Web View
  const [activePortal, setActivePortal] = useState<"farmer" | "buyer">("farmer")
  
  // Language for farmer app: English & Hindi
  const [lang, setLang] = useState<"en" | "hi">("hi")
  
  // Interactive Walkthrough / Tutorial Guidance Arrows & Spotlight
  const [showTutorial, setShowTutorial] = useState(true)

  // Farmer App Screens:
  // 'home' -> 'aadhaar-scan' -> 'address-select' -> 'create-lot' -> 'auction-live' -> 'escrow-held' | 'payout-success'
  const [currentScreen, setCurrentScreen] = useState<
    "home" | "aadhaar-scan" | "address-select" | "create-lot" | "auction-live" | "escrow-held" | "payout-success" | "mandi-rates" | "wallet"
  >("home")

  // Aadhaar scan state
  const [isScanning, setIsScanning] = useState(false)
  const [aadhaarScanned, setAadhaarScanned] = useState(false)
  const [farmerData, setFarmerData] = useState({
    name: "Sardar Gurpreet Singh",
    aadhaarNumber: "7842 9012 3418",
    dob: "14/08/1982",
    kccNumber: "KCC-PB-8921-X",
  })

  // Address selection
  const [addressMode, setAddressMode] = useState<"gps" | "manual">("gps")
  const [gpsLoading, setGpsLoading] = useState(false)
  const [address, setAddress] = useState("V.P.O. Bhari, Near Khanna Grain Yard, Ludhiana, Punjab")

  // Crop & Auction Lot Specs
  const [crop, setCrop] = useState("गेहूं / Sharbati Premium Wheat")
  const [quantity, setQuantity] = useState<number>(120)
  const [farmerFloorAsk, setFarmerFloorAsk] = useState<number>(2900)
  const [mlSuggestedFloor, setMlSuggestedFloor] = useState<number>(2850)
  const [isComputingML, setIsComputingML] = useState(false)

  // Escrow & Dual-Party Confirmation
  const [buyerInspected, setBuyerInspected] = useState(false)
  const [isConfirmingRelease, setIsConfirmingRelease] = useState(false)

  // Real-time synchronization notice in Farmer app when Buyer places a bid
  const [latestBuyerAlert, setLatestBuyerAlert] = useState<string | null>(null)

  // Bidders List
  const [bidders, setBidders] = useState<Bidder[]>([
    {
      id: "BID-ITC-902",
      buyerName: "ITC e-Choupal Procurement",
      buyerType: "FMCG Aggregator",
      bidPerQtl: 3180,
      totalAmount: 381600,
      escrowMargin: 381600,
      time: "45s ago",
      status: "winning",
      rating: "4.9 ★ (GST Verified)"
    },
    {
      id: "BID-AW-412",
      buyerName: "Adani Wilmar Agri Hub",
      buyerType: "Grain Wholesaler",
      bidPerQtl: 3140,
      totalAmount: 376800,
      escrowMargin: 376800,
      time: "3m ago",
      status: "active",
      rating: "4.8 ★ (Tier 1 Aggregator)"
    },
    {
      id: "BID-BB-118",
      buyerName: "BigBasket Direct Farm",
      buyerType: "Retail Sourcing",
      bidPerQtl: 3080,
      totalAmount: 369600,
      escrowMargin: 369600,
      time: "8m ago",
      status: "active",
      rating: "4.7 ★ (Organics Hub)"
    }
  ])

  const [winningBid, setWinningBid] = useState<Bidder>(bidders[0])
  const [acceptedBid, setAcceptedBid] = useState<Bidder | null>(null)

  // Buyer portal state
  const [customBuyerBid, setCustomBuyerBid] = useState<number>(3250)
  const [buyerNameInput, setBuyerNameInput] = useState<string>("ITC Direct Sourcing")
  const [bidSubmittedToast, setBidSubmittedToast] = useState(false)

  // Automatic incoming corporate bids ticker
  useEffect(() => {
    if (currentScreen === "auction-live") {
      const interval = setInterval(() => {
        setBidders((prev) => {
          const currentTop = prev[0].bidPerQtl
          const newBidAmount = currentTop + 20
          const total = newBidAmount * quantity
          const newBid: Bidder = {
            id: `BID-RL-${Date.now().toString().slice(-3)}`,
            buyerName: "Reliance Fresh Retail Hub",
            buyerType: "Supermarket Sourcing",
            bidPerQtl: newBidAmount,
            totalAmount: total,
            escrowMargin: total,
            time: "Just now",
            status: "winning",
            rating: "4.9 ★ (Govt APMC License)"
          }
          const updated = [newBid, ...prev.map(b => ({ ...b, status: "active" as const }))].slice(0, 5)
          setWinningBid(newBid)
          return updated
        })
      }, 9000)
      return () => clearInterval(interval)
    }
  }, [currentScreen, quantity])

  // Clear live alert after 6 seconds
  useEffect(() => {
    if (latestBuyerAlert) {
      const timer = setTimeout(() => setLatestBuyerAlert(null), 6000)
      return () => clearTimeout(timer)
    }
  }, [latestBuyerAlert])

  // Language dictionary (English & Hindi)
  const t = {
    en: {
      home: "Home",
      switchLang: "हिंदी में देखें",
      welcome: "Welcome,",
      quickActions: "Farmer Services",
      startBid: "Create New Crop Lot",
      startBidSub: "Set reserve floor rate & get 24h bids",
      liveAuctions: "My Active Auctions",
      checkMandi: "Live Mandi Rates",
      checkMandiSub: "Agmarknet spot rates",
      eRupiWallet: "e-RUPI Wallet",
      walletBal: "₹4,45,200 Available",
      transporter: "Book Mandi Truck",
      transporterSub: "Cold transit fleet",
      helpDesk: "Kisan Helpline (1800-180-1551)",

      // Step 1: Aadhaar
      step1Title: "Aadhaar Card Scanner",
      step1Sub: "Tap to simulate photo click & automatic OCR extraction",
      scanCardBtn: "Click / Scan Aadhaar Card",
      scanning: "Extracting DigiLocker Verified Data...",
      name: "Farmer Name",
      aadhaar: "Aadhaar UID",
      dob: "DOB",
      kcc: "KCC Number",
      next: "Continue",

      // Step 2: Location
      step2Title: "Farm Pickup Location",
      step2Sub: "Select how truck transport should pinpoint location",
      gpsOpt: "Auto-Load GPS Coordinates",
      gpsSub: "Satellite farm location",
      gpsLoading: "Detecting Coordinates...",
      manualOpt: "Type Address Manually",
      addrLabel: "Pickup Address",
      confirmAddr: "Save & Next",

      // Step 3: Create Bid Lot
      step3Title: "Set Crop Lot & Floor Price",
      step3Sub: "Set reserve floor price for the 24h auction",
      cropLabel: "Select Crop",
      qtyLabel: "Consignment Volume (Quintals)",
      floorLabel: "Your Minimum Reserve Floor Price (₹/Qtl)",
      calcML: "Run Python ML Calculation",
      mlRunning: "Analyzing Mandi Arrivals...",
      mlSuggested: "Python ML Recommended Floor",
      aboveMsp: "+18.4% above Govt MSP",
      publishAuction: "Publish Lot to 24h Bidding",

      // Step 4: Live Auction
      auctionTitle: "Live 24h Auction",
      timeLeft: "18h : 22m remaining",
      topOffer: "Leading Bid Offer",
      totalConsignment: "Total Consignment Value",
      escrowLocked: "100% Escrow Vault Guarantee",
      biddersList: "Live Corporate Bidders Feed",
      acceptBidBtn: "Accept Bid & Lock 100% Escrow",

      // Step 4.5: Escrow Held State
      escrowHeldTitle: "Funds Locked in Smart Contract Escrow",
      escrowHeldSub: "Buyer has pre-locked ₹{{amount}} into Hyperledger Fabric escrow vault. Payment will disburse directly to your bank account as soon as buyer inspects grain weight at gate.",
      escrowStatusLabel: "Status: 🔒 ESCROW LOCKED (Pending Buyer Inspection)",
      dispatchMandiPass: "Mandi Pickup Gate-Pass Generated",
      switchToBuyerCTA: "Switch to Buyer Portal to Inspect & Release Payment",

      // Step 5: Payout Success
      successTitle: "Buyer Confirmed! Payment Released to Bank",
      successSub: "Direct e-RUPI / SBI DBT instantly credited to your bank account with zero deductions.",
      gatepassTitle: "Mandi Gate-Pass Cleared & Completed",
      gatepassSub: "Signed on Hyperledger Fabric ledger.",
      backHome: "Back to Home Dashboard"
    },
    hi: {
      home: "होम",
      switchLang: "English",
      welcome: "नमस्ते,",
      quickActions: "प्रमुख सेवाएं",
      startBid: "नई फसल नीलामी दर्ज करें",
      startBidSub: "न्यूनतम भाव तय करें व २४ घंटे में खरीदार पाएं",
      liveAuctions: "मेरी सक्रिय नीलामी",
      checkMandi: "लाइव मंडी भाव",
      checkMandiSub: "देश भर की मंडियों के आज के भाव",
      eRupiWallet: "किसान e-RUPI वॉलेट",
      walletBal: "₹4,45,200 जमा राशि",
      transporter: "मंडी वाहन / ट्रक बुक करें",
      transporterSub: "सत्यापित वाहन नेटवर्क",
      helpDesk: "किसान हेल्पलाइन (१८००-१८०-१५५१)",

      // Step 1: Aadhaar
      step1Title: "आधार कार्ड ऑटो-स्कैन",
      step1Sub: "फोटो लेने या स्कैन करने पर विवरण तुरंत लोड होगा",
      scanCardBtn: "आधार कार्ड स्कैन करें",
      scanning: "डिजिलॉकर से ऑन-चेन सत्यापन जारी...",
      name: "किसान का नाम",
      aadhaar: "आधार संख्या",
      dob: "जन्म तिथि",
      kcc: "KCC संख्या",
      next: "आगे बढ़ें",

      // Step 2: Location
      step2Title: "खेत / फसल लोडिंग का पता",
      step2Sub: "ट्रक पिकअप के लिए पता दर्ज करने का तरीका चुनें",
      gpsOpt: "मेरा वर्तमान GPS स्थान लोड करें",
      gpsSub: "सैटेलाइट द्वारा सटीक खेत का स्थान",
      gpsLoading: "लोकेशन लोड हो रही है...",
      manualOpt: "मंडी / गाँव का पता स्वयं लिखें",
      addrLabel: "लोडिंग का पता",
      confirmAddr: "पता सहेजें और आगे बढ़ें",

      // Step 3: Create Bid Lot
      step3Title: "फसल लॉट व न्यूनतम भाव तय करें",
      step3Sub: "२४ घंटे की लाइव नीलामी हेतु अपना न्यूनतम भाव भरें",
      cropLabel: "फसल का चयन करें",
      qtyLabel: "कुल मात्रा (क्विंटल)",
      floorLabel: "आपका न्यूनतम आरक्षित भाव (₹/क्विंटल)",
      calcML: "पायथन ML मंडी भाव गणना",
      mlRunning: "डेटा संकलन जारी...",
      mlSuggested: "पायथन ML अनुशंसित भाव",
      aboveMsp: "सरकारी MSP से +१८.४% अधिक",
      publishAuction: "२४ घंटे की लाइव नीलामी शुरू करें",

      // Step 4: Live Auction
      auctionTitle: "२४ घंटे की लाइव कॉर्पोरेट नीलामी",
      timeLeft: "१८ घंटे : २२ मिनट शेष",
      topOffer: "उच्चतम बोली (सर्वश्रेष्ठ भाव)",
      totalConsignment: "कुल फसल मूल्य",
      escrowLocked: "१००% राशि सुरक्षित एस्क्रो में लॉक",
      biddersList: "लाइव खरीदार बोली सूची",
      acceptBidBtn: "बोली स्वीकार करें व १००% एस्क्रो लॉक करें",

      // Step 4.5: Escrow Held State
      escrowHeldTitle: "राशि स्मार्ट कॉन्ट्रैक्ट एस्क्रो में लॉक है!",
      escrowHeldSub: "खरीदार ने ₹{{amount}} एस्क्रो में जमा कर दिए हैं। खरीदार द्वारा माल की जांच व पुष्टि के बाद ही भुगतान तुरंत आपके खाते में जाएगा।",
      escrowStatusLabel: "एस्क्रो स्थिति: 🔒 सुरक्षित लॉक (खरीदार पुष्टि प्रतीक्षित)",
      dispatchMandiPass: "मंडी गेट-पास जारी (ट्रक रवानगी)",
      switchToBuyerCTA: "खरीदार पोर्टल पर जाएं और माल पुष्टि कर भुगतान जारी करें",

      // Step 5: Payout Success
      successTitle: "खरीदार ने पुष्टि की! भुगतान बैंक खाते में जमा",
      successSub: "बिना किसी दलाली के सीधे e-RUPI / SBI DBT द्वारा बैंक खाते में तुरंत भुगतान भेज दिया गया।",
      gatepassTitle: "मंडी गेट-पास पूर्ण व रसीद सत्यापित",
      gatepassSub: "हाइपरलेजर फैब्रिक लेज़र पर रसीद सुरक्षित दर्ज।",
      backHome: "मुख्य डैशबोर्ड पर लौटें"
    }
  }[lang]

  // Aadhaar scan
  const handleAadhaarScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setAadhaarScanned(true)
    }, 1100)
  }

  // GPS Select
  const handleGpsSelect = () => {
    setAddressMode("gps")
    setGpsLoading(true)
    setTimeout(() => {
      setGpsLoading(false)
      setAddress("V.P.O. Bhari, Near Khanna Grain Yard, Ludhiana, Punjab (30.7046° N, 76.2163° E)")
    }, 700)
  }

  // ML Compute
  const handleComputeML = () => {
    setIsComputingML(true)
    setTimeout(() => {
      setIsComputingML(false)
      const base = crop.includes("गेहूं") ? 2850 : crop.includes("Onion") ? 2580 : 4920
      setMlSuggestedFloor(base)
      setFarmerFloorAsk(base)
    }, 800)
  }

  // Farmer accepts bid -> Goes to ESCROW-HELD (Payment locked until buyer inspects)
  const handleAcceptBid = (bid: Bidder) => {
    setAcceptedBid(bid)
    setBuyerInspected(false)
    setCurrentScreen("escrow-held")
  }

  // BUYER SUBMITS BID -> Instantly reflects in Farmer app
  const handleBuyerSubmitBid = () => {
    const total = customBuyerBid * quantity
    const newBid: Bidder = {
      id: `BID-CORP-${Date.now().toString().slice(-4)}`,
      buyerName: buyerNameInput,
      buyerType: "Corporate Exporter / Direct Processor",
      bidPerQtl: customBuyerBid,
      totalAmount: total,
      escrowMargin: total,
      time: "Just now",
      status: "winning",
      rating: "5.0 ★ (Hyperledger Verified)"
    }
    
    setBidders(prev => [newBid, ...prev.map(b => ({ ...b, status: "active" as const }))])
    setWinningBid(newBid)
    setLatestBuyerAlert(`New Corporate Bid: ${buyerNameInput} placed ₹${customBuyerBid}/Qtl (Total ₹${total.toLocaleString("en-IN")})`)
    setBidSubmittedToast(true)
    setTimeout(() => setBidSubmittedToast(false), 3000)
  }

  // Buyer releases escrow
  const handleBuyerReleaseEscrow = () => {
    setIsConfirmingRelease(true)
    setTimeout(() => {
      setIsConfirmingRelease(false)
      setBuyerInspected(true)
      setCurrentScreen("payout-success")
      setActivePortal("farmer")
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans flex flex-col justify-between py-6 px-4 sm:px-8 select-none">
      
      {/* APPLE TOP BAR: Clean, Light, Spacious Navigation */}
      <header className="max-w-5xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#E5E5EA]">
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-[#107C41] hover:opacity-80 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>KissanMart</span>
          </Link>

          <span className="text-[#D2D2D7]">|</span>

          {/* Apple-style segmented control */}
          <div className="flex items-center bg-[#F5F5F7] p-1 rounded-lg border border-[#E5E5EA]">
            <button
              onClick={() => setActivePortal("farmer")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition ${
                activePortal === "farmer"
                  ? "bg-[#FFFFFF] text-[#1D1D1F] shadow-sm font-bold"
                  : "text-[#86868B] hover:text-[#1D1D1F]"
              }`}
            >
              1. Farmer Mobile View
            </button>
            <button
              onClick={() => setActivePortal("buyer")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition ${
                activePortal === "buyer"
                  ? "bg-[#FFFFFF] text-[#1D1D1F] shadow-sm font-bold"
                  : "text-[#86868B] hover:text-[#1D1D1F]"
              }`}
            >
              2. Corporate Buyer Console
            </button>
          </div>
        </div>

        {/* Right side helper info & Tutorial toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowTutorial(!showTutorial)}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition ${
              showTutorial 
                ? "bg-[#107C41] text-[#FFFFFF] border-[#107C41]" 
                : "bg-[#FFFFFF] text-[#86868B] border-[#E5E5EA] hover:text-[#1D1D1F]"
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>{showTutorial ? "Tutorial Arrows ON" : "Tutorial Help"}</span>
          </button>

          {activePortal === "farmer" ? (
            <button
              onClick={() => setLang(lang === "hi" ? "en" : "hi")}
              className="text-xs font-semibold bg-[#F5F5F7] px-3 py-1.5 rounded-lg border border-[#E5E5EA] text-[#1D1D1F] hover:bg-[#EBEBEF] transition"
            >
              {t.switchLang}
            </button>
          ) : (
            <div className="text-xs font-mono text-[#107C41] flex items-center gap-1.5 bg-[#F0FDF4] px-3 py-1 rounded-lg border border-[#107C41]/30">
              <Lock className="h-3.5 w-3.5" />
              <span>Escrow Reserve: ₹45,00,000</span>
            </div>
          )}
        </div>
      </header>

      {/* VIEWPORT 1: FARMER MOBILE APP SIMULATION (Spacious Apple Design) */}
      {activePortal === "farmer" && (
        <main className="my-auto flex flex-col items-center justify-center w-full py-6">
          
          {/* REAL-TIME BROADCAST ALERT WHEN BUYER SUBMITS BID */}
          {latestBuyerAlert && (
            <div className="w-full max-w-[420px] mb-4 bg-[#F0FDF4] border border-[#107C41] rounded-2xl p-4 text-sm flex items-center justify-between text-[#107C41] shadow-sm animate-in slide-in-from-top-3">
              <div className="flex items-center gap-3">
                <Radio className="h-5 w-5 text-[#107C41] animate-pulse shrink-0" />
                <span className="font-semibold">{latestBuyerAlert}</span>
              </div>
            </div>
          )}

          {/* Quick Notice When Funds in Escrow */}
          {currentScreen === "escrow-held" && (
            <div className="w-full max-w-[420px] mb-4 bg-[#FFFFFF] border-2 border-[#107C41] rounded-2xl p-4 text-sm flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-[#107C41] shrink-0" />
                <span className="font-medium text-[#1D1D1F]">
                  Funds safely held in Escrow! Switch to Buyer Console to inspect & release.
                </span>
              </div>
              <button
                onClick={() => setActivePortal("buyer")}
                className="bg-[#107C41] text-[#FFFFFF] font-semibold px-3 py-1.5 rounded-xl text-xs shrink-0 ml-2"
              >
                Go to Buyer →
              </button>
            </div>
          )}

          {/* APPLE PHONE FRAME: Elegant, Airy, Big Typography, Breathing Room */}
          <div className="relative w-full max-w-[420px] rounded-[44px] border-[8px] border-[#E5E5EA] bg-[#FFFFFF] shadow-2xl p-2">
            
            {/* Top Speaker & Notch */}
            <div className="flex items-center justify-between px-6 pt-3 pb-2 text-xs font-semibold text-[#86868B]">
              <span>10:48</span>
              <div className="h-4 w-24 rounded-full bg-[#1D1D1F] flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-[#107C41] mr-1.5 animate-pulse" />
              </div>
              <span>5G 100%</span>
            </div>

            {/* Inner Phone Screen */}
            <div className="rounded-[36px] bg-[#FFFFFF] overflow-hidden flex flex-col justify-between min-h-[640px] p-2">
              
              {/* App Bar */}
              <div className="px-4 py-3 flex items-center justify-between border-b border-[#F5F5F7]">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-2xl bg-[#107C41] text-[#FFFFFF] flex items-center justify-center font-bold text-sm shadow-sm">
                    KM
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1D1D1F] leading-tight">KissanMart</h3>
                    <span className="text-xs text-[#86868B] block">Sovereign Agri App</span>
                  </div>
                </div>

                {currentScreen !== "home" && (
                  <button
                    onClick={() => setCurrentScreen("home")}
                    className="text-xs font-semibold bg-[#F5F5F7] px-3 py-1.5 rounded-full text-[#1D1D1F] hover:bg-[#EBEBEF]"
                  >
                    {t.home}
                  </button>
                )}
              </div>

              {/* SCREEN 1: APP HOMEPAGE */}
              {currentScreen === "home" && (
                <div className="p-4 flex-1 space-y-5">
                  
                  {/* Farmer Account Greeting Banner */}
                  <div className="bg-[#F5F5F7] rounded-3xl p-5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#86868B] block font-medium">{t.welcome}</span>
                      <h4 className="text-lg font-bold text-[#1D1D1F] mt-0.5">{farmerData.name}</h4>
                      <span className="text-xs font-mono text-[#107C41] mt-1 block font-semibold">{farmerData.kccNumber}</span>
                    </div>
                    <div className="h-11 w-11 rounded-2xl bg-[#FFFFFF] shadow-sm flex items-center justify-center text-xl">
                      🌾
                    </div>
                  </div>

                  {/* PRIMARY ACTION WITH GAME-STYLE TUTORIAL ARROW */}
                  <div className="relative">
                    {showTutorial && (
                      <div className="absolute -top-7 right-6 z-20 flex items-center gap-1.5 text-xs font-bold text-[#107C41] animate-bounce">
                        <span>Tap here to start</span>
                        <ArrowDown className="h-4 w-4 stroke-[3]" />
                      </div>
                    )}

                    <div 
                      onClick={() => setCurrentScreen("aadhaar-scan")}
                      className={`cursor-pointer rounded-3xl p-5 bg-[#F0FDF4] border-2 border-[#107C41] hover:bg-[#E8F5E9] transition transform hover:scale-[1.01] shadow-sm ${
                        showTutorial ? "ring-4 ring-[#107C41]/20" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-[#107C41] text-[#FFFFFF] flex items-center justify-center shrink-0 shadow">
                          <PlusCircle className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-[#1D1D1F]">{t.startBid}</h4>
                          <p className="text-xs text-[#86868B] mt-1 leading-snug">{t.startBidSub}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Auction Bar */}
                  <div 
                    onClick={() => setCurrentScreen("auction-live")}
                    className="cursor-pointer bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl p-4 hover:bg-[#F5F5F7] flex items-center justify-between transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#107C41] animate-ping" />
                      <span className="text-sm font-bold text-[#107C41]">{t.liveAuctions} (1 Batch Active)</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-[#86868B]" />
                  </div>

                  {/* Quick Services Grid */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider block px-1">
                      {t.quickActions}
                    </span>

                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        onClick={() => setCurrentScreen("mandi-rates")}
                        className="cursor-pointer bg-[#F5F5F7] rounded-2xl p-4 hover:bg-[#EBEBEF] space-y-2 transition"
                      >
                        <TrendingUp className="h-5 w-5 text-[#107C41]" />
                        <h5 className="text-sm font-bold text-[#1D1D1F]">{t.checkMandi}</h5>
                        <span className="text-xs text-[#86868B] block">{t.checkMandiSub}</span>
                      </div>

                      <div 
                        onClick={() => setCurrentScreen("wallet")}
                        className="cursor-pointer bg-[#F5F5F7] rounded-2xl p-4 hover:bg-[#EBEBEF] space-y-2 transition"
                      >
                        <Wallet className="h-5 w-5 text-[#107C41]" />
                        <h5 className="text-sm font-bold text-[#1D1D1F]">{t.eRupiWallet}</h5>
                        <span className="text-xs font-bold text-[#107C41] block">{t.walletBal}</span>
                      </div>

                      <div className="bg-[#F5F5F7] rounded-2xl p-4 space-y-2">
                        <Truck className="h-5 w-5 text-[#1D1D1F]" />
                        <h5 className="text-sm font-bold text-[#1D1D1F]">{t.transporter}</h5>
                        <span className="text-xs text-[#86868B] block">{t.transporterSub}</span>
                      </div>

                      <div className="bg-[#F5F5F7] rounded-2xl p-4 space-y-2">
                        <PhoneCall className="h-5 w-5 text-[#1D1D1F]" />
                        <h5 className="text-sm font-bold text-[#1D1D1F]">Call Center</h5>
                        <span className="text-xs text-[#86868B] block">1800-180-1551</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* SCREEN: AADHAAR CARD PIC CLICK & SCAN SIMULATION */}
              {currentScreen === "aadhaar-scan" && (
                <div className="p-5 flex-1 flex flex-col justify-between space-y-5 animate-in fade-in">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-bold text-[#1D1D1F]">{t.step1Title}</h4>
                      <p className="text-xs text-[#86868B] mt-1">{t.step1Sub}</p>
                    </div>

                    {/* Tutorial Arrow for Camera Box */}
                    <div className="relative">
                      {showTutorial && !aadhaarScanned && (
                        <div className="absolute -top-7 right-8 z-20 flex items-center gap-1.5 text-xs font-bold text-[#107C41] animate-bounce">
                          <span>Tap card to scan photo</span>
                          <ArrowDown className="h-4 w-4 stroke-[3]" />
                        </div>
                      )}

                      <div 
                        onClick={handleAadhaarScan}
                        className={`cursor-pointer rounded-3xl border-2 border-dashed p-6 text-center transition flex flex-col items-center justify-center min-h-[190px] ${
                          aadhaarScanned 
                            ? "border-[#107C41] bg-[#F0FDF4]" 
                            : "border-[#D2D2D7] bg-[#F5F5F7] hover:border-[#107C41]"
                        }`}
                      >
                        {isScanning ? (
                          <div className="space-y-3">
                            <div className="h-10 w-10 mx-auto rounded-full border-3 border-[#107C41] border-t-transparent animate-spin" />
                            <p className="text-sm font-bold text-[#107C41]">{t.scanning}</p>
                          </div>
                        ) : aadhaarScanned ? (
                          <div className="space-y-2">
                            <CheckCircle2 className="h-11 w-11 text-[#107C41] mx-auto" />
                            <p className="text-sm font-bold text-[#107C41]">Aadhaar Card Verified On-Chain</p>
                            <span className="text-xs font-mono text-[#86868B]">DigiLocker Attestation Verified</span>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="h-12 w-12 rounded-full bg-[#FFFFFF] shadow-sm flex items-center justify-center text-[#107C41] mx-auto">
                              <Camera className="h-6 w-6" />
                            </div>
                            <div>
                              <span className="text-sm font-bold text-[#1D1D1F] block">{t.scanCardBtn}</span>
                              <span className="text-xs text-[#86868B] mt-0.5 block">Tap to simulate photo click & OCR</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {aadhaarScanned && (
                      <div className="rounded-2xl border border-[#E5E5EA] p-4 text-xs space-y-2 bg-[#F5F5F7] font-mono">
                        <div className="flex justify-between border-b border-[#E5E5EA] pb-1.5">
                          <span className="text-[#86868B]">{t.name}:</span>
                          <span className="font-bold text-[#1D1D1F]">{farmerData.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#E5E5EA] pb-1.5">
                          <span className="text-[#86868B]">{t.aadhaar}:</span>
                          <span className="font-bold text-[#107C41]">{farmerData.aadhaarNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#86868B]">{t.kcc}:</span>
                          <span className="font-bold text-[#1D1D1F]">{farmerData.kccNumber}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setCurrentScreen("home")}
                      className="px-5 py-3 text-xs font-bold rounded-2xl bg-[#F5F5F7] text-[#1D1D1F]"
                    >
                      Back
                    </button>
                    <button
                      disabled={!aadhaarScanned}
                      onClick={() => setCurrentScreen("address-select")}
                      className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider rounded-2xl transition shadow-md ${
                        aadhaarScanned
                          ? "bg-[#107C41] text-[#FFFFFF] hover:bg-[#0E6B37]"
                          : "bg-[#E5E5EA] text-[#86868B] cursor-not-allowed"
                      }`}
                    >
                      {t.next}
                    </button>
                  </div>
                </div>
              )}

              {/* SCREEN: ADDRESS SELECTION (GPS vs Manual) */}
              {currentScreen === "address-select" && (
                <div className="p-5 flex-1 flex flex-col justify-between space-y-5 animate-in fade-in">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-bold text-[#1D1D1F]">{t.step2Title}</h4>
                      <p className="text-xs text-[#86868B] mt-1">{t.step2Sub}</p>
                    </div>

                    {/* GPS Option */}
                    <div
                      onClick={handleGpsSelect}
                      className={`cursor-pointer rounded-2xl p-4 border transition ${
                        addressMode === "gps"
                          ? "border-[#107C41] bg-[#F0FDF4] shadow-sm"
                          : "border-[#E5E5EA] bg-[#FFFFFF]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#107C41] text-[#FFFFFF] flex items-center justify-center shrink-0 shadow-sm">
                          <Navigation className="h-5 w-5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-[#1D1D1F]">{t.gpsOpt}</h5>
                          <span className="text-xs text-[#86868B]">
                            {gpsLoading ? t.gpsLoading : t.gpsSub}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Manual Option */}
                    <div
                      onClick={() => setAddressMode("manual")}
                      className={`cursor-pointer rounded-2xl p-4 border transition ${
                        addressMode === "manual"
                          ? "border-[#107C41] bg-[#F0FDF4] shadow-sm"
                          : "border-[#E5E5EA] bg-[#FFFFFF]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#F5F5F7] text-[#1D1D1F] flex items-center justify-center shrink-0">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-[#1D1D1F]">{t.manualOpt}</h5>
                          <span className="text-xs text-[#86868B]">Type village or mandi yard</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#86868B] uppercase">{t.addrLabel}</label>
                      <textarea
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full rounded-2xl border border-[#E5E5EA] p-3 text-xs font-medium focus:border-[#107C41] outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setCurrentScreen("aadhaar-scan")}
                      className="px-5 py-3 text-xs font-bold rounded-2xl bg-[#F5F5F7]"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentScreen("create-lot")}
                      className="flex-1 py-3.5 text-xs font-bold uppercase tracking-wider rounded-2xl bg-[#107C41] text-[#FFFFFF] hover:bg-[#0E6B37] shadow-md"
                    >
                      {t.confirmAddr}
                    </button>
                  </div>
                </div>
              )}

              {/* SCREEN: CROP LOT & FLOOR PRICE (No moisture sensor) */}
              {currentScreen === "create-lot" && (
                <div className="p-5 flex-1 flex flex-col justify-between space-y-5 animate-in fade-in">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-bold text-[#1D1D1F]">{t.step3Title}</h4>
                      <p className="text-xs text-[#86868B] mt-1">{t.step3Sub}</p>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#86868B] uppercase">{t.cropLabel}</label>
                      <select
                        value={crop}
                        onChange={(e) => setCrop(e.target.value)}
                        className="w-full rounded-2xl border border-[#E5E5EA] p-3 text-xs font-bold focus:border-[#107C41] outline-none mt-1.5 bg-[#FFFFFF]"
                      >
                        <option value="गेहूं / Sharbati Premium Wheat">गेहूं / Wheat - Sharbati Premium</option>
                        <option value="प्याज़ / Nashik Red Onion">प्याज़ / Onion - Nashik Bellary</option>
                        <option value="सोयाबीन / Yellow Soybean">सोयाबीन / Soybean - Certified JS-9560</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#86868B] uppercase">{t.qtyLabel}</label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full rounded-2xl border border-[#E5E5EA] p-3 text-sm font-mono font-bold mt-1.5 outline-none bg-[#FFFFFF]"
                      />
                    </div>

                    {/* Farmer Floor Price */}
                    <div>
                      <label className="text-xs font-bold text-[#86868B] uppercase">{t.floorLabel}</label>
                      <div className="relative mt-1.5">
                        <span className="absolute left-3 top-3 text-sm font-bold text-[#86868B]">₹</span>
                        <input
                          type="number"
                          value={farmerFloorAsk}
                          onChange={(e) => setFarmerFloorAsk(Number(e.target.value))}
                          className="w-full rounded-2xl border border-[#E5E5EA] p-3 pl-8 text-base font-mono font-bold text-[#107C41] outline-none bg-[#FFFFFF]"
                        />
                      </div>
                    </div>

                    {/* Python ML Benchmark */}
                    <div className="rounded-2xl border border-[#107C41] p-4 bg-[#F0FDF4] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#107C41] flex items-center gap-1.5">
                          <Cpu className="h-4 w-4" /> {t.mlSuggested}
                        </span>
                        <button
                          onClick={handleComputeML}
                          disabled={isComputingML}
                          className="text-xs font-bold bg-[#107C41] text-[#FFFFFF] px-3 py-1 rounded-full shadow-sm"
                        >
                          {isComputingML ? t.mlRunning : t.calcML}
                        </button>
                      </div>

                      <div className="flex items-baseline justify-between pt-1">
                        <span className="text-2xl font-mono font-bold text-[#107C41]">
                          ₹{mlSuggestedFloor} <span className="text-xs font-normal text-[#86868B]">/Qtl</span>
                        </span>
                        <span className="text-xs font-bold text-[#107C41]">{t.aboveMsp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setCurrentScreen("address-select")}
                      className="px-5 py-3 text-xs font-bold rounded-2xl bg-[#F5F5F7]"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentScreen("auction-live")}
                      className="flex-1 py-3.5 text-xs font-bold uppercase tracking-wider rounded-2xl bg-[#107C41] text-[#FFFFFF] hover:bg-[#0E6B37] shadow-md"
                    >
                      {t.publishAuction}
                    </button>
                  </div>
                </div>
              )}

              {/* SCREEN: LIVE AUCTION SCREEN (Shows live bids from corporate buyers) */}
              {currentScreen === "auction-live" && (
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 animate-in fade-in">
                  <div className="space-y-4">
                    
                    {/* Top Auction Meta */}
                    <div className="flex items-center justify-between border-b border-[#E5E5EA] pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-[#107C41] flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {t.auctionTitle}
                        </h4>
                        <span className="text-xs font-mono text-[#86868B]">Lot #KM-PB-2026-8941</span>
                      </div>
                      <span className="text-xs font-bold bg-[#F5F5F7] text-[#107C41] px-3 py-1 rounded-full border border-[#107C41]">
                        {t.timeLeft}
                      </span>
                    </div>

                    {/* Winning Leading Bid Box */}
                    <div className="rounded-3xl border-2 border-[#107C41] p-5 bg-[#F0FDF4] text-center space-y-2 shadow-sm">
                      <span className="text-xs uppercase font-bold text-[#86868B] tracking-wider block">
                        {t.topOffer}
                      </span>
                      <div className="text-3xl font-mono font-bold text-[#107C41]">
                        ₹{winningBid.bidPerQtl}
                        <span className="text-sm font-normal text-[#86868B]"> /Qtl</span>
                      </div>

                      <div className="pt-2 border-t border-[#107C41]/20 text-xs flex justify-between items-center text-[#1D1D1F]">
                        <div className="text-left">
                          <span className="text-[#86868B] text-xs block">{t.totalConsignment}</span>
                          <span className="font-bold text-[#107C41] text-sm font-mono">
                            ₹{(winningBid.bidPerQtl * quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[#86868B] text-xs block">{t.escrowLocked}</span>
                          <span className="font-bold text-[#107C41] font-mono text-xs flex items-center justify-end gap-1">
                            <Lock className="h-3.5 w-3.5" />
                            100% Escrow
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Corporate Bidders Feed */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-[#86868B] px-1">
                        <span>{t.biddersList} ({bidders.length})</span>
                        <span className="text-xs font-mono text-[#107C41]">Live Stream</span>
                      </div>

                      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                        {bidders.map((b, idx) => (
                          <div
                            key={b.id}
                            className={`p-3 rounded-2xl border text-xs flex items-center justify-between transition ${
                              idx === 0
                                ? "border-[#107C41] bg-[#F0FDF4] shadow-sm"
                                : "border-[#E5E5EA] bg-[#FFFFFF]"
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[#1D1D1F] text-xs">{b.buyerName}</span>
                                {idx === 0 && (
                                  <span className="bg-[#107C41] text-[#FFFFFF] text-[9px] px-1.5 py-0.2 rounded font-bold">
                                    TOP
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-[#86868B] block mt-0.5">
                                {b.buyerType} • {b.time}
                              </span>
                            </div>

                            <div className="text-right">
                              <span className="font-mono font-bold text-sm text-[#107C41] block">
                                ₹{b.bidPerQtl}/Qtl
                              </span>
                              <span className="text-[10px] text-[#107C41] font-semibold flex items-center justify-end gap-1">
                                <ShieldCheck className="h-3 w-3" /> Escrow Backed
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Accept Bid Button -> Goes to ESCROW HELD */}
                  <div className="relative">
                    {showTutorial && (
                      <div className="absolute -top-7 right-10 z-20 flex items-center gap-1.5 text-xs font-bold text-[#107C41] animate-bounce">
                        <span>Click to accept leading bid</span>
                        <ArrowDown className="h-4 w-4 stroke-[3]" />
                      </div>
                    )}

                    <button
                      onClick={() => handleAcceptBid(winningBid)}
                      className="w-full py-4 text-xs font-bold uppercase tracking-wider rounded-2xl bg-[#107C41] hover:bg-[#0E6B37] text-[#FFFFFF] shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <Lock className="h-4 w-4" />
                      <span>{t.acceptBidBtn}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* SCREEN: ESCROW HELD (Payment will NOT release until buyer inspects) */}
              {currentScreen === "escrow-held" && (
                <div className="p-5 flex-1 flex flex-col justify-between space-y-5 animate-in fade-in">
                  <div className="space-y-4 text-center">
                    
                    <div className="h-14 w-14 mx-auto rounded-3xl bg-[#F0FDF4] border-2 border-[#107C41] text-[#107C41] flex items-center justify-center font-bold shadow-sm">
                      <Lock className="h-7 w-7" />
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-[#107C41]">
                        {t.escrowHeldTitle}
                      </h4>
                      <p className="text-xs text-[#86868B] mt-1.5 leading-relaxed">
                        {t.escrowHeldSub.replace("{{amount}}", ((acceptedBid?.bidPerQtl || 3180) * quantity).toLocaleString("en-IN"))}
                      </p>
                    </div>

                    {/* Escrow Details */}
                    <div className="rounded-2xl border border-[#E5E5EA] p-4 text-left font-mono text-xs space-y-2 bg-[#F5F5F7]">
                      <div className="flex justify-between">
                        <span className="text-[#86868B]">Winning Buyer:</span>
                        <span className="font-bold text-[#1D1D1F]">{acceptedBid?.buyerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#86868B]">Escrow Vault Locked:</span>
                        <span className="font-bold text-[#107C41]">
                          ₹{((acceptedBid?.bidPerQtl || 3180) * quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#86868B]">Escrow Protocol:</span>
                        <span className="text-[#1D1D1F] font-semibold">2-Party Release Protocol</span>
                      </div>
                    </div>

                    {/* Gate-Pass QR */}
                    <div className="rounded-2xl border border-[#E5E5EA] p-3.5 flex items-center gap-3 text-left bg-[#FFFFFF]">
                      <QrCode className="h-12 w-12 text-[#107C41] shrink-0" />
                      <div className="text-xs">
                        <span className="font-bold text-[#1D1D1F] block">{t.dispatchMandiPass}</span>
                        <span className="text-[#86868B] text-xs">
                          Pass authorized for truck transport dispatch.
                        </span>
                      </div>
                    </div>

                    {/* Game-style arrow directing user to Buyer Portal */}
                    <div className="relative pt-2">
                      {showTutorial && (
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 text-xs font-bold text-[#107C41] animate-bounce">
                          <span>Next Step: Inspect & Release from Buyer Portal</span>
                          <ArrowDown className="h-4 w-4 stroke-[3]" />
                        </div>
                      )}

                      <button
                        onClick={() => setActivePortal("buyer")}
                        className="w-full py-3.5 text-xs font-bold uppercase tracking-wider rounded-2xl bg-[#1D1D1F] text-[#FFFFFF] hover:bg-[#000000] flex items-center justify-center gap-2 shadow-md"
                      >
                        <Building className="h-4 w-4 text-[#107C41]" />
                        <span>{t.switchToBuyerCTA}</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentScreen("home")}
                    className="w-full py-3 text-xs font-semibold rounded-2xl border border-[#E5E5EA] text-[#1D1D1F]"
                  >
                    {t.backHome}
                  </button>
                </div>
              )}

              {/* SCREEN: PAYOUT RELEASED (After Buyer Confirms) */}
              {currentScreen === "payout-success" && (
                <div className="p-5 flex-1 flex flex-col justify-between space-y-5 animate-in zoom-in-95">
                  <div className="space-y-4 text-center">
                    
                    <div className="h-16 w-16 mx-auto rounded-3xl bg-[#F0FDF4] border-2 border-[#107C41] text-[#107C41] flex items-center justify-center font-bold shadow-sm">
                      <Check className="h-8 w-8 stroke-[3]" />
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-[#107C41]">
                        {t.successTitle}
                      </h4>
                      <p className="text-xs text-[#86868B] mt-1.5 leading-relaxed">
                        {t.successSub}
                      </p>
                    </div>

                    {/* Payout Details */}
                    <div className="rounded-2xl border border-[#E5E5EA] p-4 text-left font-mono text-xs space-y-2 bg-[#F5F5F7]">
                      <div className="flex justify-between">
                        <span className="text-[#86868B]">Buyer:</span>
                        <span className="font-bold text-[#1D1D1F]">{acceptedBid?.buyerName || "ITC Sourcing"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#86868B]">Net Payment:</span>
                        <span className="font-bold text-[#107C41]">
                          ₹{((acceptedBid?.bidPerQtl || 3180) * quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#86868B]">Payment Rail:</span>
                        <span className="font-bold text-[#1D1D1F]">Direct e-RUPI / SBI DBT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#86868B]">Fabric Block:</span>
                        <span className="text-[#107C41]">#489,235 (Verified)</span>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="rounded-2xl border border-[#E5E5EA] p-3.5 flex items-center gap-3 text-left bg-[#FFFFFF]">
                      <QrCode className="h-12 w-12 text-[#107C41] shrink-0" />
                      <div className="text-xs">
                        <span className="font-bold text-[#1D1D1F] block">{t.gatepassTitle}</span>
                        <span className="text-[#86868B] text-xs">{t.gatepassSub}</span>
                      </div>
                    </div>

                  </div>

                  <button
                    onClick={() => setCurrentScreen("home")}
                    className="w-full py-3.5 text-xs font-bold uppercase tracking-wider rounded-2xl bg-[#107C41] text-[#FFFFFF] shadow-md"
                  >
                    {t.backHome}
                  </button>
                </div>
              )}

              {/* SCREEN: LIVE MANDI SPOT RATES */}
              {currentScreen === "mandi-rates" && (
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="border-b border-[#E5E5EA] pb-3 flex justify-between items-center">
                      <h4 className="text-sm font-bold text-[#107C41] uppercase">Agmarknet Live Rates</h4>
                      <span className="text-xs font-mono text-[#86868B]">Pan-India</span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      {[
                        { mandi: "Khanna Grain Market (Punjab)", crop: "Wheat Sharbati", rate: "₹2,820", trend: "+₹45" },
                        { mandi: "Lasalgaon Mandi (Maharashtra)", crop: "Red Onion Export", rate: "₹2,640", trend: "+₹80" },
                        { mandi: "Sehore Krishi Mandi (MP)", crop: "Yellow Soybean", rate: "₹4,890", trend: "+₹30" },
                        { mandi: "Guntur Mirchi Yard (AP)", crop: "Teja Red Chilli", rate: "₹21,800", trend: "+₹250" },
                      ].map((m, idx) => (
                        <div key={idx} className="p-3 rounded-2xl bg-[#F5F5F7] flex justify-between items-center">
                          <div>
                            <p className="font-bold text-[#1D1D1F] text-xs">{m.mandi}</p>
                            <span className="text-xs text-[#86868B]">{m.crop}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-mono font-bold text-[#107C41] text-sm block">{m.rate}/Qtl</span>
                            <span className="text-xs text-[#107C41] font-semibold">{m.trend}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentScreen("home")}
                    className="w-full py-3 text-xs font-semibold rounded-2xl bg-[#F5F5F7]"
                  >
                    Back to Dashboard
                  </button>
                </div>
              )}

              {/* SCREEN: WALLET BALANCE */}
              {currentScreen === "wallet" && (
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="border-b border-[#E5E5EA] pb-3">
                      <h4 className="text-sm font-bold text-[#107C41] uppercase">Kisan e-RUPI Wallet</h4>
                      <span className="text-xs text-[#86868B]">SBI Account ••••••4812</span>
                    </div>

                    <div className="rounded-3xl border border-[#107C41] bg-[#F0FDF4] p-5 text-center space-y-2 shadow-sm">
                      <span className="text-xs uppercase font-bold text-[#86868B]">Available Settled Balance</span>
                      <div className="text-3xl font-mono font-bold text-[#107C41]">
                        ₹4,45,200
                      </div>
                      <span className="text-xs text-[#107C41] font-semibold block">100% Zero-Commission DBT</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <span className="font-bold text-[#86868B] text-xs uppercase">Recent Settlements</span>
                      <div className="p-3 rounded-2xl bg-[#F5F5F7] flex justify-between items-center">
                        <div>
                          <p className="font-bold text-[#1D1D1F]">Lot KM-PB-2026-8941</p>
                          <span className="text-xs text-[#86868B]">ITC Procurement</span>
                        </div>
                        <span className="font-mono font-bold text-[#107C41] text-sm">+₹3,81,600</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentScreen("home")}
                    className="w-full py-3 text-xs font-semibold rounded-2xl bg-[#F5F5F7]"
                  >
                    Back to Dashboard
                  </button>
                </div>
              )}

              {/* Bottom Home Indicator */}
              <div className="p-2 flex justify-center">
                <div className="h-1 w-28 rounded-full bg-[#E5E5EA]" />
              </div>

            </div>
          </div>
        </main>
      )}

      {/* VIEWPORT 2: SPACIOUS CORPORATE BUYER CONSOLE (Apple-Inspired Architecture) */}
      {activePortal === "buyer" && (
        <main className="max-w-4xl mx-auto w-full my-auto py-8 animate-in fade-in">
          
          {/* Top Clean Header */}
          <div className="pb-6 mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E5EA]">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-[#107C41] text-[#FFFFFF] flex items-center justify-center font-bold text-sm shadow-sm">
                  B
                </div>
                <h3 className="text-xl font-bold text-[#1D1D1F]">Corporate Buyer Console</h3>
                <span className="text-xs bg-[#F0FDF4] text-[#107C41] border border-[#107C41] px-3 py-1 rounded-full font-mono font-semibold">
                  Escrow Rail
                </span>
              </div>
              <p className="text-sm text-[#86868B] mt-1.5">
                Place corporate bids on farmer crop lots. Bids immediately appear on farmer app in real-time.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5E5EA] p-4 bg-[#F5F5F7] text-right font-mono">
              <span className="text-xs text-[#86868B] uppercase block font-medium">Your Escrow Vault Collateral</span>
              <span className="text-base font-bold text-[#107C41]">₹45,00,000 (SBI Collateralized)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Box 1: TARGET CROP LOT & PLACE BID */}
            <div className="rounded-3xl border border-[#E5E5EA] bg-[#FFFFFF] p-6 space-y-5 shadow-sm">
              <div className="border-b border-[#E5E5EA] pb-3 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-[#107C41] uppercase tracking-wider block">Live Auction Target</span>
                  <h4 className="text-base font-bold text-[#1D1D1F] mt-0.5">{crop}</h4>
                </div>
                <span className="text-sm font-mono text-[#86868B] font-semibold">{quantity} Quintals</span>
              </div>

              {/* Lot Specs */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="rounded-2xl border border-[#E5E5EA] p-3 bg-[#F5F5F7]">
                  <span className="text-xs text-[#86868B] block">Farmer Reserve Ask</span>
                  <span className="font-bold text-[#1D1D1F] text-sm mt-0.5 block">₹{farmerFloorAsk}/Qtl</span>
                </div>
                <div className="rounded-2xl border border-[#E5E5EA] p-3 bg-[#F5F5F7]">
                  <span className="text-xs text-[#86868B] block">Python ML Benchmark</span>
                  <span className="font-bold text-[#107C41] text-sm mt-0.5 block">₹{mlSuggestedFloor}/Qtl</span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E5EA] p-3 text-xs">
                <span className="text-xs text-[#86868B] block font-mono">Pickup Origin:</span>
                <span className="text-[#1D1D1F] font-medium text-xs mt-0.5 block">{address}</span>
              </div>

              {/* BID INPUT FORM WITH GAME-STYLE TUTORIAL ARROW */}
              <div className="border-t border-[#E5E5EA] pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-bold uppercase tracking-wider text-[#1D1D1F]">Place New Bid</h5>
                  {showTutorial && (
                    <span className="text-xs font-bold text-[#107C41] flex items-center gap-1 animate-pulse">
                      <span>Test bid submission</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-[#86868B] uppercase block">Your Corporate Entity Name</label>
                  <input
                    type="text"
                    value={buyerNameInput}
                    onChange={(e) => setBuyerNameInput(e.target.value)}
                    className="w-full rounded-2xl border border-[#E5E5EA] p-3 text-sm font-medium focus:border-[#107C41] outline-none mt-1.5"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#86868B] uppercase block">Your Bid Price (₹ / Quintal)</label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3.5 top-3 text-sm font-bold text-[#86868B]">₹</span>
                    <input
                      type="number"
                      value={customBuyerBid}
                      onChange={(e) => setCustomBuyerBid(Number(e.target.value))}
                      className="w-full rounded-2xl border border-[#E5E5EA] p-3 pl-8 text-base font-mono font-bold text-[#107C41] focus:border-[#107C41] outline-none"
                    />
                  </div>
                  <span className="text-xs text-[#86868B] block mt-1.5 font-mono">
                    Total consignment value: ₹{(customBuyerBid * quantity).toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  onClick={handleBuyerSubmitBid}
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider rounded-2xl bg-[#107C41] hover:bg-[#0E6B37] text-[#FFFFFF] flex items-center justify-center gap-2 transition shadow-md"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Bid to Farmer App</span>
                </button>

                {bidSubmittedToast && (
                  <div className="p-3 rounded-2xl bg-[#F0FDF4] border border-[#107C41] text-[#107C41] text-xs text-center font-semibold animate-in zoom-in-95">
                    ✓ Bid broadcasted! Switch back to Farmer App to see it live.
                  </div>
                )}
              </div>
            </div>

            {/* Box 2: ESCROW CLEARING & CONFIRMATION PROTOCOL */}
            <div className="rounded-3xl border border-[#E5E5EA] bg-[#FFFFFF] p-6 space-y-5 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="border-b border-[#E5E5EA] pb-3">
                  <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider block">Security Rule</span>
                  <h4 className="text-base font-bold text-[#1D1D1F] mt-0.5">Escrow Release Protocol</h4>
                </div>

                <p className="text-xs text-[#86868B] leading-relaxed">
                  Payment will <strong>NEVER</strong> leave escrow until you receive the truck at your warehouse, inspect the consignment weight & quality, and click release below.
                </p>

                {/* 3-Step Simple Progress */}
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="rounded-2xl border border-[#E5E5EA] p-3 flex items-center justify-between bg-[#F5F5F7]">
                    <span>1. Farmer Accepts Bid</span>
                    <span className="text-[#107C41] font-bold">✓ 100% Locked in Escrow</span>
                  </div>

                  <div className={`rounded-2xl border p-3 flex items-center justify-between transition ${
                    currentScreen === "escrow-held"
                      ? "border-[#107C41] bg-[#F0FDF4] font-bold text-[#107C41] shadow-sm"
                      : "border-[#E5E5EA] text-[#86868B]"
                  }`}>
                    <span>2. Truck Delivery & Gate Inspection</span>
                    <span>{currentScreen === "escrow-held" ? "Active Now" : "Pending"}</span>
                  </div>

                  <div className={`rounded-2xl border p-3 flex items-center justify-between transition ${
                    buyerInspected
                      ? "border-[#107C41] bg-[#F0FDF4] font-bold text-[#107C41] shadow-sm"
                      : "border-[#E5E5EA] text-[#86868B]"
                  }`}>
                    <span>3. Release Payment to Farmer</span>
                    <span>{buyerInspected ? "Released" : "Pending"}</span>
                  </div>
                </div>

                {/* Status Notice */}
                <div className="rounded-2xl border border-[#E5E5EA] p-4 text-xs bg-[#F5F5F7] space-y-1.5">
                  <span className="text-xs text-[#86868B] uppercase block font-bold">Inspection Status:</span>
                  <p className="text-xs text-[#1D1D1F]">
                    {currentScreen === "escrow-held"
                      ? `Consignment from ${farmerData.name} (${quantity} Qtl) arrived. Ready for inspection.`
                      : "Awaiting farmer to accept your bid on the farmer app."}
                  </p>
                </div>
              </div>

              {/* ACTION: Confirm Quality & Release Escrow with Guidance Arrow */}
              <div className="space-y-3 pt-3 border-t border-[#E5E5EA]">
                <div className="relative">
                  {showTutorial && currentScreen === "escrow-held" && !isConfirmingRelease && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 text-xs font-bold text-[#107C41] animate-bounce">
                      <span>Click to confirm quality & release payment</span>
                      <ArrowDown className="h-4 w-4 stroke-[3]" />
                    </div>
                  )}

                  <button
                    disabled={currentScreen !== "escrow-held" || isConfirmingRelease}
                    onClick={handleBuyerReleaseEscrow}
                    className={`w-full py-4 text-xs font-bold uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition shadow-md ${
                      currentScreen === "escrow-held" && !isConfirmingRelease
                        ? "bg-[#107C41] hover:bg-[#0E6B37] text-[#FFFFFF] cursor-pointer"
                        : "bg-[#E5E5EA] text-[#86868B] cursor-not-allowed"
                    }`}
                  >
                    {isConfirmingRelease ? (
                      <span>Releasing Escrow on Hyperledger...</span>
                    ) : (
                      <>
                        <CheckCheck className="h-4 w-4" />
                        <span>Confirm Quality & Release ₹{((acceptedBid?.bidPerQtl || customBuyerBid) * quantity).toLocaleString("en-IN")} Escrow</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={() => setActivePortal("farmer")}
                  className="w-full py-3 text-xs font-semibold rounded-2xl border border-[#E5E5EA] text-[#1D1D1F] hover:bg-[#F5F5F7] transition"
                >
                  Switch Back to Farmer App
                </button>
              </div>

            </div>

          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="text-center text-xs text-[#86868B] py-3 border-t border-[#E5E5EA] mt-6 font-mono">
        KISSANMART • DECENTRALIZED AGRICULTURAL ESCROW PROTOCOL • POWERED BY HYPERLEDGER FABRIC
      </footer>

    </div>
  )
}
