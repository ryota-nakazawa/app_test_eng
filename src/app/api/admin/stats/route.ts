import { auth } from "@/auth"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import Contact from "@/models/Contact"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await auth()

    // Check if user is authenticated and is admin
    if (!session?.user || session.user.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    await dbConnect()

    const userCount = await User.countDocuments()
    const contactCount = await Contact.countDocuments()

    return NextResponse.json({
      userCount,
      contactCount
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
