# Artscape

Welcome to **Artscape**, a web-based application that allows users to explore, save, and curate artworks from two museum and university collections.
![image](https://github.com/user-attachments/assets/79ce8121-8e1b-4187-ab3f-45169e26a530)

## Features

- **Search Artworks**: Users can search artworks by keywords (e.g., "Cats", "Forest", "Paintings").
- **Browse Artworks**: Navigate through paginated results with "Previous" and "Next" buttons.
- **Filter & Sort**: Refine search results by Source, Medium, Material, or Artwork Source (e.g., Met Museum, Harvard Museum).
- **View Artwork Details**: Click on an artwork to see images, title, artist, creation date, and museum information.
- **Save to Collection**: Save artworks to a temporary or existing collection.
- **Manage Saved Exhibitions**: Access saved exhibitions via the "Saved" button in the navigation bar.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**
- **npm** or **yarn**
- **Git** (optional, for cloning the repository)

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/artworks-discovery-platform.git
   cd artworks-discovery-platform
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and configure the following API keys:

   ```env
   NEXT_PUBLIC_CLIENT_ID=your_api_key_here
   NEXT_PUBLIC_CLIENT_SECRET=your_api_key_here
   AUTH_SECRET=your_api_key_here //Harvard Museum API key
   ```

4. **Run the Development Server**
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

---

## Deployment

To deploy the app:

1. **Build the Project**

   ```bash
   npm run build
   ```

2. **Deploy to a Hosting Service** (e.g., Vercel, Netlify, etc)
   - Follow the deployment instructions specific to your hosting provider.

---



# Tech Stack

## Frontend
- React
- Next.js
- TailwindCSS
- Radix UI
- Embla Carousel
- GSAP
- React Medium Image Zoom

## Backend
- Next.js
- NextAuth.js
- Prisma
- bcrypt

## Languages
- TypeScript
- SQL

## Database
- Prisma ORM
- PostgreSQL

## Git
- Git
- GitHub

# Images

![image](https://github.com/user-attachments/assets/0e5e507a-ba48-47e4-96be-d0674be515fc)
![image](https://github.com/user-attachments/assets/b9c4570e-10cd-4aac-8434-4df96eafa8f1)
![image](https://github.com/user-attachments/assets/c03569ff-d604-4c0c-91f2-0c8f703e9743)
![image](https://github.com/user-attachments/assets/031dd0ea-93eb-48e1-9106-df1bae460f70)







## Contact

For inquiries or support, reach out via email at `byteuth@gmail.com` or create an issue on GitHub.

Happy Exploring! 🎨
