export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      rent_inputs: {
        Row: {
          id: string
          created_at: string
          rent: number
          income: number
          market_rent: number
          unit_quality: number
          zip_code: string
        }
        Insert: {
          id?: string
          created_at?: string
          rent: number
          income: number
          market_rent: number
          unit_quality: number
          zip_code: string
        }
        Update: {
          id?: string
          created_at?: string
          rent?: number
          income?: number
          market_rent?: number
          unit_quality?: number
          zip_code?: string
        }
      }
      scores: {
        Row: {
          id: string
          created_at: string
          rent_input_id: string
          score: number
          verdict: string
        }
        Insert: {
          id?: string
          created_at?: string
          rent_input_id: string
          score: number
          verdict: string
        }
        Update: {
          id?: string
          created_at?: string
          rent_input_id?: string
          score?: number
          verdict?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

