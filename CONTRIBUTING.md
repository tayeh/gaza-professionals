# Contributing to Gaza Professionals Directory

Thank you for your interest in contributing to the Gaza Professionals Directory! This guide will walk you through the process of adding your profile to our community directory.

## 🎯 Who Can Contribute

- **Gaza Residents**: Individuals living in Gaza
- **Gaza-based Companies**: Businesses operating in Gaza
- **Gaza Service Providers**: Freelancers and service providers based in Gaza
- **Gaza Diaspora**: Professionals originally from Gaza (with clear indication)

## 📝 Step-by-Step Guide

### Step 1: Fork the Repository

1. Go to [https://github.com/tayeh/gaza-professionals](https://github.com/tayeh/gaza-professionals)
2. Click the **"Fork"** button in the top-right corner
3. This creates a copy of the repository in your GitHub account

### Step 2: Clone Your Fork

```bash
# Replace 'your-username' with your GitHub username
git clone https://github.com/your-username/gaza-professionals.git
cd gaza-professionals
```

### Step 3: Create Your Profile

#### For Professionals:
```bash
# Copy the template
cp templates/profile-template.yml profiles/your-name.yml

# Edit the file with your information
nano profiles/your-name.yml
```

#### For Companies:
```bash
# Copy the template
cp templates/profile-template.yml profiles/your-company-name.yml

# Edit the file with your information
nano profiles/your-company-name.yml
```

### Step 4: Commit Your Changes

```bash
# Add your new file
git add .

# Commit with a descriptive message
git commit -m "Add [Your Name] to professionals directory"

# Push to your fork
git push origin main
```

### Step 5: Create a Pull Request

1. Go to your forked repository on GitHub
2. Click **"New Pull Request"**
3. Add a clear title: `Add [Your Name/Company] to [Directory Type]`
4. Fill out the pull request template
5. Click **"Create Pull Request"**

## 📋 Pull Request Template

When creating your pull request, please include:

```markdown
## Type of Contribution
- [ ] New Professional Profile
- [ ] New Company Profile  
- [ ] Update Existing Profile
- [ ] Fix/Improvement

## Profile Information
- **Name/Company**: [Your Name or Company Name]
- **Category**: [Your profession/industry]
- **Location**: [Your location in Gaza]

## Verification
- [ ] I am a Gaza resident/operate in Gaza
- [ ] I have included accurate information
- [ ] I have proof of residency/operation (will provide if requested)
- [ ] I agree to keep my information updated

## Additional Notes
[Any additional information or special circumstances]
```

## ✅ Review Process

1. **Automated Checks**: Our system will check file format and structure
2. **Community Review**: Other contributors may review your submission
3. **Verification**: We may request proof of Gaza residency/operation
4. **Approval**: Once approved, your profile goes live on the website

## 🔄 Updating Your Profile

To update your existing profile:

1. Fork the repository (if you haven't already)
2. Edit your existing `.yml` file
3. Commit and push your changes
4. Create a new pull request with title: `Update [Your Name] profile`

## 📁 File Naming Conventions

### Professionals
- Format: `firstname-lastname.yml`
- Example: `ahmed-al-rashid.yml`

### Companies  
- Format: `company-name.yml`
- Example: `gaza-tech-solutions.yml`

## 🚫 What Not to Include

- Personal phone numbers (use email/LinkedIn instead)
- Inappropriate or unprofessional content
- False or misleading information
- Copyrighted images without permission
- Political statements or controversial content

## 🆘 Need Help?

### Common Issues

**Q: I'm new to Git/GitHub. How do I get started?**
A: Check out [GitHub's Hello World Guide](https://guides.github.com/activities/hello-world/) for beginners.

**Q: My pull request was rejected. What should I do?**
A: Read the feedback comments and make the requested changes, then update your pull request.

**Q: How do I add images to my profile?**
A: Upload images to a service like [Imgur](https://imgur.com) or use your LinkedIn profile photo URL.

**Q: Can I include my portfolio/website links?**
A: Yes! Include relevant professional links in the designated fields.

### Getting Support

- **GitHub Issues**: [Report technical problems](https://github.com/tayeh/gaza-professionals/issues)
- **Discussions**: [Ask questions or get help](https://github.com/tayeh/gaza-professionals/discussions)
- **Email**: [info@gaza.ps](mailto:info@gaza.ps)

## 🏆 Recognition

Contributors who help improve the directory will be recognized in our:
- Monthly contributor highlights
- Annual community report
- Special mentions on social media

Thank you for helping build a stronger Gaza professional community! 🇵🇸