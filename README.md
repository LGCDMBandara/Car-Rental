# Car Rental Web App  
---

## Project Summary
- *Home Page*: Company introduction, “Get Started” button, and car listings with images and prices.  
- *Car Details Page: Detailed information with multiple images, specifications, features, and a **Book Now* button.  
- *Booking Page*: Booking form with user details, pickup/return dates, automatic price calculation, and confirmation.  
- *Bookings Page*: Protected page showing the logged-in user’s booking history.  
- *Authentication: Handled entirely with **Firebase Authentication (Email/Password)*.  
- *Footer*: Social media links (Facebook, Instagram, Twitter, LinkedIn).  

---

## Features
- Firebase authentication (login, register, logout).  
- Browse cars on the home page with images and prices.  
- View car details with gallery, specifications, and features.  
- Book a car with validation and automatic rental cost calculation.  
- Protected booking page.  
- Responsive UI with Tailwind CSS.  
- Global state management with Redux Toolkit.
- Car details in a json file. 
- Backend with Node.js + MongoDB for bookings.  

---

## Tech Stack
- *Frontend*: Next.js, TypeScript, Tailwind CSS, Redux Toolkit  
- *Backend*: Node.js, Express, MongoDB  
- *Authentication*: Firebase Authentication  
- *Deployment*: Vercel(frontend), Railway(backend)  

---


## Frontend — Pages & Routes
- / → Home page (company intro, cars, Get Started, footer)  
- /cars/[id] → Car details page with images, specs, and Book Now  
- /booking → Booking form with validation and cost calculation  
- /bookings → Protected booking history (only for logged-in users)  
- /auth/login & /auth/register → Firebase authentication  

---

## Backend — API Overview
- *Cars*: List cars, get car details  
- *Bookings*: Create booking, view user’s bookings  

*Data Models*:
- *Car*: name, description, price per day, images, specifications, features  
- *Booking*: user ID, car ID, pickup & return dates, duration, total cost  
- *User*: handled by Firebase Authentication  

---

## Booking Calculation Logic
- User selects pickup and return dates.  
- Duration in days is calculated.  
- Total amount = *duration × price per day*.  
- Validation ensures return date is later than pickup date.  

---

## Authentication
- Only *Firebase Authentication* (Email/Password).  
- Protected routes check Firebase user status.  

---

## State Management (Redux Toolkit)
- *authSlice* → Firebase user state  
- *carsSlice* → Car listings and selected car details  

---

## Validation & Error Handling
- Validate required fields, email format, phone number, and date ranges.  
- User-friendly error messages shown for invalid inputs.  

---

## Deployment
- Frontend → Vercel 
- Backend → Railway  
- Configure environment variables in both platforms  
- Update frontend with backend API URL + Firebase keys  

---

## Testing & Quality Checks  
- API endpoint integration tests.  
- Code linting and formatting with *ESLint*.  
- Responsive UI testing across multiple devices.  

---



## Submission Deliverables
- GitHub repository link (code with README file ) -  
- Live deployed app link -    
- Example seed data (cars JSON or Firestore seed)
  
---
