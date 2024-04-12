const fs = require('fs');
const path = require('path');
const { pdfToPng } = require('pdf-to-png-converter');

const srcDir = path.join(__dirname, '../src/images');
const outputDir = path.join(__dirname, '../output/images');

// Step 3: Get the list of PDF files in the source directory
const pdfFiles = fs.readdirSync(srcDir).filter(file => path.extname(file) === '.pdf');

// Step 4: Convert each PDF file to PNG
pdfFiles.forEach(async pdfFile => {
    const pdfPath = path.join(srcDir, pdfFile);
    const pages = await pdfToPng(pdfPath, {
        disableFontFace: false,
        useSystemFonts: true,
        enableXfa: false,
        viewportScale: 10.0,
        outputFolder: outputDir,
        strictPagesToProcess: false,
        verbosityLevel: 0,
    });
    const pngFileName = path.basename(pdfFile, '.pdf') + '.png';
    fs.cpSync(path.join(outputDir, pages[0].name), path.join(outputDir, pngFileName));
    fs.rmSync(path.join(outputDir, pages[0].name));

    // Step 5: Replace <embed src=...> with <img src=...> in paper.html
    const paperHtmlPath = path.join(__dirname, '../output/paper.html');
    let paperHtml = fs.readFileSync(paperHtmlPath, 'utf-8');
    paperHtml = paperHtml.replace(`<embed src="images/${path.basename(pdfFile)}" />`, `<img src="images/${pngFileName}">`);
    fs.writeFileSync(paperHtmlPath, paperHtml);
});

// Step 6: Create a JSON file listing all the converted images
const imageList = pdfFiles.map(pdfFile => path.basename(pdfFile, '.pdf') + '.png');
const jsonPath = path.join(outputDir, 'imageList.json');
fs.writeFileSync(jsonPath, JSON.stringify(imageList));

