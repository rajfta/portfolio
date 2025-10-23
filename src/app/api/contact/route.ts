import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_ACC,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: 'rajfta@gmail.com',
      to: 'rajfta@gmail.com',
      subject: `Email from my portfolio website from: ${email} | name: ${name}`,
      html: `<p>Message from my portfolio site</p><br>
      <p>${message}</p><br>
      `,
    })

    console.log('Message Sent')

    return NextResponse.json(body, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
