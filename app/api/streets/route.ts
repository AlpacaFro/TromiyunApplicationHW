import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q")
  const cityId = req.nextUrl.searchParams.get("city")

  if (!query || !cityId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
  }

  const cleanCityId = cityId.trim()
  const filters = encodeURIComponent(JSON.stringify({ "סמל_ישוב": cleanCityId }))
  const apiUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3&q=${encodeURIComponent(query)}&filters=${filters}`

  try {
    const res = await axios.get(apiUrl)

    

    const records = res.data.result.records.map((r: any) => ({
      label: r["שם_רחוב"],
      value: r["סמל_רחוב"],
    }))

    return NextResponse.json(records)
  } catch (err) {
    console.error("error :", err)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
