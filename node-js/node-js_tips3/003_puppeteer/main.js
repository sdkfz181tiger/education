// Puppeteer
// 1, Chromiumをダウンロード
// 	sudo apt-get install chromium
// 2, インストール先のパスを確認(/usr/bin/chromium)
// 	dpkg -L chromium

console.log("Hello puppeteer");
const puppeteer = require("puppeteer");

(async () => {
	const browser = await puppeteer.launch({executablePath: "/usr/bin/chromium"});
	const page = await browser.newPage();

	try {
	await page.goto("https://www.youtube.com/watch?v=ezIdU_xIdgY");
	await page.screenshot({ path: "./image.png" });
	} catch (err) {
		console.log(err);
	} finally {
		await browser.close();
	}
})();