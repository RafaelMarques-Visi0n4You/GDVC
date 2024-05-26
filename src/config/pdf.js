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
  const url = `${baseUrl}/detalhe/detalhevisita/${id}`;

  try {
    
    const response = await axios.get(url);
    const html = response.data;

    
    const options = { format: 'A4', orientation: 'portrait', border: '10mm' };

    
    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao gerar PDF' });
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=details-${id}.pdf`);
      res.send(buffer);
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter o HTML da página' });
  }
});


