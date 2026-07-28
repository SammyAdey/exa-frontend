/**
 * Google Apps Script for JUSTUS2 wedding RSVP → Google Sheet
 *
 * Setup (easiest auth — no service account):
 * 1. Create a Google Sheet.
 * 2. Row 1 headers (exact order):
 *    Timestamp | First Name | Last Name | Email | Country Code | Phone | Attending | Accommodation | Event | Source | Invite From
 * 3. Extensions → Apps Script → paste this file's code into Code.gs
 * 4. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL into frontend env:
 *    WEDDING_JUSTUS2_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 *
 * If you already deployed an older version, update Code.gs then:
 * Deploy → Manage deployments → Edit → New version → Deploy.
 *
 * Note: If Invite From was previously written into the Event column, fix those rows
 * by moving the name into Invite From, Event to "Oluwaseun & Oluwatimilehin",
 * and Source to "wedding/justus2".
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents || "{}");

    // Keep country code as text so Sheets does not drop the leading "+".
    var countryCode = String(data.phoneCountryCode || "").trim();
    if (countryCode && countryCode.charAt(0) !== "'") {
      countryCode = "'" + countryCode;
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.firstName || "",
      data.lastName || "",
      data.email || "",
      countryCode,
      data.phoneNumber || "",
      data.attendance || "",
      data.accommodation || "",
      data.event || "Oluwaseun & Oluwatimilehin",
      data.source || "wedding/justus2",
      data.inviteFrom || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: "JUSTUS2 RSVP webhook is live." }))
    .setMimeType(ContentService.MimeType.JSON);
}
