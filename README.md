# Keep

## Introduction

Welcome to "Keep" – an innovative application designed to help you manage your thoughts, keep track of tasks, and understand yourself better. This app leverages the power of React, Next.js, and Supabase to create a seamless and interactive user experience.

## Features

- **Daily Card Management**: Add and view cards daily, each containing a title, image, optional link, and description.
- **User Authentication**: Secure login and registration functionality to ensure data privacy.
- **Responsive Design**: A seamless experience across all devices, whether you're on desktop or mobile.
- **Masonry Grid Layout**: Visually appealing card layout that adapts to different screen sizes.
- **Interactive Card Flipping**: Click on a card to flip and reveal more details, including the description and link.
- **User-Specific Data**: Each user's data is isolated, ensuring privacy and security.

## Installation and Setup

To run "Keep" on your local machine, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/your-username/keep.git
   ```

2. Navigate to the project directory:

   ```
   cd keep
   ```

3. Install the necessary dependencies:

   ```
   npm install
   ```

4. Set up environment variables:

   Create a `.env.local` file in the root directory and add the necessary Supabase credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_SERVICE=your_supabase_service_key
   ```

5. Run the application:

   ```
   npm run dev
   ```

   The app will be running on `http://localhost:3000`.

## Usage

- **Adding a Card**: Click on the "Add Card" button, fill in the details, and submit to create a new card.
- **Viewing Cards**: Cards are displayed on the main page and can be flipped to reveal more information.
- **Deleting a Card**: Click on the "Remove" button on the back of the card to delete it.

## Contributing

Contributions to "Keep" are always welcome, whether it's improving documentation, bug fixes, or new features. Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute.

## License

"Keep" is released under the [MIT License](LICENSE). Feel free to use it in your projects.

---

Built with ❤️ using React, Next.js, and Supabase.

---
