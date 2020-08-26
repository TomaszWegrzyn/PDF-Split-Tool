import React from 'react';
import { useSelector } from 'react-redux';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import { selectFile } from './fileSlice';

async function split(fileName: string) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  page.drawText('You can create PDFs!');
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('FILE222.pdf', pdfBytes);
}

export default function File() {
  const fileName = useSelector(selectFile);
  return (
    <div>
      {fileName}
      <button onClick={() => split(fileName)} type="button">
        split file
      </button>
    </div>
  )
}

