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
      areas: {
        Row: {
          id: string
          name: string
          description: string | null
          responsible: string | null
          style: Json | null
          created_at: string | null
          updated_at: string | null
          tenant_id: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          responsible?: string | null
          style?: Json | null
          created_at?: string | null
          updated_at?: string | null
          tenant_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          responsible?: string | null
          style?: Json | null
          created_at?: string | null
          updated_at?: string | null
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "areas_tenant_id_fkey"
            columns: ["tenant_id"]
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          id: string
          area_id: string
          name: string
          description: string | null
          style: Json | null
          created_at: string | null
          updated_at: string | null
          tenant_id: string | null
        }
        Insert: {
          id?: string
          area_id: string
          name: string
          description?: string | null
          style?: Json | null
          created_at?: string | null
          updated_at?: string | null
          tenant_id?: string | null
        }
        Update: {
          id?: string
          area_id?: string
          name?: string
          description?: string | null
          style?: Json | null
          created_at?: string | null
          updated_at?: string | null
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_area_id_fkey"
            columns: ["area_id"]
            referencedRelation: "areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_tenant_id_fkey"
            columns: ["tenant_id"]
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          }
        ]
      }
      principles: {
        Row: {
          id: string
          category_id: string
          title: string
          description: string | null
          goal: string | null
          importance: string | null
          consequences: string | null
          rationale: string | null
          status: string
          version: string
          style: Json | null
          created_at: string | null
          updated_at: string | null
          tenant_id: string | null
        }
        Insert: {
          id?: string
          category_id: string
          title: string
          description?: string | null
          goal?: string | null
          importance?: string | null
          consequences?: string | null
          rationale?: string | null
          status: string
          version?: string
          style?: Json | null
          created_at?: string | null
          updated_at?: string | null
          tenant_id?: string | null
        }
        Update: {
          id?: string
          category_id?: string
          title?: string
          description?: string | null
          goal?: string | null
          importance?: string | null
          consequences?: string | null
          rationale?: string | null
          status?: string
          version?: string
          style?: Json | null
          created_at?: string | null
          updated_at?: string | null
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "principles_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "principles_tenant_id_fkey"
            columns: ["tenant_id"]
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          }
        ]
      }
      measures: {
        Row: {
          id: string
          principle_id: string
          title: string
          description: string | null
          responsible: string | null
          status: string
          priority: string
          deadline: string | null
          progress_percentage: number | null
          style: Json | null
          created_at: string | null
          updated_at: string | null
          last_status_update: string | null
          next_review_date: string | null
          tenant_id: string | null
        }
        Insert: {
          id?: string
          principle_id: string
          title: string
          description?: string | null
          responsible?: string | null
          status: string
          priority: string
          deadline?: string | null
          progress_percentage?: number | null
          style?: Json | null
          created_at?: string | null
          updated_at?: string | null
          last_status_update?: string | null
          next_review_date?: string | null
          tenant_id?: string | null
        }
        Update: {
          id?: string
          principle_id?: string
          title?: string
          description?: string | null
          responsible?: string | null
          status?: string
          priority?: string
          deadline?: string | null
          progress_percentage?: number | null
          style?: Json | null
          created_at?: string | null
          updated_at?: string | null
          last_status_update?: string | null
          next_review_date?: string | null
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "measures_principle_id_fkey"
            columns: ["principle_id"]
            referencedRelation: "principles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "measures_tenant_id_fkey"
            columns: ["tenant_id"]
            referencedRelation: "tenants"
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
  }
}