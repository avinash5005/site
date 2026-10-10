{
  "name": "hs-webcraft-site",
  "private": true,
  "scripts": {
    "build": "tailwindcss -i ./input.css -o ./tailwind.css --minify",
    "watch": "tailwindcss -i ./input.css -o ./tailwind.css --watch"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.17"
  }
}