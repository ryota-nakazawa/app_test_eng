import { auth } from "@/auth"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import { NextResponse } from "next/server"

// GET: Fetch all users
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    await dbConnect()
    const users = await User.find({}).sort({ createdAt: -1 })

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

// PUT: Update user role
export async function PUT(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const { userId, role } = await req.json()
    await dbConnect()

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    )

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

// DELETE: Delete user
export async function DELETE(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('id')

    await dbConnect()
    await User.findByIdAndDelete(userId)

    return NextResponse.json({ message: "User deleted" })
  } catch (error) {
    console.error("Error deleting user:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
