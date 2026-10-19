"use client"

import React, { useState, useEffect } from "react"
import { 
  Smartphone, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  Cpu, 
  ArrowRight, 
  Sparkles, 
  Coins, 
  QrCode,
  FileBadge,
  RotateCcw,
  Volume2
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function FarmerMobileSimulator() {
  const [step, setStep] = useState<number>(1)
  const [language, setLanguage] = useState<"en" | "hi" | "pa">("hi")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false)
  const [cropType, setCropType] = useState("गेहूं (Sharbati Wheat)")
  const [quantity, setQuantity] = useState("100")
  const [moisture, setMoisture] = useState("11.5")
  const [mlPrice, setMlPrice] = useState(3050)
  const [activeBids, setActiveBids] = useState([
    { buyer: "Adani Wilmar Agri Hub", bid: 3120, time: "2m ago" },
    { buyer: "ITC e-Choupal Procurement", bid: 3180, time: "45s ago" },
  ])
  const [highestBid, setHighestBid] = useState(3180)
  const [isEscrowSettled, setIsEscrowSettled] = useState(false)

  // Translations dictionary
  const t = {
    en: {
      title: "KissanMart Mobile",
      tagline: "Decentralized Agri Auction & Instant Escrow",
      step1: "1. Farmer KYC",
      step2: "2. Batch & ML Price",
      step3: "3. 24h Live Bidding",
      step4: "4. Escrow & e-RUPI Payout",
      aadhaarLabel: "Aadhaar / Kisan Credit Card No.",
      verifyBtn: "Verify via DigiLocker On-Chain",
      cropLabel: "Select Harvest Crop",
      moistureLabel: "Moisture Sensor Reading (%)",
      calcMlPrice: "Run Python ML Price Prediction",
      suggestedFloor: "AI Recommended Floor Price",
      confidence: "ML Confidence: 98.4% (Multi-Mandi Model)",
      publishLot: "Mint Lot on Hyperledger Fabric",
      activeAuction: "24-Hour Auction Window Active",
      highestOffer: "Current Highest Offer",
      acceptBid: "Accept & Lock Escrow",
      escrowLockedTitle: "Escrow Locked & Payment Disbursed!",
      payoutMsg: "Direct Benefit Transfer / e-RUPI credited instantly to farmer SBI Account without middleman cuts.",
      reset: "Simulate New Harvest Batch",
      audioNote: "Voice Guidance: Listen in Local Dialect"
    },
    hi: {
      title: "किसानमार्ट (KissanMart)",
      tagline: "विकेंद्रीकृत कृषि मंडी व सुरक्षित एस्क्रो भुगतान",
      step1: "१. किसान सत्यापन",
      step2: "२. फसल विवरण व AI भाव",
      step3: "३. २४ घंटे लाइव बोली",
      step4: "४. एस्क्रो भुगतान",
      aadhaarLabel: "आधार / किसान क्रेडिट कार्ड संख्या",
      verifyBtn: "डिजिलॉकर से ऑन-चेन सत्यापित करें",
      cropLabel: "फसल चुनें",
      moistureLabel: "नमी मीटर रीडिंग (%)",
      calcMlPrice: "Python ML एल्गोरिथमिक भाव निकालें",
      suggestedFloor: "AI अनुशंसित न्यूनतम समर्थन मूल्य",
      confidence: "ML विश्वसनीयता: ९८.४% (सटीक मंडी डेटा)",
      publishLot: "Hyperledger ब्लॉकचेन पर लॉट दर्ज करें",
      activeAuction: "२४ घंटे की लाइव नीलामी जारी है",
      highestOffer: "वर्तमान उच्चतम बोली (प्रति क्विंटल)",
      acceptBid: "बोली स्वीकार करें और एस्क्रो लॉक करें",
      escrowLockedTitle: "एस्क्रो लॉक व तुरंत बैंक खाता भुगतान!",
      payoutMsg: "e-RUPI / DBT द्वारा बिना किसी आढ़ती/बिचौलिये के सीधे बैंक खाते में शत-प्रतिशत भुगतान हस्तांतरित।",
      reset: "नई फसल का डेमो शुरू करें",
      audioNote: "ऑडियो सुनें: क्षेत्रीय भाषा में निर्देश"
    },
    pa: {
      title: "ਕਿਸਾਨਮਾਰਟ (KissanMart)",
      tagline: "ਸਿੱਧੀ ਫ਼ਸਲ ਨਿਲਾਮੀ ਅਤੇ ਸੁਰੱਖਿਅਤ ਐਸਕਰੋ ਭੁਗਤਾਨ",
      step1: "੧. ਕਿਸਾਨ ਵੈਰੀਫਿਕੇਸ਼ਨ",
      step2: "੨. ਫਸਲ ਤੇ AI ਭਾਅ",
      step3: "੩. ੨੪ ਘੰਟੇ ਲਾਈਵ ਬੋਲੀ",
      step4: "੪. ਐਸਕਰੋ ਖਾਤਾ ਭੁਗਤਾਨ",
      aadhaarLabel: "ਆਧਾਰ / ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਕਾਰਡ ਨੰਬਰ",
      verifyBtn: "ਡਿਜੀਲੌਕਰ ਰਾਹੀਂ ਚੈੱਕ ਕਰੋ",
      cropLabel: "ਫ਼ਸਲ ਚੁਣੋ",
      moistureLabel: "ਨਮੀ ਮੀਟਰ (%)",
      calcMlPrice: "AI ਐਲਗੋਰਿਦਮਿਕ ਭਾਅ ਲੱਭੋ",
      suggestedFloor: "ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਘੱਟੋ-ਘੱਟ ਕੀਮਤ",
      confidence: "ਸਹੀ ਅੰਦਾਜ਼ਾ: ੯੮.੪%",
      publishLot: "ਬਲਾਕਚੈਨ ਤੇ ਲਾਟ ਦਰਜ ਕਰੋ",
      activeAuction: "੨੪ ਘੰਟੇ ਦੀ ਲਾਈਵ ਬੋਲੀ ਚੱਲ ਰਹੀ ਹੈ",
      highestOffer: "ਸਭ ਤੋਂ ਉੱਚੀ ਬੋਲੀ",
      acceptBid: "ਬੋਲੀ ਮਨਜ਼ੂਰ ਕਰੋ",
      escrowLockedTitle: "ਐਸਕਰੋ ਰਕਮ ਸਿੱਧੇ ਬੈਂਕ ਖਾਤੇ 'ਚ ਜਮ੍ਹਾਂ!",
      payoutMsg: "ਬਿਨਾਂ ਆੜ੍ਹਤੀਏ ਦੇ ਕਟੌਤੀ ਦੇ ਪੂਰਾ ਪੈਸਾ ਸਿੱਧਾ ਕਿਸਾਨ ਦੇ ਖਾਤੇ ਵਿੱਚ।",
      reset: "ਨਵਾਂ ਬੈਚ ਸ਼ੁਰੂ ਕਰੋ",
      audioNote: "ਆਵਾਜ਼ ਸੁਣੋ: ਪੰਜਾਬੀ ਵਿੱਚ"
    }
  }[language]

  // Handlers
  const handleVerify = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setStep(2)
    }, 1200)
  }

  const handleComputeMLPrice = () => {
    setIsCalculatingPrice(true)
    setTimeout(() => {
      setIsCalculatingPrice(false)
      const base = cropType.includes("गेहूं") ? 3050 : cropType.includes("Onion") ? 2600 : 4850
      setMlPrice(base)
      setHighestBid(base + 130)
    }, 1400)
  }

  const handlePublishLot = () => {
    setStep(3)
  }

  const handleAcceptBid = () => {
    setIsEscrowSettled(true)
    setStep(4)
  }

  const handleReset = () => {
    setStep(1)
    setIsEscrowSettled(false)
    setHighestBid(3180)
  }

  return (
    <div className="relative mx-auto flex w-full max-w-sm flex-col rounded-[44px] border-[6px] border-zinc-800 bg-zinc-950 p-2 shadow-2xl shadow-emerald-500/10 ring-1 ring-white/10">
      {/* Phone Notch & Speaker */}
      <div className="relative mb-2 flex items-center justify-between px-6 pt-3">
        <span className="text-[11px] font-semibold text-zinc-400">10:42</span>
        <div className="absolute left-1/2 -translate-x-1/2 top-2 h-4 w-28 rounded-full bg-zinc-800/90 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-emerald-500/70 mr-2 animate-pulse" />
          <div className="h-1.5 w-10 rounded-full bg-zinc-700" />
        </div>
        <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
          <span>5G</span>
          <span className="text-[10px] font-bold">100%</span>
        </div>
      </div>

      {/* Screen Inner Frame */}
      <div className="relative flex flex-col flex-1 overflow-hidden rounded-[34px] bg-zinc-900 border border-zinc-800/80 min-h-[660px]">
        {/* App Topbar */}
        <div className="border-b border-zinc-800/80 bg-zinc-900/90 backdrop-blur px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-zinc-950 font-black shadow-md shadow-emerald-500/20 text-xs">
                KM
              </div>
              <div>
                <h3 className="text-xs font-bold text-zinc-100 flex items-center gap-1">
                  {t.title}
                  <span className="h-1.5 w-15 bg-emerald-400 rounded-full inline-block animate-ping" />
                </h3>
                <p className="text-[9px] text-emerald-400 font-medium">Hyperledger Fabric 2.5</p>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center rounded-lg bg-zinc-800/80 p-0.5 text-[10px]">
              {(["hi", "en", "pa"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-1.5 py-0.5 rounded font-medium transition ${
                    language === lang 
                      ? "bg-emerald-500 text-zinc-950 shadow font-bold" 
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Stepper progress */}
          <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-400">
            <span className={step >= 1 ? "text-emerald-400 font-semibold" : ""}>{t.step1.split(" ")[0]}</span>
            <span className={step >= 2 ? "text-emerald-400 font-semibold" : ""}>{t.step2.split(" ")[0]}</span>
            <span className={step >= 3 ? "text-emerald-400 font-semibold" : ""}>{t.step3.split(" ")[0]}</span>
            <span className={step >= 4 ? "text-emerald-400 font-semibold" : ""}>{t.step4.split(" ")[0]}</span>
          </div>
          <Progress value={(step / 4) * 100} className="h-1 mt-1 bg-zinc-800" />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          
          {/* STEP 1: Farmer Authentication */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Kisan Sovereign ID On-Chain</span>
                </div>
                <p className="mt-1 text-[11px] text-zinc-300 leading-snug">
                  Zero-Knowledge Proof verified identity linked to Indian Land Records & PM-Kisan registry.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-medium text-zinc-300">{t.aadhaarLabel}</label>
                <div className="relative">
                  <input 
                    type="text" 
                    readOnly 
                    value="XXXX - XXXX - 7824 (Sardar Gurpreet S.)"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-xs text-zinc-100 font-mono"
                  />
                  <CheckCircle2 className="absolute right-3 top-2.5 h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1">
                  <span>Mandi: Khanna Grain Yard (PB)</span>
                  <span className="text-emerald-400">KCC Verified</span>
                </div>
              </div>

              <div className="rounded-xl border border-dashed border-zinc-700 p-3 bg-zinc-800/40 text-center">
                <Volume2 className="h-5 w-5 mx-auto text-amber-400 mb-1" />
                <p className="text-[10px] text-amber-300/90 font-medium">
                  {t.audioNote}
                </p>
                <span className="text-[9px] text-zinc-400 mt-0.5 block">ਪੰਜਾਬੀ / हिंदी / English Audio Assistant Ready</span>
              </div>

              <Button
                onClick={handleVerify}
                disabled={isVerifying}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-xs"
              >
                {isVerifying ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 animate-spin" />
                    Connecting Hyperledger MSP...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {t.verifyBtn}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                )}
              </Button>
            </div>
          )}

          {/* STEP 2: Harvest Batch & ML Pricing */}
          {step === 2 && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-zinc-300">{t.cropLabel}</label>
                <select 
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="गेहूं (Sharbati Wheat)">गेहूं / Wheat - Sharbati Premium (A+)</option>
                  <option value="प्याज़ (Nashik Red Onion)">प्याज़ / Onion - Nashik Bellary Export</option>
                  <option value="सोयाबीन (Yellow Soybean)">सोयाबीन / Soybean - JS-9560 Certified</option>
                  <option value="मिर्च (Teja Red Chilli)">मिर्च / Teja Mirchi - Guntur Stemless</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-medium text-zinc-400">Quantity (Quintals)</label>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-100 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-medium text-zinc-400">{t.moistureLabel}</label>
                  <div className="relative mt-1">
                    <input 
                      type="text" 
                      value={moisture}
                      onChange={(e) => setMoisture(e.target.value)}
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-100 font-mono"
                    />
                    <Badge variant="outline" className="absolute right-1.5 top-1 text-[9px] border-emerald-500/40 text-emerald-400 py-0 px-1">
                      Grade A
                    </Badge>
                  </div>
                </div>
              </div>

              {/* ML Price Discovery Box */}
              <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-zinc-900 p-3 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Cpu className="h-4 w-4 text-emerald-400" />
                    <span className="text-[11px] font-bold text-zinc-100">Python ML Price Engine</span>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-300 text-[9px] hover:bg-emerald-500/20 border-emerald-500/30">
                    Live Agmarknet Data
                  </Badge>
                </div>

                <div className="flex items-baseline justify-between mt-1">
                  <div>
                    <span className="text-[10px] text-zinc-400 block">{t.suggestedFloor}</span>
                    <div className="text-xl font-extrabold text-emerald-400 tracking-tight">
                      ₹{mlPrice.toLocaleString("en-IN")}{" "}
                      <span className="text-xs font-normal text-zinc-400">/ क्विंटल</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-400 block">Suggested Cap</span>
                    <span className="text-xs font-semibold text-zinc-200">₹{(mlPrice + 420).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <p className="mt-2 text-[9px] text-zinc-400 border-t border-zinc-800/80 pt-2 flex items-center justify-between">
                  <span>{t.confidence}</span>
                  <span className="text-emerald-400 font-semibold">+6.4% above MSP</span>
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleComputeMLPrice}
                  disabled={isCalculatingPrice}
                  variant="outline"
                  className="flex-1 text-[11px] border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 h-9"
                >
                  {isCalculatingPrice ? "Running XGBoost..." : t.calcMlPrice}
                </Button>
                <Button
                  onClick={handlePublishLot}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-[11px] h-9 shadow-md shadow-emerald-500/20"
                >
                  {t.publishLot}
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: 24h Live Auction Ticker */}
          {step === 3 && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                    <Clock className="h-3.5 w-3.5 animate-spin" />
                    <span>24-Hour Settlement Window</span>
                  </div>
                  <Badge className="bg-amber-500/20 text-amber-300 text-[10px] border-amber-500/30 font-mono">
                    18h : 34m left
                  </Badge>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-400 block">{t.highestOffer}</span>
                    <span className="text-2xl font-black text-white">
                      ₹{highestBid.toLocaleString("en-IN")}
                      <span className="text-xs font-normal text-zinc-400">/Qtl</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 font-medium">Total Lot Value</span>
                    <span className="text-sm font-bold text-emerald-300 font-mono block">
                      ₹{(highestBid * Number(quantity || 100)).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Bids Feed */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-300">
                  <span>Verified Bids Received ({activeBids.length})</span>
                  <span className="text-[9px] text-emerald-400 font-mono">Auto-Escrow Backed</span>
                </div>

                <div className="space-y-1.5">
                  {activeBids.map((b, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs ${
                        idx === 1 
                          ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200" 
                          : "bg-zinc-800/50 border-zinc-800 text-zinc-300"
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-zinc-100 text-[11px]">{b.buyer}</p>
                        <span className="text-[9px] text-zinc-400">{b.time} • GST Verified</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-emerald-400">₹{b.bid}/Qtl</span>
                        <span className="text-[9px] text-zinc-400 block">Escrow Funded</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-1">
                <Button
                  onClick={handleAcceptBid}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-extrabold text-xs py-2.5 rounded-xl shadow-lg shadow-emerald-500/25"
                >
                  <Coins className="h-4 w-4 mr-1.5" />
                  {t.acceptBid}
                </Button>
                <p className="text-[9px] text-center text-zinc-500 mt-1.5">
                  Triggering Golang chaincode invokes instant Smart Escrow lock
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: Escrow & Instant Payout */}
          {step === 4 && (
            <div className="space-y-3.5 animate-in zoom-in-95 duration-300">
              <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-900/30 to-zinc-900 p-4 text-center">
                <div className="h-12 w-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mb-2">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="text-sm font-bold text-zinc-100">{t.escrowLockedTitle}</h4>
                <p className="text-[10px] text-emerald-300 mt-1 leading-relaxed">
                  {t.payoutMsg}
                </p>

                <div className="mt-3 p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-left font-mono text-[10px] space-y-1 text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Fabric Block:</span>
                    <span className="text-emerald-400 font-bold">#489,229</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Lot ID:</span>
                    <span>KM-PB-2026-901</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Settled Amount:</span>
                    <span className="text-white font-bold">₹{(highestBid * Number(quantity || 100)).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Payment Medium:</span>
                    <span className="text-emerald-400">e-RUPI / NPCI Direct</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-800/40 p-2.5 flex items-center gap-3">
                <QrCode className="h-10 w-10 text-emerald-400 bg-zinc-900 p-1.5 rounded-lg border border-zinc-700" />
                <div className="text-[10px]">
                  <p className="font-semibold text-zinc-200">Mandi Gate-Pass Generated</p>
                  <p className="text-zinc-400 text-[9px]">Cold transit fleet authorized for pickup within 6 hrs.</p>
                </div>
              </div>

              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full text-xs border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                {t.reset}
              </Button>
            </div>
          )}

        </div>

        {/* Phone Bottom Home Bar */}
        <div className="p-2 border-t border-zinc-800/60 bg-zinc-950/90 flex justify-center">
          <div className="h-1 w-28 rounded-full bg-zinc-700/80" />
        </div>
      </div>
    </div>
  )
}
