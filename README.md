# Charlevoix Junior Golf League Website

This website is built using PayloadCMS and Next.js 15, designed for managing and showcasing a junior golf league.

## Features

- **Content Management**: Create and manage pages, events, resources, and more through the admin panel
- **User Management**: Role-based access with super admin, admin, and editor privileges
- **Image Management**: Store media files to Cloudflare R2
- **URL Management**: Custom redirects and URL handling
- **Sitemap**: sitemap.xml file is revalidated with changes to the pages collection
- **Advanced Form Builder**:
  - Custom array fields for dynamic forms
  - Integrated Stripe checkout for secure payments
- **Page Building Blocks**:
  - Two Column Layout block for flexible page design
  - Mix content types across columns (text, images, forms)

## Getting Started

1. Clone this repository
2. Run `pnpm install` to install dependencies
3. Copy `.env.example` to `.env` and fill in the required details
4. Run `pnpm run dev` to start the development server
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Advanced Features

### Form Builder Plugin

The form builder includes:

- Array field support for adding multiple form sections
- Stripe checkout integration for payment forms

### Two Column Layout Block

A powerful page-building block that enables:

- Flexible content arrangement in two columns
- Nested blocks support
- Mobile-responsive layouts

## Deployment

This project is containerized using Docker and deployed on Dokploy. I'm using MongoDB which is also hosted on the same VPS via Dokploy.

## Support

For questions or issues, please open a GitHub issue or contact me on Discord.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
