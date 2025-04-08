import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function POST(req: NextRequest) {
  const body = await req.json()

  try {
    const zapierUrl = "https://hooks.zapier.com/hooks/catch/17568364/2cj4pvk/"
    const zapierResponse = await axios.post(zapierUrl, body, {
      headers: { "Content-Type": "application/json" }
    })

    return NextResponse.json({ status: "success", zapierResponse: zapierResponse.data })
  } catch (err) {
    console.error("Zapier POST failed:", err)
    return NextResponse.json({ error: "Failed to send to Zapier" }, { status: 500 })
  }
}
