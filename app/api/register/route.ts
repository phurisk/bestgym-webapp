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

    // แปลงช่วงเวลาให้มีรายละเอียด
    const timeMapping: { [key: string]: string } = {
      "เช้า": "เช้า (08:00-12:00)",
      "บ่าย": "บ่าย (12:00-17:00)",
      "เย็น": "เย็น (17:00-22:00)"
    };

    const leadData = {
      ...data,
      time: timeMapping[data.time] || data.time,
      timestamp: thaiTimestamp,
      source: "Landing Page",
    };

    console.log("Sending to Google Sheets:", leadData);

    // ส่งแบบ Parallel + Error Handling
    const promises = [];

    // ส่งไป Google Sheets (ไม่ block)
    if (process.env.SHEETS_WEBHOOK_URL) {
      promises.push(
        fetch(process.env.SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadData),
          signal: AbortSignal.timeout(10000), // timeout 10 วินาที
        })
          .then(res => res.text())
          .then(result => console.log("✅ Google Sheets:", result))
          .catch(err => console.error("❌ Google Sheets failed:", err.message))
      );
    }

    // ส่ง Email (ไม่ block)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      promises.push(
        resend.emails.send({
          from: "BestGym Leads <onboarding@resend.dev>",
          to: [process.env.ADMIN_EMAIL || "bestgym@example.com"],
          subject: `🔥 ลูกค้าใหม่: ${data.name} สนใจ ${data.interest}`,
          html: `
            <h2>🎯 มีลูกค้าใหม่สนใจสมัครสมาชิก</h2>
            <p><strong>ชื่อ:</strong> ${data.name}</p>
            <p><strong>เบอร์โทร:</strong> ${data.phone}</p>
            <p><strong>สนใจแพ็กเกจ:</strong> ${data.interest}</p>
            <p><strong>ช่วงเวลาติดต่อ:</strong> ${data.time}</p>
            <p><strong>เวลา:</strong> ${thaiTimestamp}</p>
          `,
        })
          .then(() => console.log("✅ Email sent"))
          .catch(err => console.error("❌ Email failed:", err.message))
      );
    }

    // รอทั้งหมดเสร็จ (แต่ไม่ throw error ถ้าล้มเหลว)
    await Promise.allSettled(promises);

    // ตอบกลับทันทีว่าสำเร็จ (ไม่ว่าจะส่งสำเร็จหรือไม่)
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
