# Octoprint Camera Viewer

The reason I created this project was that I wanted to share to my friends a live camera feed showing the status of my print and other metrics. However, my [OctoPrint](https://octoprint.org/) instance (which controls my printer and webcam) is behind an authentication gateway, courtesy of my [Kubernetes Homelab Tutorial](https://github.com/DavidIlie/kubernetes-setup/tree/master/8%20-%20authelia).

As opposed to my other projects, I decided to use [Express.js](https://expressjs.com/) and [ejs](https://ejs.co/) as there was no need for a client/server design.

# Prerequisites

You will need an active [OctoPrint](https://octoprint.org/) instance (by pluggin a webcam into your Pi/Device) running which can be accessed from its IP (not hostname). Afterwards, you need to create a profile API key by clicking on your account on the top right > User Settings > Application Key > create an API key

With those values create a .env file matching this format and fill in your values:

```env
OCTO_PRINT_URL=http://192.168.1.123
OCTO_PRINT_API_KEY=apsdhnpaisdbasiodabdoiasdb
PORT=5612
```

Afterwards you should be able to run the app and visit it on `http://localhost:5612` and see the status of your printer:

```bash
yarn
yarn dev
```
