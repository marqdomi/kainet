# 🚨 Security Incident Response - Secrets Exposure

**Status:** `CRITICAL` - Action Required  
**Date:** October 21, 2025  
**Incident:** API Keys and secrets exposed in GitHub repository  

---

## 📋 Affected Secrets

### 1. **GEMINI_API_KEY** ⚠️ COMPROMISED
- **Location:** `mcp-server/news-aggregator/.env` (now removed from git)
- **Value:** `REDACTED_API_KEY`
- **Access Level:** Full Google AI API access
- **Status:** 🔴 **MUST BE ROTATED**

### 2. **SUPABASE_SERVICE_KEY** ⚠️ COMPROMISED
- **Location:** `mcp-server/news-aggregator/.env` (now removed from git)
- **Type:** JWT Token with service_role
- **Access Level:** Full database access (can read/write all data)
- **Status:** 🔴 **MUST BE ROTATED**

### 3. **RESEND_API_KEY** ⚠️ COMPROMISED
- **Location:** `.env.local` (now removed from git)
- **Access Level:** Email sending capabilities
- **Status:** 🔴 **MUST BE ROTATED**

### 4. **SUPABASE_URL** ⚠️ PARTIALLY EXPOSED
- **Location:** Multiple files (now removed from git)
- **Value:** `https://tqdencmzezjevnntifos.supabase.co`
- **Access Level:** Project identifier (low risk, but known)
- **Status:** 🟡 **Monitor for suspicious activity**

---

## ✅ Actions Already Taken

1. ✅ Added `.env`, `.env.local`, `*.env.local` to `.gitignore`
2. ✅ Removed `.env.local` from git tracking
3. ✅ Removed `mcp-server/news-aggregator/.env` from git tracking
4. ✅ Committed security fixes
5. ✅ Pushed to GitHub

---

## 🔧 Actions YOU MUST TAKE NOW

### 1. Rotate GEMINI_API_KEY
```
1. Go to: https://aistudio.google.com/app/apikeys
2. Delete the old key: REDACTED_API_KEY
3. Create a new API key
4. Update in: mcp-server/news-aggregator/.env
```

### 2. Rotate SUPABASE_SERVICE_KEY
```
1. Go to: https://app.supabase.com
2. Select your project: "kainet"
3. Navigate to: Settings > API > Service Role Key
4. Click "Rotate" or generate new key
5. Update in: mcp-server/news-aggregator/.env
```

### 3. Rotate RESEND_API_KEY
```
1. Go to: https://resend.com/api-keys
2. Delete the old key
3. Create a new API key
4. Update in: .env.local
5. Also update in Vercel/hosting platform environment variables
```

### 4. Audit GitHub Secret Scanning
```
1. Go to: https://github.com/marqdomi/kainet/settings/security
2. Look for "Secret scanning" or "Security alerts"
3. Review any detected secrets
4. Verify they've been rotated
```

---

## 📝 Files Now Protected

These files should NEVER be committed:
- `.env`
- `.env.local`
- `.env.development.local`
- `.env.production.local`
- `mcp-server/news-aggregator/.env`

They are now in `.gitignore` ✅

---

## 🛡️ Prevention Steps

### For Development:
1. **Always use `.env.local`** for local secrets (never commit)
2. **Use `.env.example`** for sharing structure with team
3. **Check `.gitignore`** before committing

### For CI/CD:
1. **GitHub Actions:** Use repository secrets, not `.env` files
2. **Vercel:** Use environment variables in project settings
3. **Never log secrets** in build output

### Template: `.env.example`
```bash
# .env.example - Share this, NOT .env.local
# Copy to .env.local and fill with your actual values

# Resend Email Service
RESEND_API_KEY=your_key_here

# Google Gemini API
GEMINI_API_KEY=your_key_here

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_key_here  # NEVER COMMIT
```

---

## 📞 Incident Timeline

| Time | Action |
|------|--------|
| Oct 21, 23:45 | Secrets found in `.env.local` and `mcp-server/news-aggregator/.env` |
| Oct 21, 23:50 | `.gitignore` updated |
| Oct 21, 23:51 | Files removed from git tracking |
| Oct 21, 23:52 | Security commit pushed |
| Oct 21, 23:53 | This document created |

---

## ⚠️ Important Notes

1. **Old commits still exist in history**
   - Secrets will still be visible in old commits on GitHub
   - Consider using: `git filter-branch` or `BFG Repo-Cleaner` if needed
   - For now, immediate key rotation is the priority

2. **Monitor Logs**
   - Check if any of these keys were used by unauthorized users
   - Monitor Gemini API usage for unusual activity
   - Monitor Supabase for unauthorized database access

3. **Team Communication**
   - Notify team about rotation
   - Share new secrets securely (1password, etc.)
   - Update any deployment configs

---

## 🔗 Useful Links

- [GitHub Secret Scanning](https://github.com/marqdomi/kainet/settings/security)
- [Google AI API Keys](https://aistudio.google.com/app/apikeys)
- [Supabase API Settings](https://app.supabase.com/projects)
- [Resend API Keys](https://resend.com/api-keys)
- [Git BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)

---

**Status:** 🟡 CRITICAL - Awaiting manual key rotation  
**Next Review:** After all keys are rotated  
**Owner:** Marco Dominguez (@marcdomi)
