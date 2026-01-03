Here’s your **TruthBeTold tech stack**, clean and crisp — exactly the way you’ve been building it.

This is the *canonical* version you can refer back to anytime.

---

# 🚀 **TruthBeTold — Official Tech Stack**

## **📱 Frontend (Mobile App)**
- **React Native**
- **Expo**
- **TypeScript**
- **Expo Router** (recommended for clean navigation)
- **Supabase JS client** for API + auth

This gives you:
- Fast iteration  
- Instant OTA updates  
- Mobile‑first viral UX  
- Zero backend boilerplate  

---

## **🧠 Backend (Serverless)**
### **Supabase Cloud**
- **Postgres** (primary database)
- **Row‑Level Security** (RLS)
- **Supabase Edge Functions** (your scoring engine)
- **Supabase Auth** (future user accounts)
- **Supabase Storage** (share cards, assets)
- **Supabase Realtime** (optional)

This replaces:
- Express  
- Node servers  
- Docker  
- Custom APIs  

You don’t need any of that.

---

## **⚙️ Scoring Engine**
- **Supabase Edge Function (Deno)**  
- Written in **TypeScript**  
- Stateless, fast, cheap  
- Deployed directly to Supabase Cloud  
- Invoked from the mobile app via `supabase.functions.invoke()`

This is where the **TruthBeTold Score** lives.

---

## **🗄️ Database**
### **Tables**
- `rent_inputs`  
- `scores`  

### **Features**
- RLS enabled  
- Anonymous insert policies for MVP  
- Cloud‑hosted (no Docker needed)  

---

## **🔧 Dev Environment**
- **Cloud‑only Supabase** (no local Docker)
- **Local Expo dev server**
- **Local Jest/Deno tests** for scoring logic
- **Shared folder** for types + constants

---

## **🛠️ Tooling**
- **TypeScript** everywhere  
- **GitHub** for version control  
- **VS Code**  
- **Thunder Client / Postman** for API testing  
- **Expo Go** for mobile testing  

---

## **🎨 Design / UX**
- **Figma** (wireframes + share cards)
- **React Native components** for UI
- **Brand voice + emotional UX** baked into copy

---

# 🎯 **TL;DR — Your Stack in One Line**
**React Native + Expo (frontend) → Supabase Cloud (backend + DB + scoring engine) → TypeScript everywhere.**

