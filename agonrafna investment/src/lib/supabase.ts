import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Product } from '../types'
import { seedProducts } from '../data/seed'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/** True only when both Supabase env vars are present. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

/**
 * Live Supabase client (or null when unconfigured). All queries below check
 * this and gracefully fall back to localStorage so the app stays fully
 * functional out-of-the-box for demo / preview purposes.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null

const STORAGE_BUCKET = 'product-images'
const LOCAL_KEY = 'rafna_products_v1'

function readLocal(): Product[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (raw) return JSON.parse(raw) as Product[]
  } catch {
    /* ignore corrupt storage */
  }
  // First run — seed the catalog so the shop is never empty.
  localStorage.setItem(LOCAL_KEY, JSON.stringify(seedProducts))
  return seedProducts
}

function writeLocal(products: Product[]): void {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(products))
}

/** Fetch every product, newest first. */
export async function listProducts(): Promise<Product[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return (data ?? []) as Product[]
  }
  return readLocal()
}

/** Insert a product and return the created row. */
export async function addProduct(
  input: Omit<Product, 'id' | 'created_at'>,
): Promise<Product> {
  if (supabase) {
    const { data, error } = await supabase
      .from('products')
      .insert(input)
      .select()
      .single()
    if (error) throw error
    return data as Product
  }
  const products = readLocal()
  const created: Product = {
    ...input,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  }
  products.unshift(created)
  writeLocal(products)
  return created
}

/** Delete a product by id. */
export async function deleteProduct(id: string): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) throw error
    return
  }
  const products = readLocal()
  writeLocal(products.filter((p) => p.id !== id))
}

/**
 * Upload a product image. Returns a public URL (Supabase Storage) or a data URL
 * (local fallback). Reports progress via the optional callback.
 */
export async function uploadProductImage(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<string> {
  if (supabase) {
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${ext}`
    onProgress?.(25)
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      })
    if (uploadError) throw uploadError
    onProgress?.(85)
    const { data } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(fileName)
    onProgress?.(100)
    return data.publicUrl
  }
  // Local fallback — convert to a data URL so the preview still renders.
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onprogress = (e) => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100))
    }
    reader.onload = () => {
      onProgress?.(100)
      resolve(reader.result as string)
    }
    reader.onerror = () => reject(reader.error ?? new Error('File read failed'))
    reader.readAsDataURL(file)
  })
}
