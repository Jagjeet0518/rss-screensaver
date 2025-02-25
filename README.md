# RSS Screensaver

A sleek, modern RSS feed screensaver built with Next.js and React. This application fetches and displays RSS feed items with smooth transitions and a starry background, perfect for turning idle screens into informative displays.

![RSS Screensaver Main Screen](https://ik.imagekit.io/snippy/rss-screensaver-main.png)

![RSS Screensaver Demo](https://ik.imagekit.io/snippy/rss-screensaver-demo.png)  

## Key Features
- **Dynamic RSS Fetching**: Enter any valid RSS feed URL to display its content.
- **Auto-Cycling**: Automatically cycles through feed items every 10 seconds.
- **Smooth Transitions**: Elegant fade and slide animations for feed changes.
- **Starry Background**: Randomized starfield effect using CSS custom properties.
- **Responsive Design**: Adapts seamlessly to different screen sizes.
- **Error Handling**: User-friendly error messages via toast notifications.
- **Navigation**: Manual control with previous/next buttons.

## Tech Stack
- **Next.js**: For server-side rendering and routing.
- **React**: For building the UI and managing state.
- **Zod**: For URL validation.
- **RSS-Parser**: To parse RSS feed data.
- **Tailwind CSS**: For styling.

## Installation

Clone the repository:
   ```bash
   git clone https://github.com/Jagjeet0518/rss-screensaver.git
   cd rss-screensaver
   ```

Install dependencies:
   ```bash
   npm install
   ```

Run the development server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser to see the app in action.

## Usage
 1. Launch the app.
 2. Enter a valid RSS feed URL (e.g., https://example.com/feed).
 3. Click "Fetch RSS Feed" to load and display the feed.
 4. Use the left/right arrows to navigate manually, or let it auto-cycle every 10 seconds.

## Example RSS Feeds
- NY Times Technology: https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml
- Tech Radar: https://www.techradar.com/rss
- BBC News: http://feeds.bbci.co.uk/news/rss.xml

####
License
This project is licensed under the MIT License. See the LICENSE file for details.

---
####
⭐ If you like this project, give it a star on GitHub!