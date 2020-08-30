import React from 'react';
import { useSelector } from 'react-redux';
import { PDFDocument, PDFPage } from 'pdf-lib';
import fs from 'fs';
import { selectFile } from './fileSlice';

function insertBeforeLastOccurrence(
  strToSearch: string,
  strToFind: string,
  strToInsert: string
): string {
  const n = strToSearch.lastIndexOf(strToFind);
  if (n < 0) return strToSearch;
  return strToSearch.substring(0, n) + strToInsert + strToSearch.substring(n);
}

async function split(fileName: string) {
  const file = fs.readFileSync(fileName);
  const pdfDoc = await PDFDocument.load(file);

  pdfDoc.getPages().forEach(async (_page: PDFPage, index: number) => {
    const newPDF = await PDFDocument.create();
    const [copiedPage] = await newPDF.copyPages(pdfDoc, [index]);
    newPDF.addPage(copiedPage);
    const pdfBytes = await newPDF.save();
    const newName = insertBeforeLastOccurrence(
      fileName,
      '.pdf',
      ` - page ${index + 1}`
    );
    fs.writeFileSync(newName, pdfBytes);
  });
}

function renderSplitButton(fileName: string): React.ReactNode {
  if (!fileName) {
    return null;
  }
  return (
    <button onClick={() => split(fileName)} type="button">
      split file
    </button>
  );
}

export default function File(): React.ReactNode {
  const fileName: string = useSelector(selectFile);
  const splitButton = renderSplitButton(fileName);
  return (
    <div>
      {fileName}
      {splitButton}
    </div>
  );
}
