import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q")
  const cityId = req.nextUrl.searchParams.get("city")

  console.log("📥 קלט מהקליינט:")
  console.log("🔤 query:", query)
  console.log("🏙️ cityId:", cityId)

  if (!query || !cityId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
  }

  // הסרת רווחים מיותרים (אם יש בטעות)
  const cleanCityId = cityId.trim()

  const filters = encodeURIComponent(JSON.stringify({ "סמל_ישוב": cleanCityId }))
  const apiUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3&q=${encodeURIComponent(query)}&filters=${filters}`

  console.log("🌐 יוצרת קריאה אל:")
  console.log(apiUrl)

  try {
    const res = await fetch(apiUrl)

    if (!res.ok) {
      console.error("❌ שגיאה מהשרת:", res.status)
      throw new Error(`Failed to fetch from data.gov.il: ${res.status}`)
    }

    const data = await res.json()
    console.log("✅ תשובה:", data.result?.records?.length, "רחובות")

    const records = data.result.records.map((r: any) => ({
      label: r["שם_רחוב"],
      value: r["סמל_רחוב"],
    }))

    return NextResponse.json(records)
  } catch (err) {
    console.error("❌ שגיאה כללית:", err)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
