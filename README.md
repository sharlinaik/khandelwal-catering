# Khandelwal Caterers & Events — Website

## Adding new gallery photos (after the site is hosted)

You don't need to touch any code to add a new photo to the Gallery page. There are two steps:

### Step 1 — Upload the photo file
Add your new photo into the `assets/gallery/` folder.
- If your host gives you a **File Manager** (common with cPanel-based hosting like Hostinger, GoDaddy, Bluehost): log in, browse to `assets/gallery/`, and upload the image there.
- If your site is on **GitHub Pages / Netlify / Vercel**: drag the image into the `assets/gallery` folder in your repo (GitHub's website lets you upload files directly — no command line needed) and commit/deploy.
- If someone manages the site for you (a developer), just send them the photo and this file path — it's a 2-minute change.

**Tip:** keep file names simple, lowercase, no spaces — e.g. `diwali-live-station.jpg`.

### Step 2 — List it in `manifest.json`
Open `assets/gallery/manifest.json` in any plain text editor (even Notepad, or GitHub's built-in editor). It looks like this:

```json
[
  { "file": "fruit-carving-displays.jpg", "label": "Fruit Carving Displays" },
  { "file": "traditional-indian-desserts.jpg", "label": "Traditional Indian Desserts" },
  ...
]
```

Add a new line for your photo, following the exact same pattern (comma after every entry except the last one):

```json
  { "file": "diwali-live-station.jpg", "label": "Diwali Live Station" }
```

**Alternative — hosted photo (no file upload needed):** instead of `"file"`, you can use `"url"` with a direct image link (e.g. from your own site, or a stock photo host):

```json
  { "url": "https://example.com/my-photo.jpg", "label": "Diwali Live Station" }
```

This is what the current gallery uses for a few of the dishes — placeholder stock photos hosted on Unsplash, standing in until real photos are ready. They only require the visitor's browser to have an internet connection to load (same as any embedded photo); if that's ever a concern, switch to local `"file"` entries instead.

Save the file. That's it — refresh the Gallery page and the new photo appears automatically, no code editing required.

### Removing a photo
Delete its line from `manifest.json` (and optionally delete the image file too). No other changes needed.

### If the gallery ever shows nothing
This manifest system only works when the site is loaded through a real web address (`https://yourdomain.com/...`) or a local dev server — not by double-clicking `index.html` on your computer. If you ever open the file directly and the gallery looks empty or shows old placeholder images, that's why; once it's properly hosted, it will work normally.

---

## Other things to know

- **Logo**: `assets/logo/logo-icon.png` — replace this file (keep the same name) to update the logo everywhere on the site (header, footer, header watermark) in one go.
- **Colors**: the whole color palette is defined once at the top of `style.css` under `:root`. Changing a value there (e.g. `--marigold`) updates it site-wide.
- **Contact info**: phone numbers, email, and address appear in `index.html` in the header, footer, and Contact page, and once more inside the `<script type="application/ld+json">` block near the top (used for Google search results).
