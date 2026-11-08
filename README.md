# Paperlight document scanner

A browser app with no account or document uploads. Scanning and PDF creation stay on your device. Smart Scan uses an online OCR library and English language data the first time it runs.

## Run on a computer

1. Install Node.js (version 18 or newer) if needed.
2. Open a terminal in this folder.
3. Run `node server.cjs`.
4. Open http://localhost:8080 in a modern browser. Allow camera permission if prompted.

Stop the server with Ctrl+C. You can also open `index.html` directly for image uploads and PDF export; direct camera access may be blocked for local files.

## Run on a phone

Copy this folder to any static HTTPS hosting service and open its HTTPS address on your phone. No build step is required. Upload index.html, style.css, app.js, and pdf.js. Use **Take photo** to invoke the phone's camera picker directly. Live camera requires HTTPS, Chrome, and camera permission; Android's `content://` file preview does not provide live camera access. If live camera is blocked, use Take photo.

## Scan a document

1. Choose multiple images, drop files onto the upload box, or use the camera and capture several pages. Live camera shows a portrait guide frame and captures the area inside it; fit the full page in the frame.
2. For an uploaded image, choose Crop and drag a box around the page, or enter its edge percentages. Smart Scan will detect and straighten page edges inside the crop when possible. Rotate turns clockwise by 90 degrees. Reset restores the original imported image, undoing all crop and rotation edits.
3. Use the arrow buttons to order pages; Delete removes a page.
4. Choose **Smart Scan** to detect the paper, crop and straighten it, remove uneven lighting with adaptive black-and-white enhancement, and recognize English text. Detection now bridges gaps along curled or irregular page edges and checks several outline shapes. Review, copy, or download the extracted text below the pages. If OpenCV.js cannot load, the app still trims the bright paper region and applies local adaptive black-and-white cleanup; perspective correction may be unavailable in that fallback.
5. Choose A4 with margins or Match each image, name the document, and download the PDF. The PDF contains the enhanced images; extracted text is downloaded separately as a .txt file.

## Notes

- Pages stay in memory for this tab only. Download before closing or refreshing. The app does not save documents for later.
- Images are resized to a maximum 2400 pixels on the longest edge and encoded as JPEG. Transparent backgrounds become white. Many large pages may exceed the device's available memory.
- Common browser-supported image formats work. Convert HEIC or other unsupported images to JPG/PNG first.
- Cropping is rectangular and manual; there is no perspective correction or automatic page-edge detection.
- Smart Scan uses OpenCV.js for page detection and perspective correction when available, plus Tesseract.js and English language data for OCR. It can still miss pages whose edges blend into the background or are heavily folded; check and manually crop those pages. The local cleanup fallback trims background and creates a black-and-white page if OpenCV fails to load. These libraries load from public CDNs, so an internet connection is needed; images are processed in the browser and are not uploaded.
- OCR extracts text in reading order as a separate text file. It does not preserve complex page layout or create a searchable text layer inside the PDF.
- PDF export is fully local and works without an internet connection once the app files are available.
- The included server listens only on this computer, serves only the four app files, and does not accept uploads.
