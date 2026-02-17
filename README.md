# Salesforce LWC Address Lookup

A Salesforce Lightning Web Component that fetches address details using pincode and allows users to update the Account billing address with a modern UI and confirmation modal.

---

## 🚀 Features
- Fetch address details using pincode (India Post API)
- Clean Salesforce Lightning UI (SLDS based)
- Display multiple address results in cards
- Click any result to update Account billing address
- Enterprise modal confirmation popup
- Spinner loading and toast notifications
- Reset button to clear search and results
- Uses Lightning UI Record API (no Apex update needed)

---

## 🛠 Tech Stack
- Lightning Web Components (LWC)
- Apex Callout (External API Integration)
- Lightning UI Record API
- Salesforce Lightning Design System (SLDS)

---

## ⚙️ Setup Instructions
1. Deploy Apex class and LWC to your Salesforce org  
2. Add Remote Site Setting:  
   `https://api.postalpincode.in`  
3. Go to **Account Record Page → Edit Page**  
4. Drag the component onto the page  
5. Save and Activate  

---

## 📌 Usage
1. Enter a valid 6-digit pincode  
2. Click **Search**  
3. Select any address card  
4. Confirm in modal popup  
5. Account Billing Address updates automatically  

---

## 🎯 Use Case
Helps users quickly fetch accurate address details and update Account billing address directly from the record page.

---

## 👨‍💻 Author
Built as a real-world Salesforce LWC project for learning and portfolio demonstration.
