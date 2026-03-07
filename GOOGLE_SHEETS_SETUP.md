# Google Sheets Setup Checklist

## Important: The enrollment system saves to DATABASE FIRST, then tries to sync to Google Sheets
**If Google Sheets sync fails, the enrollment is still saved in the database.**

## Current Configuration (from .env)
- Service Account: `tsa-and-linear-ai@tsa-website-489215.iam.gserviceaccount.com`
- Spreadsheet ID: `12xDaLZb4sruZUpTobDpgszlVGqKcCsh3x7bTob7LlH4`
- Sheet Name: `Sheet1`

## Setup Steps

### 1. Share the Google Sheet with the Service Account
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/12xDaLZb4sruZUpTobDpgszlVGqKcCsh3x7bTob7LlH4
2. Click **Share** button (top right)
3. Add this email: `tsa-and-linear-ai@tsa-website-489215.iam.gserviceaccount.com`
4. Give it **Editor** permission
5. Click **Share** or **Send**

### 2. Verify Sheet Name
1. Open the Google Sheet
2. Check the tab name at the bottom (currently expecting `Sheet1`)
3. If the tab name is different, either:
   - Rename the tab to `Sheet1`, OR
   - Update `.env` file: `GOOGLE_ENROLLMENT_SHEET_NAME=YourActualSheetName`

### 3. Verify Column Headers (Optional but Recommended)
Add these headers in Row 1 of your sheet:
| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Enrollment ID | Student Name | Student Email | Student Contact | Course Name | Course ID | Status | Enrolled At (ISO) | Enrolled At (BD Time) |

### 4. Test the Integration
1. Restart your dev server: `npm run dev`
2. Try enrolling in a course
3. Check the terminal for these logs:
   - `🔄 Starting Google Sheets sync...`
   - `📊 Target Sheet: ...`
   - `✓ Access token obtained`
   - `✅ Successfully appended to Google Sheets`

### Common Errors and Solutions

#### Error: "Unable to parse range"
**Solution:** Sheet name mismatch. Check step 2 above.

#### Error: "The caller does not have permission"
**Solution:** Service account not shared. Check step 1 above.

#### Error: "Requested entity was not found"
**Solution:** Wrong Spreadsheet ID. Verify the URL matches the GOOGLE_ENROLLMENT_SHEET_ID.

### Logs to Watch
After the changes, you'll see clear logs:
- ✅ Success: `✓ Enrollment [id] synced to Google Sheets`
- ❌ Failure: `❌ Google Sheets sync failed (enrollment saved in database): [error details]`

The API response will also include: `"sheetsSynced": true/false`

## Testing Checklist
- [ ] Google Sheet is shared with service account email
- [ ] Sheet name matches .env configuration
- [ ] Service account has Editor permission
- [ ] Dev server restarted after .env changes
- [ ] Enrollment creates database record (always)
- [ ] Enrollment appends to Google Sheets (check logs)
