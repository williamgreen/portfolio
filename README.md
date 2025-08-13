# Will Green - Portfolio Website

A modern, minimalist portfolio website showcasing the work and projects of Will Green, a Product Designer based in Bristol, UK.

## About

This is the personal portfolio and website for Will Green, currently working as a Product Designer at Ravelin (recently acquired by Worldpay), building fraud prevention software. The site serves as both a professional showcase and a platform to share personal projects and downloadable resources.

## Features

- **Portfolio Showcase**: Dynamic work portfolio powered by Contentful CMS
- **Personal Projects**: Downloadable resources including Garmin Connect icons and other design assets
- **Contact Form**: Spam-protected contact form with Google reCAPTCHA v2 integration
- **Responsive Design**: Mobile-first, fully responsive design
- **Dark/Light Mode**: Theme switching with system preference detection
- **Performance Optimized**: Built with Next.js 15 for optimal performance and SEO

## Pages

- **Home**: Introduction, current work status, and featured portfolio items
- **Work**: Complete portfolio of design projects and case studies
- **Downloads**: Free and paid digital resources and design assets
- **Contact**: Spam-protected contact form for inquiries
- **Colophon**: Technical details about the site's construction

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Content Management

- **Contentful** - Headless CMS for portfolio content
- **Rich Text Rendering** - Dynamic content rendering with @contentful/rich-text-react-renderer

### Form & Security

- **Google reCAPTCHA v2** - Spam protection
- **Formspark** - Form submission handling
- **Content Security Policy** - Enhanced security headers

### Development Tools

- **ESLint** - Code linting
- **v0.dev** - AI-assisted development
- **Cursor** - AI-powered code editor

### Deployment & Analytics

- **Vercel** - Hosting and deployment
- **Vercel Analytics** - Performance monitoring

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/williamgreen/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Contentful credentials:

```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio/
├── app/                    # Next.js App Router pages
│   ├── colophon/          # Site information page
│   ├── contact/           # Contact form with reCAPTCHA
│   ├── downloads/         # Digital resources page
│   ├── work/              # Portfolio pages
│   │   └── [slug]/        # Dynamic work item pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
│   ├── ui/               # Radix UI components
│   ├── animated-text.tsx # Text animation component
│   ├── bottom-navigation.tsx
│   ├── breadcrumb.tsx
│   ├── footer.tsx
│   └── theme-provider.tsx
├── lib/                  # Utility functions
│   ├── contentful.ts     # Contentful API integration
│   └── utils.ts          # General utilities
└── public/               # Static assets
```

## Environment Variables

- `CONTENTFUL_SPACE_ID` - Your Contentful space ID
- `CONTENTFUL_ACCESS_TOKEN` - Your Contentful delivery API token

## Deployment

The site is configured for deployment on Vercel with automatic deployments from the main branch.

## License

This project is personal portfolio code. While the code is open source for reference, please respect the personal content and branding.

## Contact

Will Green - [Contact Form](https://www.willgreen.co.uk/contact)

Project Link: [https://github.com/williamgreen/portfolio](https://github.com/williamgreen/portfolio)
