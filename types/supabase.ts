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
      passwords: {
        Row: {
          user_id: string
          vault: string | null
        }
        Insert: {
          user_id: string
          vault?: string | null
        }
        Update: {
          user_id?: string
          vault?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "passwords_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
