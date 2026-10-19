export interface CropLot {
  id: string
  farmerName: string
  farmerPhone: string
  state: string
  district: string
  mandi: string
  crop: string
  variety: string
  quantityQuintals: number
  moistureContent: number
  grade: "A+" | "A" | "B"
  harvestDate: string
  aiBasePrice: number // ₹/Quintal
  aiUpperCap: number
  currentHighestBid: number
  bidsCount: number
  biddingClosesAt: string // ISO string or relative time
  escrowStatus: "Awaiting Bids" | "Bidding Active" | "Escrow Locked" | "Dispatched" | "Settled"
  fabricTxHash: string
  fabricBlockNumber: number
  storageTemp: string
  aiDemandIndex: number // 0 - 100
  aiPriceTrend: "SURGING" | "STABLE" | "COOLING"
}

export const INITIAL_CROPS: CropLot[] = [
  {
    id: "KM-PB-2026-8941",
    farmerName: "Sardar Gurpreet Singh",
    farmerPhone: "+91 98762 •••••",
    state: "Punjab",
    district: "Ludhiana",
    mandi: "Khanna Grain Market",
    crop: "Sharbati Premium Wheat",
    variety: "HD-3086 Golden",
    quantityQuintals: 140,
    moistureContent: 11.2,
    grade: "A+",
    harvestDate: "18 Oct 2026",
    aiBasePrice: 2850,
    aiUpperCap: 3250,
    currentHighestBid: 3120,
    bidsCount: 14,
    biddingClosesAt: "11 hrs 42 mins",
    escrowStatus: "Bidding Active",
    fabricTxHash: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    fabricBlockNumber: 489210,
    storageTemp: "21.4°C / 42% RH",
    aiDemandIndex: 94,
    aiPriceTrend: "SURGING",
  },
  {
    id: "KM-MH-2026-4412",
    farmerName: "Rameshwar Tukaram Patil",
    farmerPhone: "+91 94231 •••••",
    state: "Maharashtra",
    district: "Nashik",
    mandi: "Lasalgaon Mandi",
    crop: "Red Bellary Onion",
    variety: "Export Grade Garwa",
    quantityQuintals: 220,
    moistureContent: 13.8,
    grade: "A",
    harvestDate: "17 Oct 2026",
    aiBasePrice: 2420,
    aiUpperCap: 2890,
    currentHighestBid: 2750,
    bidsCount: 23,
    biddingClosesAt: "4 hrs 18 mins",
    escrowStatus: "Bidding Active",
    fabricTxHash: "0x9c3114d59a1e0b57e7a83359d9c22e4c274fe92348a129033f2c5d1bb9108b61",
    fabricBlockNumber: 489204,
    storageTemp: "19.8°C / 58% RH",
    aiDemandIndex: 88,
    aiPriceTrend: "SURGING",
  },
  {
    id: "KM-MP-2026-6731",
    farmerName: "Devendra Chouhan",
    farmerPhone: "+91 97554 •••••",
    state: "Madhya Pradesh",
    district: "Sehore",
    mandi: "Sehore Krishi Mandi",
    crop: "Yellow Soybean",
    variety: "JS-9560 Certified",
    quantityQuintals: 95,
    moistureContent: 10.4,
    grade: "A+",
    harvestDate: "19 Oct 2026",
    aiBasePrice: 4680,
    aiUpperCap: 5150,
    currentHighestBid: 4940,
    bidsCount: 9,
    biddingClosesAt: "19 hrs 05 mins",
    escrowStatus: "Bidding Active",
    fabricTxHash: "0x34cbb0e02914d3a033c4f74d014bcde93efb8e217822a101b00ffae9941a2f1b",
    fabricBlockNumber: 489218,
    storageTemp: "23.0°C / 40% RH",
    aiDemandIndex: 79,
    aiPriceTrend: "STABLE",
  },
  {
    id: "KM-AP-2026-2190",
    farmerName: "K. Venkata Raman",
    farmerPhone: "+91 88976 •••••",
    state: "Andhra Pradesh",
    district: "Guntur",
    mandi: "Guntur Mirchi Yard",
    crop: "Teja Red Chilli",
    variety: "Stemless Double S17",
    quantityQuintals: 60,
    moistureContent: 9.6,
    grade: "A+",
    harvestDate: "16 Oct 2026",
    aiBasePrice: 19400,
    aiUpperCap: 22800,
    currentHighestBid: 21950,
    bidsCount: 31,
    biddingClosesAt: "1 hr 12 mins",
    escrowStatus: "Bidding Active",
    fabricTxHash: "0x892a001bcfe3905b1a32cd517782ea2938b8120d3f23498901ae4f128bc18080",
    fabricBlockNumber: 489190,
    storageTemp: "18.0°C / 35% RH",
    aiDemandIndex: 98,
    aiPriceTrend: "SURGING",
  },
]

export const ML_PRICE_METRICS = [
  { factor: "Rainfall Anomaly Index", weight: "24%", impact: "+₹145/Qtl", signal: "Deficit in Central Belt" },
  { factor: "Mandi Inflow Velocity", weight: "28%", impact: "-₹60/Qtl", signal: "Peak Arrival Wave Normalizing" },
  { factor: "FMCG Processing Demand", weight: "22%", impact: "+₹180/Qtl", signal: "ITC / Adani Wilmar RFQs Up 34%" },
  { factor: "Moisture & Grading AI Sensor", weight: "16%", impact: "+₹110/Qtl", signal: "Sub-12% Dry Grade A+ Premium" },
  { factor: "Cold Transit & Fuel Index", weight: "10%", impact: "-₹35/Qtl", signal: "Freight corridor diesel rate stable" },
]

export const FABRIC_CHAINCODE_SNIPPET = `// KissanMart Hyperledger Fabric 2.5 Smart Contract
// Package: org.kissanmart.escrow / chaincode.go
package main

import (
    "encoding/json"
    "fmt"
    "github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type AgriEscrowContract struct {
    contractapi.Contract
}

type CropLot struct {
    LotID        string  \`json:"lotId"\`
    FarmerAadhaarHash string  \`json:"farmerHash"\`
    MLFloorPrice float64 \`json:"mlFloorPrice"\`
    HighestBid   float64 \`json:"highestBid"\`
    WinningBuyer string  \`json:"winningBuyer"\`
    EscrowStatus string  \`json:"escrowStatus"\`
    SettledAt    int64   \`json:"settledAt"\`
}

func (s *AgriEscrowContract) SubmitLotWithMLQuote(
    ctx contractapi.TransactionContextInterface, 
    lotId string, 
    mlFloor float64, 
    qualityScore float64,
) error {
    lot := CropLot{
        LotID: lotId,
        MLFloorPrice: mlFloor,
        EscrowStatus: "AUCTION_24H_ACTIVE",
    }
    lotJSON, _ := json.Marshal(lot)
    return ctx.GetStub().PutState(lotId, lotJSON)
}

func (s *AgriEscrowContract) LockEscrowAndDisburse(
    ctx contractapi.TransactionContextInterface, 
    lotId string, 
    buyerID string, 
    bidAmount float64,
) error {
    // 24hr settlement lock via automated multi-party escrow consensus
    return ctx.GetStub().SetEvent("EscrowSettled_eRUPI_Triggered", []byte(lotId))
}`
