import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { firstName, lastName, email, phone, message, intent, language, listingAddress } = body

        const { error } = await resend.emails.send({
            from: 'Abdul Basharmal Website <onboarding@resend.dev>',
            to: 'abdulbashrealtor@gmail.com',
            replyTo: email,
            subject: `New ${intent || 'Contact'} Inquiry from ${firstName} ${lastName}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                ${intent ? `<p><strong>Intent:</strong> ${intent}</p>` : ''}
                ${language ? `<p><strong>Preferred Language:</strong> ${language}</p>` : ''}
                ${listingAddress ? `<p><strong>Listing Address:</strong> ${listingAddress}</p>` : ''}
                <hr />
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        })

        if (error) {
            console.error('Resend error:', error)
            return Response.json({ success: false, error: 'Failed to send email' }, { status: 500 })
        }

        return Response.json({ success: true })
    } catch (error) {
        console.error('Error in contact form submission:', error)
        return Response.json({ success: false, error: 'Failed to submit' }, { status: 500 })
    }
}
