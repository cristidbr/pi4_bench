# Raspberry Pi 4 RAM partition benchmark

This is a repository for measuring loading time of Chromium on Raspberry Pi 4. Complete [writeup is available here](https://hbfsrobotics.com/blog/accelerating-raspberry-pi-4-applications-ram-drive).

## Usage

Follow the tutorial above on how to create and prepare the RAM disk. 

Install the required dependencies
```sh
npm install puppeteer
```

Run the script with the desired number of test runs. Provide the admin password when prompted.
```sh
node benchmark.js --runs 100
```

Results will be stored into `bench.json`. Chromium launch path can be modified by tweaking `executablePath` parameter within `benchmark.js`.

## License (MIT)
Copyright (C) 2019 Cristian Dobre
