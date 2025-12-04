import { auth } from "@/auth"
import dbConnect from "@/lib/db"
import Contact from "@/models/Contact"
import { NextResponse } from "next/server"

// GET: Fetch all contacts
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    await dbConnect()
    const contacts = await Contact.find({}).sort({ createdAt: -1 })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

// DELETE: Delete contact
export async function DELETE(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const contactId = searchParams.get('id')

    await dbConnect()
    await Contact.findByIdAndDelete(contactId)

    return NextResponse.json({ message: "Contact deleted" })
  } catch (error) {
    console.error("Error deleting contact:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
