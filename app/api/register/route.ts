import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // เพิ่ม timestamp แบบไทย
    const now = new Date();
    const thaiTimestamp = now.toLocaleString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Bangkok",
    });

    const leadData = {
      ...data,
      timestamp: thaiTimestamp,
      source: "Landing Page",
    };

    console.log("Sending to Google Sheets:", leadData);

    // ส่งไป Google Sheets
    if (process.env.SHEETS_WEBHOOK_URL) {
      const response = await fetch(process.env.SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      const result = await response.text();
      console.log("Google Sheets response:", result);
    } else {
      console.warn("SHEETS_WEBHOOK_URL not configured");
    }

    // ส่ง Email (ถ้ามี RESEND_API_KEY)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      await resend.emails.send({
        from: "BestGym Leads <onboarding@resend.dev>",
        to: [process.env.ADMIN_EMAIL || "bestgym@example.com"],
        subject: `🔥 Lead ใหม่: ${data.name} สนใจ ${data.interest}`,
        html: `
          <h2>🎯 Lead ใหม่จาก Landing Page</h2>
          <p><strong>ชื่อ:</strong> ${data.name}</p>
          <p><strong>เบอร์โทร:</strong> ${data.phone}</p>
          <p><strong>สนใจแพ็กเกจ:</strong> ${data.interest}</p>
          <p><strong>ช่วงเวลาติดต่อ:</strong> ${data.time}</p>
          <p><strong>เวลา:</strong> ${thaiTimestamp}</p>
        `,
      });
      console.log("Email sent successfully");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
