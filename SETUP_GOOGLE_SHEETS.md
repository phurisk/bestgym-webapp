# วิธีตั้งค่า Google Sheets (ฟรี ง่าย แนะนำ)

## ขั้นตอนที่ 1: สร้าง Google Sheet

1. ไปที่ Google Drive → สร้าง Google Sheets ใหม่
2. ตั้งชื่อว่า "BestGym Leads"
3. สร้างคอลัมน์ในแถวแรก:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Phone`
   - D1: `Interest`
   - E1: `ContactTime`
   - F1: `Source`

## ขั้นตอนที่ 2: สร้าง Apps Script

1. ใน Google Sheet ไปที่ **Extensions → Apps Script**
2. ลบโค้ดเดิมออก แล้ววางโค้ดนี้:

\`\`\`javascript
function doPost(e) {
  try {
    // ใช้ getSheets()[0] เพื่อเลือกแท็บแรก หรือเปลี่ยนเป็นชื่อแท็บจริง
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.interest || '',
      data.time || '',
      data.source || 'Landing Page'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
\`\`\`

3. กด **Save** (💾)
4. กด **Deploy → New deployment**
5. เลือก **Web app**
6. ตั้งค่า:
   - **Execute as:** Me
   - **Who has access:** Anyone
7. กด **Deploy**
8. **คัดลอก URL** ที่ได้ (จะเป็น https://script.google.com/macros/s/...)

## ขั้นตอนที่ 3: ใส่ URL ในโปรเจกต์

1. สร้างไฟล์ `.env.local` ในโปรเจกต์
2. วาง URL ที่คัดลอกมา:

\`\`\`
SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
\`\`\`

3. Restart dev server: `npm run dev`

## เสร็จแล้ว! 🎉

ทุกครั้งที่มีคนสมัคร ข้อมูลจะบันทึกใน Google Sheets อัตโนมัติ
