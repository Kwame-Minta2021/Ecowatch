"use client"

export interface GeoPoint {
  lat: number
  lng: number
  name?: string
  address?: string
}

export async function getBrowserLocation(): Promise<GeoPoint | null> {
  if (typeof window === "undefined" || !navigator.geolocation) return null
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, name: "Current Location" })
      },
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 10000 },
    )
  })
}

export async function getFallbackLocation(): Promise<GeoPoint | null> {
  try {
    const res = await fetch("https://ipapi.co/json")
    if (!res.ok) return null
    const data = await res.json()
    if (!data || !data.latitude || !data.longitude) return null
    return {
      lat: Number(data.latitude),
      lng: Number(data.longitude),
      name: data.city ?? "Approximate Location",
      address: `${data.city ?? ""}, ${data.region ?? ""}, ${data.country_name ?? ""}`,
    }
  } catch {
    return null
  }
}

export async function resolveLocation(): Promise<GeoPoint | null> {
  const browser = await getBrowserLocation()
  if (browser) return browser
  return getFallbackLocation()
}


