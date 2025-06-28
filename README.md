# React AMP Email

A simple React-based toolkit for building, rendering, and exporting AMP-compliant and standard HTML email templates.

## Features
- **Write emails in React**: Use familiar React components to compose your emails.
- **AMP & HTML output**: Generate both AMP and regular HTML versions of your emails.
- **Plain text export**: Automatically generate a plain text version for email clients that don't support HTML.
- **Form support**: Easily add AMP-compatible and HTML forms to your emails.
- **Newsletter template**: Includes a ready-to-use, customizable newsletter example.

## Project Structure
```
.
├── emails/                # React email templates (e.g., ReactEmailNewsletter.tsx)
├── newsletter-emails/     # Output directory for rendered emails (AMP, HTML, TXT)
├── src/
│   └── components/        # Reusable React components and form logic
├── render.ts              # Main script to render emails to all formats
├── reactEmailToAmp.ts     # AMP rendering logic
├── reactEmailToHtml.ts    # HTML rendering logic
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── .gitignore             # Git ignore rules
```

## Getting Started

### 1. Install dependencies
```sh
npm install
```

### 2. Build the project
```sh
npm run build
```

### 3. Render an email
Generate AMP, HTML, and plain text versions of the newsletter:
```sh
npm run render -- --type=react-newsletter --output=newsletter-emails
```
- The output will be in the `newsletter-emails/` directory.
- You can add more templates in the `emails/` folder and render them by specifying their type.

### 4. Preview
You can use the generated HTML or AMP files in your email client or test them in the [AMP Playground](https://playground.amp.dev/).

## Customizing
- **Templates**: Edit or add new React components in `emails/`.
- **Forms**: Use the `<Form />` component to add AMP/HTML-compatible forms to your emails.
- **Components**: Reuse or extend components in `src/components/`.

## Scripts
- `npm run build` – Compile TypeScript
- `npm run render` – Render emails to AMP, HTML, and TXT
- `npm start` – Start the Vite dev server (if you want to preview components)

## Example: Newsletter Template
The included `ReactEmailNewsletter.tsx` demonstrates:
- AMP and HTML forms for newsletter signup and feedback
- Responsive layout and styled sections
- Easy customization of content and styles

## License
MIT
