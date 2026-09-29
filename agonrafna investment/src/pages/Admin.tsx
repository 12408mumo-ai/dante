import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Package,
  Home,
  Cloud,
  Database,
} from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { CATEGORIES, type Category, type Product } from '../types'
import { BRAND } from '../lib/brand'
import { formatKES } from '../lib/format'
import Logo from '../components/Logo'

const AUTH_KEY = 'rafna_admin_authed'

type Status = { type: 'idle' | 'loading' | 'success' | 'error'; msg: string }

export default function Admin() {
  const [authed, setAuthed] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === '1'
    } catch {
      return false
    }
  })

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />
  }
  return (
    <AdminDashboard
      onLogout={() => {
        sessionStorage.removeItem(AUTH_KEY)
        setAuthed(false)
      }}
    />
  )
}

/* ----------------------------- LOGIN ----------------------------- */

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === BRAND.adminPassword) {
      try {
        sessionStorage.setItem(AUTH_KEY, '1')
      } catch {
        /* ignore */
      }
      onSuccess()
    } else {
      setError('Incorrect password. Access denied.')
    }
  }

  return (
    <div className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-ink px-6 py-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-3xl border border-cream/10 bg-cream/5 p-8 shadow-2xl backdrop-blur">
          <Link
            to="/"
            className="mx-auto mb-6 flex w-fit items-center gap-2.5 rounded-2xl px-3 py-2 text-cream transition hover:bg-cream/10"
            title="Back to website"
          >
            <Logo size="lg" variant="light" />
          </Link>

          <div className="text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-400 ring-1 ring-gold-500/30">
              <Lock className="h-6 w-6" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold text-cream">
              Owner Dashboard
            </h1>
            <p className="mt-1.5 text-sm text-cream/60">
              Enter your password to manage products.
            </p>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-cream/60">
                Admin password
              </label>
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="••••••••••"
                autoFocus
                className="w-full rounded-xl border border-cream/15 bg-ink/40 px-4 py-3 text-sm text-cream placeholder:text-cream/30 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
              />
            </div>

            {error && (
              <p className="flex items-center gap-2 text-sm text-rose-300">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-gold-400"
            >
              <Lock className="h-4 w-4" />
              Unlock dashboard
            </button>
          </form>

          <div className="mt-5 flex items-center justify-between text-xs text-cream/50">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 transition hover:text-gold-300"
            >
              <Home className="h-3.5 w-3.5" />
              Back to website
            </Link>
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="transition hover:text-gold-300"
            >
              {show ? 'Hide' : 'Show'} password
            </button>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-cream/40">
          Authorized personnel only. Customer orders are never processed here.
        </p>
      </motion.div>
    </div>
  )
}

/* --------------------------- DASHBOARD --------------------------- */

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const {
    products,
    loading,
    addProduct,
    deleteProduct,
    uploadImage,
    isSupabaseConfigured,
    refresh,
  } = useStore()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<Category>('Orthopaedic Mattresses')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [preview, setPreview] = useState('')
  const [uploadPct, setUploadPct] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [imageReady, setImageReady] = useState(false)
  const [savedImage, setSavedImage] = useState('')
  const [status, setStatus] = useState<Status>({ type: 'idle', msg: '' })
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Clean up object URLs to avoid leaks.
  useEffect(() => {
    if (!preview || preview.startsWith('data:')) return
    const url = preview
    return () => URL.revokeObjectURL(url)
  }, [preview])

  const handleFile = (file: File | null) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setStatus({ type: 'error', msg: 'Please select an image file.' })
      return
    }
    setImageFile(file)
    setImageUrl('')
    setSavedImage('')
    setImageReady(false)
    setPreview(URL.createObjectURL(file))
    setStatus({ type: 'idle', msg: '' })
  }

  const handleUrl = (value: string) => {
    setImageUrl(value)
    setImageFile(null)
    setSavedImage('')
    setImageReady(false)
    setPreview(value)
    setStatus({ type: 'idle', msg: '' })
  }

  const resetForm = () => {
    setTitle('')
    setCategory('Orthopaedic Mattresses')
    setPrice('')
    setDescription('')
    setImageFile(null)
    setImageUrl('')
    setPreview('')
    setSavedImage('')
    setUploadPct(0)
    setUploading(false)
    setImageReady(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: 'idle', msg: '' })

    const priceNum = Number(price)
    if (
      !title.trim() ||
      !price.trim() ||
      !description.trim() ||
      isNaN(priceNum) ||
      priceNum <= 0
    ) {
      setStatus({
        type: 'error',
        msg: 'Please fill in the title, a valid KES price and the description.',
      })
      return
    }

    let finalImage = savedImage || imageUrl.trim()

    // Upload the chosen file to Supabase Storage (or local fallback).
    if (imageFile && !finalImage) {
      setUploading(true)
      setUploadPct(0)
      try {
        finalImage = await uploadImage(imageFile, (pct) => setUploadPct(pct))
        setSavedImage(finalImage)
        setImageReady(true)
      } catch (err) {
        setUploading(false)
        setStatus({
          type: 'error',
          msg: err instanceof Error
            ? `Image upload failed: ${err.message}`
            : 'Image upload failed.',
        })
        return
      }
      setUploading(false)
    }

    if (!finalImage) {
      setStatus({
        type: 'error',
        msg: 'Please add a product image — upload a photo from your device or paste an image URL.',
      })
      return
    }

    setSaving(true)
    try {
      await addProduct({
        title: title.trim(),
        category,
        price: priceNum,
        description: description.trim(),
        image: finalImage,
      })
      setStatus({
        type: 'success',
        msg: 'Product added successfully — it is now live on the shop page.',
      })
      resetForm()
      await refresh()
    } catch (err) {
      setStatus({
        type: 'error',
        msg: err instanceof Error
          ? `Failed to save product: ${err.message}`
          : 'Failed to save product.',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This removes it from the live shop.`)) return
    try {
      await deleteProduct(id)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete product.')
    }
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-cream-100/50">
      {/* Top bar */}
      <div className="border-b border-cream-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-xl transition hover:opacity-80"
            title="Go to website"
          >
            <Logo size="md" variant="dark" subtitle="Owner Dashboard" />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-ink/15 px-3 py-2 text-sm font-medium text-ink transition hover:border-gold-500 hover:text-gold-600"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Website</span>
            </Link>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3.5 py-2 text-sm font-semibold text-cream transition hover:bg-ink-700"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Connection status */}
        <div
          className={`mb-6 flex flex-wrap items-center gap-2 rounded-xl border p-4 text-sm ${
            isSupabaseConfigured
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-amber-200 bg-amber-50 text-amber-800'
          }`}
        >
          {isSupabaseConfigured ? (
            <Cloud className="h-5 w-5" />
          ) : (
            <Database className="h-5 w-5" />
          )}
          <p className="flex-1">
            {isSupabaseConfigured
              ? 'Connected to Supabase — new products & uploaded images are saved live to the products table and the product-images bucket.'
              : 'Demo mode (no Supabase keys). Products are saved to this browser and uploaded images are stored as previews. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable live Supabase Storage + database.'}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* ADD PRODUCT FORM */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-cream-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500/10 text-gold-600">
                  <Plus className="h-5 w-5" />
                </span>
                <h2 className="font-display text-xl font-bold text-ink">
                  Add New Product
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Orthopaedic Spring Mattress — King"
                    className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">
                      Price in KES
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink/40">
                        KES
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="18500"
                        className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2.5 pl-12 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Describe the materials, size and benefits…"
                    className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
                  />
                </div>

                {/* Image upload */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">
                    Product Image
                  </label>
                  <div className="rounded-2xl border border-dashed border-cream-200 bg-cream-100/40 p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl border border-cream-200 bg-white sm:w-40">
                        {preview ? (
                          <img
                            src={preview}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center text-ink/35">
                            <ImageIcon className="h-7 w-7" />
                            <span className="mt-1 text-[11px]">No image</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-3">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleFile(e.target.files?.[0] ?? null)
                          }
                          className="block w-full text-sm text-ink/70 file:mr-3 file:rounded-lg file:border-0 file:bg-gold-500 file:px-4 file:py-2.5 file:font-semibold file:text-ink file:transition hover:file:bg-gold-400"
                        />
                        <p className="text-xs text-ink/50">
                          Select any photo from your device — it uploads to the
                          Supabase{' '}
                          <code className="rounded bg-cream-200 px-1 py-0.5">
                            product-images
                          </code>{' '}
                          bucket.
                        </p>
                        <input
                          type="url"
                          value={imageUrl}
                          onChange={(e) => handleUrl(e.target.value)}
                          placeholder="…or paste an image URL"
                          className="w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-xs outline-none focus:border-gold-500"
                        />
                      </div>
                    </div>

                    {/* Upload progress / status */}
                    {uploading && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-ink/60">
                          <span className="flex items-center gap-1.5">
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Uploading image…
                          </span>
                          <span>{uploadPct}%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-cream-200">
                          <div
                            className="h-full rounded-full bg-gold-500 transition-all"
                            style={{ width: `${uploadPct}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {imageReady && !uploading && (
                      <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                        <CheckCircle2 className="h-4 w-4" />
                        Image uploaded — ready to publish.
                      </p>
                    )}
                  </div>
                </div>

                {/* Status banner */}
                {status.type !== 'idle' && (
                  <div
                    className={`flex items-start gap-2 rounded-xl p-3 text-sm ${
                      status.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800'
                        : status.type === 'error'
                          ? 'bg-rose-50 text-rose-800'
                          : 'bg-sky-50 text-sky-800'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    ) : (
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    )}
                    <span>{status.msg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-5 py-3 text-sm font-bold text-ink shadow transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Saving
                      product…
                    </>
                  ) : uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Uploading
                      image…
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" /> Add Product
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* MANAGEMENT TABLE */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-cream-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500/10 text-gold-600">
                  <Package className="h-5 w-5" />
                </span>
                <h2 className="font-display text-xl font-bold text-ink">
                  Products{' '}
                  <span className="text-ink/40">({products.length})</span>
                </h2>
              </div>

              <div className="mt-5 max-h-[640px] space-y-3 overflow-y-auto pr-1">
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-20 animate-pulse rounded-xl bg-cream-200"
                      />
                    ))}
                  </div>
                ) : products.length === 0 ? (
                  <p className="py-10 text-center text-sm text-ink/50">
                    No products yet. Add your first product using the form.
                  </p>
                ) : (
                  products.map((p) => (
                    <ProductRow
                      key={p.id}
                      product={p}
                      onDelete={() => handleDelete(p.id, p.title)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductRow({
  product,
  onDelete,
}: {
  product: Product
  onDelete: () => void
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-cream-200 bg-cream-100/40 p-2.5">
      <img
        src={product.image}
        alt={product.title}
        className="h-16 w-16 shrink-0 rounded-lg object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">
          {product.title}
        </p>
        <p className="text-xs text-ink/50">{product.category}</p>
        <p className="mt-0.5 text-sm font-bold text-gold-600">
          {formatKES(product.price)}
        </p>
      </div>
      <button
        onClick={onDelete}
        aria-label={`Delete ${product.title}`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600 transition hover:bg-rose-100"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}
