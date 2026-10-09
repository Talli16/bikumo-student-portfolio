# COS 106 — Bikumo Student Portfolio and Academic Management Website

A responsive five-page student portfolio created with semantic HTML, an external CSS stylesheet, and vanilla JavaScript.

## Pages

- `index.html` — Home page, biography introduction, navigation, and student photo placeholder.
- `about.html` — Educational background, career aspirations, skills, and interests.
- `projects.html` — Three sample projects, project images, a sample course table, and an HTML video element.
- `planner.html` — Add, complete, filter, and delete academic tasks. Tasks persist in the current browser using `localStorage`.
- `contact.html` — Required name, email, phone, and message fields with JavaScript validation.

## Before submitting: personalise the project

1. Replace every instance of **Bikumo** with your preferred display name.
2. Add your own photograph as `images/student-photo.jpg`. Use a JPG image, and keep that exact filename, or update the image path in `index.html`.
3. Edit the biography, previous education, skills, interests, career goals, and contact information so they are true for you.
4. Review the three sample projects. Keep them labelled as practice examples until you have built and tested them yourself. Add your own screenshots if your lecturer expects screenshots of work you personally completed.
5. Edit the sample academic course table to reflect your actual courses. Do not describe illustrative data as official grades.
6. Test the planner and contact form. The contact form validates locally; it does **not** send messages to an email inbox because this project has no server/backend.
7. The sample video is hosted by MDN and may require an internet connection. Replace it only with media you have permission to use.

## Run the site on your computer

### Option A: Open directly
Open `index.html` in a modern browser. Most features will work. Some browser settings may limit local storage when files are opened directly.

### Option B: Use Visual Studio Code
1. Extract the ZIP file.
2. Open VS Code and choose **File → Open Folder**.
3. Select the extracted `Bikumo_Student_Portfolio` folder.
4. If you have the Live Server extension, right-click `index.html` and select **Open with Live Server**.
5. Test all five pages using the navigation menu.

No framework, build step, or package installation is required.

## Test checklist

- [ ] All five pages open and every navigation link works.
- [ ] The layout adapts to a narrow phone screen and a desktop screen.
- [ ] Your own photo appears on the home page.
- [ ] The projects page displays three project cards and images.
- [ ] The course table is readable and scrollable on narrow screens.
- [ ] The video controls appear; play it when online.
- [ ] Add a planner task, refresh the page, and confirm it remains.
- [ ] Mark a task completed, filter tasks, delete one task, clear completed tasks, and test Delete all.
- [ ] Submit the contact form empty and confirm required-field messages appear.
- [ ] Enter an invalid email and a phone number containing letters; confirm errors appear.
- [ ] Enter valid values and confirm the success message appears.
- [ ] Check browser developer tools for errors.

## Publish with GitHub Pages

1. Sign in to GitHub and create a **new public repository**, for example `cos106-student-portfolio`.
2. Extract the ZIP and open the project folder on your computer.
3. In the repository on GitHub, select **Add file → Upload files**.
4. Upload the contents of the project folder (the five HTML files, `style.css`, `script.js`, `README.md`, and the `images` folder). Upload the files inside the folder, not the ZIP archive alone.
5. Commit the uploaded files to the repository's `main` branch.
6. Open **Settings → Pages** in the repository.
7. Under the build/deployment settings, select **Deploy from a branch**, choose `main` and the `/(root)` folder, then save.
8. Wait for GitHub Pages to publish. The website address usually looks like `https://YOUR-USERNAME.github.io/cos106-student-portfolio/`. Use the exact address shown by GitHub in **Settings → Pages**.
9. Open the published link in a private/incognito browser window and test every page and feature.
10. Submit both the published website URL and the GitHub repository URL through your LMS.

## Important notes

- Do not publish private phone numbers, personal addresses, passwords, or student account details.
- GitHub Pages hosts static websites. The task planner stores data in the visitor's own browser; it does not synchronise across devices.
- The contact form is a front-end validation demonstration only. A real message-delivery form requires a backend or a trusted form service.
- Replace placeholders and understand the code before submission so you can explain your work if asked.
