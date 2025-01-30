# Curation Gallery

Welcome to the **Curation Gallery**, a web-based application that allows users to explore, save, and curate artworks from two museum and university collections.

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
   AUTH_SECRET=your_api_key_here
   GITHUB_ID=your_api_key_here
   GITHUB_SECRET=your_api_key_here
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

## Contact

For inquiries or support, reach out via email at `byteuth@gmail.com` or create an issue on GitHub.

Happy Exploring! 🎨
