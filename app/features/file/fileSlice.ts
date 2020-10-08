import { PDFDocument, PDFPage } from 'pdf-lib';
import fs from 'fs';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

interface State {
  name: string;
  splitting: boolean;
}

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    name: '',
    splitting: false,
  },
  reducers: {
    changeFile: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.splitting = false;
      return state;
    },

    changeSplitting: (state, action: PayloadAction<boolean>) => {
      state.splitting = action.payload;
      return state;
    },
  },
});

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

export const { changeFile, changeSplitting } = fileSlice.actions;
export const splitFile = createAsyncThunk<
  void,
  void,
  { state: { file: State } }
>('file/split', async (_unused, { getState, dispatch }) => {
  const state = getState();
  dispatch(changeSplitting(true));
  await split(state.file.name);
  dispatch(changeSplitting(false));
});

export const selectFileName = (state: RootState) => state.file.name;
export const selectSplitting = (state: RootState) => state.file.splitting;
export default fileSlice.reducer;
