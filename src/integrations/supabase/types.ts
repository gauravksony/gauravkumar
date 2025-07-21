export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      blogs: {
        Row: {
          content: Json | null
          created_at: string
          "example 1 column": string | null
          excerpt: string | null
          featured_image_url: string | null
          id: string
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          "example 1 column"?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          "example 1 column"?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          created_at: string
          description: Json
          end_date: string
          id: string
          location: string
          organization: string
          start_date: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: Json
          end_date: string
          id?: string
          location: string
          organization: string
          start_date: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: Json
          end_date?: string
          id?: string
          location?: string
          organization?: string
          start_date?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string
          featured: boolean | null
          github_url: string | null
          id: string
          image_url: string | null
          live_url: string | null
          technologies: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          live_url?: string | null
          technologies?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          live_url?: string | null
          technologies?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      study_materials: {
        Row: {
          category: Database["public"]["Enums"]["study_material_category"]
          description: string | null
          file_url: string | null
          id: string
          thumbnail_url: string | null
          title: string
          updated_at: string
          upload_date: string
        }
        Insert: {
          category: Database["public"]["Enums"]["study_material_category"]
          description?: string | null
          file_url?: string | null
          id?: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          upload_date?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["study_material_category"]
          description?: string | null
          file_url?: string | null
          id?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          upload_date?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      study_material_category:
        | "Programming"
        | "DSA"
        | "DBMS"
        | "OS"
        | "Networking"
        | "Web Development"
        | "Mobile Development"
        | "Machine Learning"
        | "Interview Prep"
        | "Other"
        | "Self Help"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      study_material_category: [
        "Programming",
        "DSA",
        "DBMS",
        "OS",
        "Networking",
        "Web Development",
        "Mobile Development",
        "Machine Learning",
        "Interview Prep",
        "Other",
        "Self Help",
      ],
    },
  },
} as const
