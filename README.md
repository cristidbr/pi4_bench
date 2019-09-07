# Raspberry Pi 4 RAM partition benchmark

This is a repository for measuring loading time of Chromium on Raspberry Pi 4. Complete [writeup is available here](https://hbfsrobotics.com/blog/accelerating-raspberry-pi-4-applications-ram-drive).

# Usage

Install the required dependencies
`npm install puppeteer`

Run the script with the desired number of test runs. Provide the admin password when prompted.
`node benchmark.js --runs 100`

Results will be stored into `bench.json`