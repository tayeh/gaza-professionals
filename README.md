# Gaza Professionals Directory

A comprehensive directory of Gaza professionals and companies with YAML-based profiles and dynamic profile pages.

## 🌟 About

The Gaza Professionals Directory is an open-source community project that showcases the incredible talent and innovative companies in Gaza. Our mission is to bridge the gap between local expertise and international opportunities.

## 📊 Current Statistics


*Last updated: 06/07/2025*

## 🏆 Contributor Badge

Show your membership in Gaza's professional community! Once your profile is approved, you can use this badge on your website, social media, or email signature:

<div align="center">
  <img src="https://gaza.ps/public/badge-template.svg" alt="Gaza Directory Contributor Badge" width="200">
</div>


## 🚀 Quick Start

Visit our live directory at: [https://gaza.ps](https://gaza.ps)

## 📁 Repository Structure

```
├── profiles/                  # YAML profile files
│   ├── tayeh.yml             # Professional profile example
│   ├── fatima-hassan.yml     # Professional profile example
│   └── gaza-tech-solutions.yml # Company profile example
├── templates/                # Profile templates
│   └── profile-template.yml  # YAML template for new profiles
├── src/                      # React application source
└── docs/                     # Documentation and guidelines
```

## 🤝 How to Contribute

### Step 1: Fork the Repository
Fork this repository to your GitHub account.

### Step 2: Create Your Profile
1. Copy `templates/profile-template.yml` to `profiles/your-slug.yml`
2. Fill in your information following the template
3. Remove all comments before submitting

### Step 3: Submit Pull Request
1. Commit your new profile file
2. Submit a Pull Request with your information
3. ~~Include verification documents (Gaza ID or proof of residence)~~

## 📋 Profile File Format

### Example Professional Profile (tayeh.yml)

```yaml
slug: tayeh
name: Mohammed Tayeh
type: professional
title: DevOps Engineer
location: Gaza City, Gaza
services:
  - Kubernetes Consulting
  - CI/CD Pipelines
  - Cloud Infrastructure
tags: [devops, kubernetes, cloud]
contact:
  email: tayeh@example.com
  website: https://tayeh.dev
  github: https://github.com/tayeh

about: |
  I am a DevOps Engineer with 7+ years of experience...

technical_skills:
  - Kubernetes
  - AWS
  - Terraform

work_experience:
  - company: Arabsstock
    role: Senior DevOps Engineer
    period: 2021 - Present
    description: |
      Leading infrastructure and platform engineering...

certifications:
  - name: AWS Certified DevOps Engineer – Professional
    issuer: Amazon Web Services
    date: 2023-08

projects:
  - name: DevOps Bootstrapping Kit
    url: https://github.com/tayeh/devops-kit
    description: |
      A starter kit for setting up CI/CD...
```

### Example Company Profile

```yaml
slug: gaza-tech-solutions
name: Gaza Tech Solutions
name_arabic: حلول غزة التقنية
type: company
industry: Technology
location: Gaza City, Gaza
company_size: medium
founded: 2019
services:
  - Web Development
  - Mobile App Development
  - Cloud Solutions
tags: [web, mobile, cloud, react, nodejs]
contact:
  email: info@gazatech.com
  website: https://gazatech.com

about: |
  Leading technology company in Gaza...

technical_expertise:
  - React & Next.js
  - Node.js & Express
  - AWS & Azure

team:
  size: 25
  roles:
    - Full Stack Developers
    - Mobile Developers
    - DevOps Engineers

notable_projects:
  - name: Gaza Municipality Portal
    description: |
      Digital transformation of municipal services...
```

## ✨ Features

### Dynamic Profile Pages
- Automatically generated profile pages (e.g., `/tayeh`)
- Responsive design for all devices
- Optional sections only displayed if they exist
- Bilingual support (Arabic/English)

### Profile Sections
- **Basic Information**: Name, title, location, contact
- **About**: Comprehensive description
- **Services**: What you offer
- **Technical Skills/Expertise**: Your technical capabilities
- **Work Experience**: Professional history (professionals)
- **Team Information**: Team size and roles (companies)
- **Projects**: Notable work and achievements
- **Certifications**: Professional certifications
- **Tags**: Relevant keywords for discovery

### Search & Filter
- Full-text search across all profile fields
- Filter by type (professional/company)
- Filter by location, skills, and tags
- Sort by name or other criteria

### SEO & Social Sharing
- Dynamic meta tags for each profile
- Open Graph support for rich social media previews
- Twitter Card optimization
- Automatic sitemap generation
- Structured data for search engines

## 📋 Requirements

- Must be Gaza resident or operate in Gaza
- Provide accurate and current information
- ~~Include proof of residency/operation~~
- Follow professional formatting guidelines
- Maintain updated information via new PRs

## 🛠️ Development

This website is built with:
- **React** + **TypeScript**
- **Tailwind CSS** for styling
- **Vite** for development
- **YAML** for profile data
- **Netlify** for hosting

### Local Development

```bash
# Clone the repository
git clone https://github.com/tayeh/gaza-professionals.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📞 Support

- **Documentation**: Check our [contribution guide](./CONTRIBUTING.md)
- **Issues**: Report problems via [GitHub Issues](https://github.com/tayeh/gaza-professionals/issues)
- **Community**: Join our discussions in [GitHub Discussions](https://github.com/tayeh/gaza-professionals/discussions)
- **Contact**: Email us at [info@gaza.ps](mailto:info@gaza.ps)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Special thanks to all Gaza professionals and companies who contribute to making this directory a valuable resource for our community.

---

**Made with ❤️ for the Gaza community**