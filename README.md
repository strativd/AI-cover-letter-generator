# AI Cover Letter Generator using ChatGPT 🤖

Create personalized cover letters for LinkedIn jobs based on a cover letter template ✨

![LinkedIn ChatGPT Logo](/public/icon.png)

The extenison securely saves your resume, cover letter template, and OpenAI API key, allowing you to generate personalized cover letters based on job descriptions from LinkedIn pages. This will save you time and help you craft a cover letter for every job application. Like most AI tools, the results aren't perfect but it's a great starting point!

## 🚀 Features

- Automatically generates personalized cover letters based on job descriptions 📝
- Saves the most recent cover letter locally with copy-to-clipboard feature 📄
- Securely saves your resume, template, and OpenAI API key for future access 🔒
- Integrates seamlessly with multiple LinkedIn job pages 🌐
- User-friendly interface for easy cover letter generation 🎨

## 📥 Installation

> **Note**: Make sure you have Node.js, `npm`, `pnpm`, and the [`git` CLI](https://cli.github.com/) installed on your machine before proceeding with the installation steps.

1. Clone the repository to your local machine:

```bash
gh repo clone strativd/AI-cover-letter-generator
```

2. Navigate to the project directory:

```bash
cd AI-cover-letter-generator
```

3. Install the project dependencies:

```bash
pnpm install
```

4. Build the extension into the /public folder:

```bash
pnpm build
```

5. Open Google Chrome and go to `chrome://extensions`:

```bash
open -a "Google Chrome" chrome://extensions
```

6. Enable the "Developer mode" toggle in the top right corner.

7. Install the local extension:

- Click on "Load unpacked" in the top left corner.
- Select the `public` directory inside the project directory.

## Setup ⚙️

> **Note**: You'll need to [create an OpenAI API key](https://platform.openai.com/api-keys) and add some funds to your [billing settings](https://platform.openai.com/account/billing/overview) to get responses from OpenAI, but it's pretty cheap to run this extension!

1. Click on the extension's icon after it's been installed -> <img src="/public/favicon.ico" alt="Extension Icon" width="30px" />

2. Click on the settings icon -> ⚙️

3. Add your OpenAI API key 🔑

4. Add your resume (text format) 📝

5. Add your cover letter tempate, leaving blanks for ChatGPT to fill in 🤖

<details>
  <summary>See example template 👀</summary>

Hi \_\_\_,

I’m a huge fan of what you’re doing at \_\_\_! I was very inspired by \_\_\_. I know it’s hard finding the right person, so I’ll keep this brief. Here are 5 reasons I think you should consider me for the \_\_\_ role:

1.
2.
3.
4.
5.

</details>

### 📸 Screenshot

![LinkedIn ChatGPT Logo](/public/screenshot.png)

## 🎥 Demo and Tutorial

A step-by-step tutorial on how to build this Chrome extension yourself can be found on YouTube: [How to Build LinkedIn ChatGPT Chrome Extension](https://www.youtube.com/watch?v=I3NUkWeHTNk), thanks to Brandon Hancock! — https://github.com/bhancockio 👏

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://chat.openai.com/LICENSE) file for details.
