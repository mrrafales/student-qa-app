# Student Q&A App - Deployment Instructions for Vercel

## What You're Deploying
This is your Student Q&A app where students can enter codes to answer questions and you can view their responses.

---

## Step-by-Step Deployment to Vercel

### Step 1: Download This Folder
Download all the files in this `student-qa-vercel` folder to your computer.

### Step 2: Create a Vercel Account
1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Sign up with GitHub, GitLab, Bitbucket, or email (GitHub is recommended and easiest)
4. Follow the prompts to create your account (it's completely free)

### Step 3: Deploy Your App
1. Once logged into Vercel, you'll see your dashboard
2. Click the **"Add New..."** button (top right)
3. Select **"Project"**
4. You have two options:

   **Option A: Drag & Drop (Easiest)**
   - Look for "Import Third-Party Git Repository" section or drag and drop area
   - Drag the entire `student-qa-vercel` folder onto the page
   - OR click "Browse" and select the folder
   
   **Option B: Use GitHub (Recommended for easy updates)**
   - First, create a free GitHub account at https://github.com
   - Upload your `student-qa-vercel` folder to a new repository
   - In Vercel, connect your GitHub account
   - Import the repository you just created

5. Vercel will detect it's a Vite app automatically
6. Click **"Deploy"**
7. Wait 1-2 minutes while it builds (you'll see a progress screen)
8. **Done!** You'll get a URL like: `https://student-qa-app-abc123.vercel.app`

### Step 4: Share With Students
- Give students the URL Vercel provided
- They can bookmark it and use it anytime!

---

## Optional: Use Your Own Domain

If you want to use something like `app.mrrafales.com`:

1. In Vercel, go to your project settings
2. Click **"Domains"**
3. Add your custom domain
4. Follow Vercel's instructions to add a DNS record in GoDaddy
5. This usually takes 5-15 minutes to activate

**Simple DNS Setup:**
- In GoDaddy, add a CNAME record:
  - Type: CNAME
  - Name: app (or whatever subdomain you want)
  - Value: cname.vercel-dns.com
  - TTL: 1 Hour

---

## Making Updates Later

### If you used drag & drop:
1. Make changes to your local files
2. Go to Vercel dashboard
3. Drag the updated folder again (it will update, not create a new project)

### If you used GitHub:
1. Update files in your GitHub repository
2. Vercel automatically redeploys within seconds!
3. This is why GitHub is recommended

---

## Important Notes

⚠️ **Data Storage**: Right now, responses are stored in browser memory and will reset when you refresh. This is a PROTOTYPE.

For production use with permanent data storage:
- You'll need to set up a database (like Google Sheets integration)
- We can add this in Step 4 if you want

---

## Testing Your Deployment

1. Go to your Vercel URL
2. Switch to Student View
3. Try code: MATH01 or SCI02
4. Submit an answer
5. Switch to Teacher View
6. Click "View Responses"
7. You should see your test answer!

---

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- If you get stuck, take a screenshot of any error messages

---

## Your App Features

✅ Students enter codes to see questions
✅ Students submit answers with their names  
✅ Teachers create questions with custom codes
✅ Teachers view all student responses
✅ Real-time response tracking

**Current Limitation**: Responses reset on page refresh (we'll fix this in Step 4 if you want permanent storage)
