# Paperlight document scanner

A self-contained browser app with no package installation, accounts, external libraries, or document uploads.

## Run on a computer

1. Install Node.js (version 18 or newer) if needed.
2. Open a terminal in this folder.
3. Run `node server.cjs`.
4. Open http://localhost:8080 in a modern browser. Allow camera permission if prompted.

Stop the server with Ctrl+C. You can also open `index.html` directly for image uploads and PDF export; direct camera access may be blocked for local files.

## Run on a phone

Copy this folder to any static HTTPS hosting service and open its HTTPS address on your phone. No build step is required. Upload the four app files: index.html, style.css, app.js, and pdf.js. The phone and computer camera button requires HTTPS (or localhost on the same device). A phone visiting a computer's ordinary HTTP LAN address generally cannot use the live camera. The Choose images button can also offer the phone's native Take photo option, depending on its browser.

## Scan a document

1. Choose multiple images, drop files onto the upload box, or use the camera and capture several pages.
2. For each page, choose Crop and drag a rectangle, or enter its edge percentages. Apply crop. Rotate turns clockwise by 90 degrees. Reset restores the original imported image, undoing all crop and rotation edits.
3. Use the arrow buttons to order pages; Delete removes a page.
4. Choose A4 with margins or Match each image, name the document, and download the PDF.

## Notes

- Pages stay in memory for this tab only. Download before closing or refreshing. The app does not save documents for later.
- Images are resized to a maximum 2400 pixels on the longest edge and encoded as JPEG. Transparent backgrounds become white. Many large pages may exceed the device's available memory.
- Common browser-supported image formats work. Convert HEIC or other unsupported images to JPG/PNG first.
- Cropping is rectangular and manual; there is no perspective correction, automatic edge detection, OCR, or searchable text.
- PDF export is fully local and works without an internet connection once the files are available.
- The included server listens only on this computer, serves only the four app files, and does not accept uploads.
