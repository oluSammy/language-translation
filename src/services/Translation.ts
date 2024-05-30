import puppeteer from "puppeteer";

export class Translation {

    public async translate(text: string, to?: string, from?: string): Promise<string> {
        const translatedText = await this.googleTranslate(text, to, from);
        return translatedText;
    }

    private async googleTranslate(text: string, to?: string, from?: string): Promise<string> {
        const browser = await puppeteer.launch({
            args: [
                "--disable-setuid-sandbox",
                "--no-sandbox",
                "--single-process",
                "--no-zygote",
            ],
            executablePath: "/usr/bin/google-chrome-stable",
        });

        // const browser = await puppeteer.launch({
        //     headless: false
        // })


        const page = await browser.newPage();

        let url = `https://translate.google.com/?text=${text}&op=translate`;
        if (from) {
            url = `https://translate.google.com/?sl=${from}&text=${text}&op=translate`;
        }
        if (to) {
            url = `https://translate.google.com/?sl=${from}&tl=${to}&text=${text}&op=translate`;
        }

        await page.goto(url);
        await page.waitForNetworkIdle({ idleTime: 10000 });

        const allH3s = await page.$$('h3')
        let parsedTranslatedTxt = ""

        await Promise.all(allH3s.map(async (div: any) => {
            const text = await div.evaluate((e: any) => e.textContent);
            if (text === "Translation result") {
                const firstSibling = await page.evaluateHandle((el: any) => el.nextElementSibling, div);
                const secondSibling = await page.evaluateHandle((el: any) => el.nextElementSibling, firstSibling);
                const thirdSibling = await page.evaluateHandle((el: any) => el.nextElementSibling, secondSibling);
                const fourthSibling = await page.evaluateHandle((el: any) => el.nextElementSibling, thirdSibling);
                const fifthSibling = await page.evaluateHandle((el: any) => el.nextElementSibling, fourthSibling);
                const sixthSibling = await page.evaluateHandle((el: any) => el.nextElementSibling, fifthSibling);

                const translatedText = await sixthSibling.evaluate((e: any) => e.textContent)
                parsedTranslatedTxt = translatedText.includes("Can't load full results") ?
                    translatedText.split("Can't load full results")[0] :
                    translatedText.split("Can't load alternatives")[0]

                return parsedTranslatedTxt
            }
        }))

        await browser.close()
        return parsedTranslatedTxt
    }
}