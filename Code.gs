// ID ของโฟลเดอร์ Google Drive ปลายทาง
const FOLDER_ID = "1WHFCYwhU56joEyKc5AzirK6PuQM7Ps0M";

// ใช้ทดสอบว่าสคริปต์ทำงาน (เปิด URL ในเบราว์เซอร์)
function doGet() {
  return ContentService
    .createTextOutput("DriveCam Upload พร้อมใช้งาน ✅")
    .setMimeType(ContentService.MimeType.TEXT);
}

// รับรูปจากแอปแล้วบันทึกลง Drive
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const blob = Utilities.newBlob(
      Utilities.base64Decode(data.base64),
      data.mimeType || "image/jpeg",
      data.filename + ".jpg"
    );
    const file = DriveApp.getFolderById(FOLDER_ID).createFile(blob);
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", id: file.getId() }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
