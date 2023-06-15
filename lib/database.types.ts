export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      passwords: {
        Row: {
          created_at: string
          id: string
          password: string
          user_id: string
          username: string
          website: string
        }
        Insert: {
          created_at?: string
          id?: string
          password: string
          user_id?: string
          username: string
          website: string
        }
        Update: {
          created_at?: string
          id?: string
          password?: string
          user_id?: string
          username?: string
          website?: string
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
