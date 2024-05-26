const express = require('express');
const pdf = require('html-pdf');
const axios = require('axios');
const app = express();


app.get('/generate-pdf', async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing ID parameter' });
  }

  
  const baseUrl = 'http://localhost:8081'; 
  const url = `${baseUrl}/detalhe/detalhepdf/${id}`;
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true
    });
    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: 'networkidle2', // Aguarda até que a rede esteja ociosa
    });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=details-${id}.pdf`);
    res.send(pdf);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    res.status(500).json({ error: 'Erro ao gerar PDF' });
  }
});


