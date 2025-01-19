# MIT Student Marketplace - Developer Documentation

## Project Overview
The MIT Student Marketplace is an online platform designed to address logistical and financial challenges faced by MIT students, particularly international students. By providing curated packages of essential items, exclusive discounts, and personalized recommendations, the platform aims to streamline the onboarding process while fostering a sense of community and inclusivity.

---

## Table of Contents
1. [Key Features](#key-features)
2. [System Architecture](#system-architecture)
3. [Installation Instructions](#installation-instructions)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)
7. [Contact Information](#contact-information)
8. [Future Enhancements](#future-enhancements)
9. [Wireframe Descriptions](#wireframe-descriptions)

---

## Key Features

1. **Curated Essentials Marketplace**
   - Categories: Kitchen appliances, furniture, electronics, and more.
   - Bundled Packages: Tailored for cultural and regional needs.

2. **Exclusive Discounts**
   - Vendor Partnerships: Bulk-buy deals to reduce student setup costs.
   - Student-Centric Discounts: Regular updates for budget-friendly shopping.
   - Seasonal Offers: Available during key periods, such as semester beginnings.

3. **Seamless User Experience**
   - User-Friendly Design: Intuitive navigation and search functionality.
   - One-Click Checkout: Quick and efficient purchase process.
   - Peer Reviews: Ratings and reviews from other MIT students.

4. **Secure Student Access**
   - Authentication: Robust login via Custom Authentication.
   - Login Options: MIT email-based authentication.
   - Enhanced Data Security: Ensures user data protection.

5. **Community Engagement**
   - Feedback System: Reviews and ratings foster collaboration.

---

## System Architecture

- **Frontend**
  - Technology: React.js for a dynamic and responsive user interface.

- **Backend**
  - API Framework: RESTful APIs built with Node.js and Express.js.

- **Database**
  - Solution: MongoDB for secure, scalable, and real-time data storage.

- **Authentication**
  - Provider: Custom Authentication for login and user management.

- **Payment Gateway**
  - Options: Razorpay for seamless and secure transactions.

- **Hosting**
  - Platform: Render and Vercel Hosting for efficient and reliable deployment.

---

## Installation Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sudhirbhargav/3361.git
   ```

2. **Install Dependencies**
   ```bash
   cd 3361
   npm install
   ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory.
   - Add your MongoDB configuration and other required variables.

4. **Run the Application**
   ```bash
   npm start
   ```

5. **Access the Application**
   - Open your browser and navigate to: [http://localhost:5173/](http://localhost:5173/)

---

## Usage

1. **User Registration**
   - Sign up using your MIT email.

2. **Browsing Products**
   - Explore predefined categories for curated packages.

3. **Checkout Process**
   - Utilize the one-click checkout feature for quick purchases.

4. **Leave Feedback**
   - Provide reviews and feedback to benefit the student community.

---

## Contributing

We welcome contributions! Follow these steps:

1. **Fork the Repository**
2. **Create a New Branch**
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Make Your Changes and Commit Them**
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/YourFeature
   ```
5. **Open a Pull Request**

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Contact Information

- **Name:** Sudhir Bhargav
- **Email:** [Sudhirbhargav100@gmail.com](mailto:Sudhirbhargav100@gmail.com)
- **GitHub:** [sudhirbhargav](https://github.com/sudhirbhargav)

---

## Future Enhancements

1. **Expansion of Services**
   - Rental Services: Textbooks and equipment rentals.
   - Mobile App: For iOS and Android platforms.
   - Multilingual Support: Cater to a diverse student population.

---

## Wireframe Descriptions

1. **Home Page Wireframe**
   - **Header:**
     - Logo on the left.
     - Navigation links: Home, Products, Orders, Log in button.
   - **Main Banner:**
     - A big image or carousel showing featured products or current deals.
     - A clear call-to-action button like "Shop Now".
   - **Curated Categories Section:**
     - A grid with icons or images for categories like Kitchen, Furniture, and Electronics.

2. **Products Wireframe**
   - **Filter Sidebar:**
     - Categories with radio buttons (e.g., Kitchen, Furniture, Electronics, Textbooks, Categories).
     - Price range slider to filter by budget.
     - Sort dropdown (e.g., by Price, Popularity).
   - **Product Grid:**
     - Each product has an image, name, price, and "Add to Cart" button.

3. **Product Detail Page Wireframe**
   - **Header:**
     - Same as the Home Page.
   - **Product Image:**
     - A large, clear product image is on the left.
   - **Product Details:**
     - The product name, price, description, and specs are on the right.
     - Ratings
     - "Add to Cart" buttons.
     - Quantity selector.
   - **Reviews Section:**
     - User reviews with star ratings and comments.

4. **Login/Sign Up Page Wireframe**
   - **Header:**
     - Same as the Home Page.
   - **Form Section:**
     - Sign-In Form: Fields for email and password, and a "Forgot Password?" link.
     - Sign Up Form: Fields for full name, email, phone number, and password.
     - A "Sign in" or "Sign Up" button.

5. **Cart Page Wireframe**
   - **Header:**
     - Same as the Home Page.
   - **Cart Items Section:**
     - List items with small images, names, prices, and quantity selectors.
     - Option to remove items from the cart.
   - **Summary Section:**
     - Total price, including taxes and discounts.
     - "Proceed to Checkout" button.

6. **Checkout Page Wireframe**
   - **Header:**
     - Same as the Home Page.
   - **Billing and Shipping Section:**
     - Input fields for address, contact details, and payment info.
   - **Order Summary:**
     - List of items with prices.
     - Final total cost with taxes.
   - **Payment Section:**
     - Options for credit/debit cards, Razorpay, or other methods.
     - "Place Order" button.

7. **Confirmation Page Wireframe**
   - **Header:**
     - Same as the Home Page.
   - **Message Section:**
     - A message like "Thank you for your order!".
     - Order details and estimated delivery date.
   - **Call-to-Action:**
     - Buttons to "Continue Shopping" or "View Order Details".

---

## Deployed Link

Access the live application here: [MIT Student Marketplace](https://mit-frontend-z7eo.vercel.app/)

## Project Walkthrough Video

Watch a detailed explanation of the entire project here: [MIT Student Marketplace Walkthrough](https://drive.google.com/drive/folders/1levlJVLcagD5c31PMpMX5l1yPAkU_TkG?usp=drive_link)
