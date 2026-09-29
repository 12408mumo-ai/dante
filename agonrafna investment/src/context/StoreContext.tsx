import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../types'
import {
  addProduct as apiAddProduct,
  deleteProduct as apiDeleteProduct,
  isSupabaseConfigured,
  listProducts,
  uploadProductImage as apiUploadImage,
} from '../lib/supabase'

interface StoreContextValue {
  products: Product[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  addProduct: (input: Omit<Product, 'id' | 'created_at'>) => Promise<Product>
  deleteProduct: (id: string) => Promise<void>
  uploadImage: (
    file: File,
    onProgress?: (pct: number) => void,
  ) => Promise<string>
  isSupabaseConfigured: boolean
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await listProducts()
      setProducts(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const addProduct = useCallback(
    async (input: Omit<Product, 'id' | 'created_at'>) => {
      const created = await apiAddProduct(input)
      setProducts((prev) => [created, ...prev.filter((p) => p.id !== created.id)])
      return created
    },
    [],
  )

  const deleteProduct = useCallback(async (id: string) => {
    await apiDeleteProduct(id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const uploadImage = useCallback(
    (file: File, onProgress?: (pct: number) => void) =>
      apiUploadImage(file, onProgress),
    [],
  )

  return (
    <StoreContext.Provider
      value={{
        products,
        loading,
        error,
        refresh,
        addProduct,
        deleteProduct,
        uploadImage,
        isSupabaseConfigured,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within a StoreProvider')
  return ctx
}
