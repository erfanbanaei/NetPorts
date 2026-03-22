# Contributing to Network Ports Reference

## راهنمای مشارکت | Contribution Guide

---

### 🇮🇷 فارسی

#### چطور یه پروتکل جدید اضافه کنیم؟

۱. روی دکمه **"افزودن پروتکل"** در سایت کلیک کن
۲. یا مستقیم به [Issues](../../issues/new?template=add_protocol.yml) برو
۳. فرم را پر کن — حداقل پورت، نام، نوع transport و توضیح انگلیسی لازمه
۴. Submit کن، ما بررسی می‌کنیم و اضافه می‌کنیم

#### قوانین

- پورت نباید از قبل توی لیست باشه
- شماره پورت باید معتبر باشه (IANA، RFC، یا استفاده گسترده)
- توضیح باید مختصر و واضح باشه (حداکثر ۱۰ کلمه)

---

### 🇬🇧 English

#### How to add a new protocol?

1. Click the **"Add Protocol"** button on the site
2. Or go directly to [Issues](../../issues/new?template=add_protocol.yml)
3. Fill out the form — port, name, transport type and English description are required
4. Submit — we'll review and add it

#### Rules

- Port must not already exist in the list
- Port number must be valid (IANA, RFC, or widely used)
- Description must be brief and clear (max ~10 words)

---

### 📁 File Structure

```
├── app/
│   └── lib/
│       └── protocols.ts        ← all protocol data lives here
├── components/
│   └── ProtocolGrid.tsx        ← main UI component
└── .github/
    └── ISSUE_TEMPLATE/
        └── add_protocol.yml    ← issue form template
```

### 🔧 How to add directly via Pull Request

If you prefer a PR, edit `app/lib/protocols.ts` and add your entry:

```ts
{
  port: 1234,
  name: "My Protocol",
  abbreviation: "MP",
  description: {
    fa: "توضیح فارسی",
    en: "English description"
  },
  category: { fa: "دسته‌بندی", en: "Category" },
  transport: "TCP",  // TCP | UDP | TCP/UDP
},
```

Also add the abbreviation to `getFullName()` mapping at the bottom of the file.