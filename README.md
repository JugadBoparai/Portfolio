# Jugad Boparai - Portfolio Website# React + TypeScript + Vite



A modern, minimalist portfolio website built with React, Vite, TypeScript, and Tailwind CSS, featuring smooth Framer Motion animations.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



## 🚀 FeaturesCurrently, two official plugins are available:



- **Modern Tech Stack**: React 19, Vite, TypeScript, Tailwind CSS- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- **Smooth Animations**: Framer Motion for beautiful page transitions- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- **Responsive Design**: Fully responsive across all devices

- **Clean UI**: Light mode with blue/green accent colors## React Compiler

- **Interactive Sections**:

  - About Me (Cybersecurity, CS, AI focus)The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

  - Projects showcase with images, descriptions, and links

  - Skills display (Python, ML, CV, NLP, React, Leadership, etc.)Note: This will impact Vite dev & build performances.

  - Downloadable Resume

  - Contact form with social links## Expanding the ESLint configuration



## 🛠️ Tech StackIf you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:



- **Frontend**: React 19 with TypeScript```js

- **Build Tool**: Vite 7export default defineConfig([

- **Styling**: Tailwind CSS 3  globalIgnores(['dist']),

- **Animations**: Framer Motion  {

- **Icons**: React Icons    files: ['**/*.{ts,tsx}'],

- **Deployment**: Vercel    extends: [

      // Other configs...

## 📦 Installation

      // Remove tseslint.configs.recommended and replace with this

1. Clone the repository:      tseslint.configs.recommendedTypeChecked,

```bash      // Alternatively, use this for stricter rules

git clone https://github.com/jugadboparai/portfolio.git      tseslint.configs.strictTypeChecked,

cd portfolio      // Optionally, add this for stylistic rules

```      tseslint.configs.stylisticTypeChecked,



2. Install dependencies:      // Other configs...

```bash    ],

npm install    languageOptions: {

```      parserOptions: {

        project: ['./tsconfig.node.json', './tsconfig.app.json'],

3. Start the development server:        tsconfigRootDir: import.meta.dirname,

```bash      },

npm run dev      // other options...

```    },

  },

4. Open your browser and visit `http://localhost:5173`])

```

## 🏗️ Build

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

To create a production build:

```js

```bash// eslint.config.js

npm run buildimport reactX from 'eslint-plugin-react-x'

```import reactDom from 'eslint-plugin-react-dom'



To preview the production build locally:export default defineConfig([

  globalIgnores(['dist']),

```bash  {

npm run preview    files: ['**/*.{ts,tsx}'],

```    extends: [

      // Other configs...

## 🌐 Deployment to Vercel with Custom Domain      // Enable lint rules for React

      reactX.configs['recommended-typescript'],

### Step 1: Deploy to Vercel      // Enable lint rules for React DOM

      reactDom.configs.recommended,

1. **Install Vercel CLI** (optional):    ],

```bash    languageOptions: {

npm install -g vercel      parserOptions: {

```        project: ['./tsconfig.node.json', './tsconfig.app.json'],

        tsconfigRootDir: import.meta.dirname,

2. **Deploy via Vercel Dashboard**:      },

   - Go to [vercel.com](https://vercel.com)      // other options...

   - Sign up or log in    },

   - Click "Add New Project"  },

   - Import your GitHub repository])

   - Vercel will auto-detect Vite configuration```

   - Click "Deploy"

3. **Deploy via CLI** (alternative):
```bash
vercel
```

### Step 2: Connect Custom Domain (Jugadboparai.com)

1. **Add Domain in Vercel**:
   - Go to your project dashboard on Vercel
   - Navigate to "Settings" → "Domains"
   - Click "Add"
   - Enter `jugadboparai.com`
   - Click "Add"

2. **Configure DNS Records**:
   
   Go to your domain registrar (GoDaddy, Namecheap, etc.) and add these DNS records:

   **For root domain (jugadboparai.com):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 3600
   ```

   **For www subdomain (www.jugadboparai.com):**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

3. **Verify Domain**:
   - Return to Vercel dashboard
   - Wait for DNS propagation (can take up to 48 hours, usually much faster)
   - Vercel will automatically provision SSL certificate

### Step 3: Configure Redirects (Optional)

Create a `vercel.json` file in the project root to redirect www to non-www or vice versa:

```json
{
  "redirects": [
    {
      "source": "https://www.jugadboparai.com/:path*",
      "destination": "https://jugadboparai.com/:path*",
      "permanent": true
    }
  ]
}
```

### Environment Variables

If you need to add environment variables:

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add your variables (e.g., API keys, form submission endpoints)
3. Redeploy for changes to take effect

## 📝 Customization

### Update Personal Information

1. **Contact Details**: Edit `src/components/Contact.tsx`
   - Update email, LinkedIn, and GitHub URLs
   - Configure form submission endpoint

2. **Projects**: Edit `src/components/Projects.tsx`
   - Replace placeholder images with your project screenshots
   - Update project descriptions and tech stacks
   - Add your GitHub repo and demo links

3. **Resume**: 
   - Place your resume PDF in `public/resume.pdf`
   - Update download button in `src/components/Resume.tsx`

4. **About Section**: Edit `src/components/About.tsx`
   - Customize your bio and background

### Color Scheme

Colors are defined in `tailwind.config.js`:
- Primary (Blue): `#2563eb`
- Secondary (Green): `#10b981`
- Accent (Cyan): `#06b6d4`

## 📱 Contact Form Integration

To make the contact form functional, integrate with:

- **Formspree**: [formspree.io](https://formspree.io)
- **EmailJS**: [emailjs.com](https://emailjs.com)
- **Custom Backend**: Build your own API endpoint

Update the `handleSubmit` function in `src/components/Contact.tsx` with your chosen service.

## 🎨 Project Structure

```
src/
├── components/
│   ├── Header.tsx      # Navigation header
│   ├── About.tsx       # About section
│   ├── Projects.tsx    # Projects showcase
│   ├── Skills.tsx      # Skills display
│   ├── Resume.tsx      # Resume download
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles + Tailwind
```

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Jugad Boparai**
- Portfolio: [jugadboparai.com](https://jugadboparai.com)
- LinkedIn: [linkedin.com/in/jugadboparai](https://linkedin.com/in/jugadboparai)
- GitHub: [github.com/jugadboparai](https://github.com/jugadboparai)

---

Made with ❤️ by Jugad Boparai
