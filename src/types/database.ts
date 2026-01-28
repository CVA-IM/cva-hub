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
      countries: {
        Row: {
          id: string
          name: string
          code: string
          currency: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          currency: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          currency?: string
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          country_id: string
          name: string
          description: string | null
          start_date: string
          end_date: string
          finance_code: string | null
          status: 'draft' | 'active' | 'closed'
          eligibility_criteria: Json | null
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          country_id: string
          name: string
          description?: string | null
          start_date: string
          end_date: string
          finance_code?: string | null
          status?: 'draft' | 'active' | 'closed'
          eligibility_criteria?: Json | null
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          country_id?: string
          name?: string
          description?: string | null
          start_date?: string
          end_date?: string
          finance_code?: string | null
          status?: 'draft' | 'active' | 'closed'
          eligibility_criteria?: Json | null
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
      locations: {
        Row: {
          id: string
          country_id: string
          name: string
          admin_level: number
          parent_id: string | null
          pcode: string | null
          created_at: string
        }
        Insert: {
          id?: string
          country_id: string
          name: string
          admin_level: number
          parent_id?: string | null
          pcode?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          country_id?: string
          name?: string
          admin_level?: number
          parent_id?: string | null
          pcode?: string | null
          created_at?: string
        }
      }
      households: {
        Row: {
          id: string
          project_id: string
          registration_number: string
          location_id: string | null
          address: string | null
          status: 'registered' | 'enrolled' | 'active' | 'inactive'
          consent_given: boolean
          consent_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          registration_number: string
          location_id?: string | null
          address?: string | null
          status?: 'registered' | 'enrolled' | 'active' | 'inactive'
          consent_given?: boolean
          consent_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          registration_number?: string
          location_id?: string | null
          address?: string | null
          status?: 'registered' | 'enrolled' | 'active' | 'inactive'
          consent_given?: boolean
          consent_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      beneficiaries: {
        Row: {
          id: string
          household_id: string
          first_name: string
          last_name: string
          date_of_birth: string | null
          gender: 'male' | 'female' | 'other' | null
          national_id: string | null
          phone: string | null
          email: string | null
          is_head: boolean
          is_proxy: boolean
          photo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          household_id: string
          first_name: string
          last_name: string
          date_of_birth?: string | null
          gender?: 'male' | 'female' | 'other' | null
          national_id?: string | null
          phone?: string | null
          email?: string | null
          is_head?: boolean
          is_proxy?: boolean
          photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          household_id?: string
          first_name?: string
          last_name?: string
          date_of_birth?: string | null
          gender?: 'male' | 'female' | 'other' | null
          national_id?: string | null
          phone?: string | null
          email?: string | null
          is_head?: boolean
          is_proxy?: boolean
          photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assistance_types: {
        Row: {
          id: string
          project_id: string
          name: string
          type: 'cash' | 'voucher' | 'goods' | 'services'
          unit: string
          unit_value: number
          currency: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          name: string
          type: 'cash' | 'voucher' | 'goods' | 'services'
          unit: string
          unit_value: number
          currency: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          name?: string
          type?: 'cash' | 'voucher' | 'goods' | 'services'
          unit?: string
          unit_value?: number
          currency?: string
          created_at?: string
        }
      }
      entitlements: {
        Row: {
          id: string
          household_id: string
          assistance_type_id: string
          programme_total: number
          distributed_total: number
          remaining: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          household_id: string
          assistance_type_id: string
          programme_total: number
          distributed_total?: number
          remaining?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          household_id?: string
          assistance_type_id?: string
          programme_total?: number
          distributed_total?: number
          remaining?: number
          created_at?: string
          updated_at?: string
        }
      }
      distributions: {
        Row: {
          id: string
          project_id: string
          name: string
          distribution_date: string
          location_id: string | null
          status: 'planned' | 'in_progress' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          project_id: string
          name: string
          distribution_date: string
          location_id?: string | null
          status?: 'planned' | 'in_progress' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          project_id?: string
          name?: string
          distribution_date?: string
          location_id?: string | null
          status?: 'planned' | 'in_progress' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
      distribution_records: {
        Row: {
          id: string
          distribution_id: string
          household_id: string
          entitlement_id: string
          planned_amount: number
          actual_amount: number | null
          status: 'pending' | 'distributed' | 'partial' | 'missed'
          distributed_at: string | null
          signature_url: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          distribution_id: string
          household_id: string
          entitlement_id: string
          planned_amount: number
          actual_amount?: number | null
          status?: 'pending' | 'distributed' | 'partial' | 'missed'
          distributed_at?: string | null
          signature_url?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          distribution_id?: string
          household_id?: string
          entitlement_id?: string
          planned_amount?: number
          actual_amount?: number | null
          status?: 'pending' | 'distributed' | 'partial' | 'missed'
          distributed_at?: string | null
          signature_url?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'admin' | 'programme_manager' | 'field_staff' | 'viewer'
          country_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'admin' | 'programme_manager' | 'field_staff' | 'viewer'
          country_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'admin' | 'programme_manager' | 'field_staff' | 'viewer'
          country_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string
          action: string
          table_name: string
          record_id: string
          old_values: Json | null
          new_values: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          action: string
          table_name: string
          record_id: string
          old_values?: Json | null
          new_values?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          action?: string
          table_name?: string
          record_id?: string
          old_values?: Json | null
          new_values?: Json | null
          created_at?: string
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

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Commonly used types
export type Country = Tables<'countries'>
export type Project = Tables<'projects'>
export type Location = Tables<'locations'>
export type Household = Tables<'households'>
export type Beneficiary = Tables<'beneficiaries'>
export type AssistanceType = Tables<'assistance_types'>
export type Entitlement = Tables<'entitlements'>
export type Distribution = Tables<'distributions'>
export type DistributionRecord = Tables<'distribution_records'>
export type UserProfile = Tables<'user_profiles'>
export type AuditLog = Tables<'audit_logs'>
