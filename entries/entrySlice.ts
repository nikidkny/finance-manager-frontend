import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EntryEntity } from "./EntryEntity";
import { EntriesAPI } from "./EntriesAPI";

export const fetchEntries = createAsyncThunk("entries/fetchAll", async (thunkAPI) => {
  return await EntriesAPI.getEntries();
});

export const createEntry = createAsyncThunk(
  "entries/create",
  async (entry: EntryEntity, thunkAPI) => {
    return await EntriesAPI.createEntry(entry);
  }
);

export const updateEntry = createAsyncThunk(
  "entries/update",
  async (entry: EntryEntity, thunkAPI) => {
    return await EntriesAPI.updateEntry(entry);
  }
);

export const deleteEntry = createAsyncThunk("entries/delete", async (id: number, thunkAPI) => {
  return await EntriesAPI.deleteEntry(id);
});

interface EntryState {
  entries: EntryEntity[];
  errormessage: string;
}

const initialState: EntryState = {
  entries: [],
  errormessage: "",
};

const entrySlice = createSlice({
  name: "entries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      console.log("entry payload", action.payload);
      state.entries = action.payload;
    });
    builder.addCase(createEntry.fulfilled, (state, action) => {
      state.entries.push(action.payload);
    });
    builder.addCase(updateEntry.fulfilled, (state, action) => {
      const index = state.entries.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) state.entries[index] = action.payload;
    });
    builder.addCase(deleteEntry.fulfilled, (state, action) => {
      state.entries = state.entries.filter((e) => e.id !== action.payload);
    });
  },
});

export default entrySlice.reducer;
