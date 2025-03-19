import axios from "axios";
import { EntryEntity } from "./EntryEntity";

export class EntriesAPI {
  static baseUrl = "http://10.0.0.8:3000/entries";

  static async getEntries(): Promise<EntryEntity[]> {
    const response = await axios.get<EntryEntity[]>(this.baseUrl);

    return response.data;
  }

  static async createEntry(entry: EntryEntity): Promise<EntryEntity> {
    console.log("calling " + EntriesAPI.baseUrl);

    const response = await fetch(EntriesAPI.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });
    const data = await response.json();
    return data;
  }

  static async updateEntry(entry: EntryEntity): Promise<EntryEntity> {
    console.log("calling " + EntriesAPI.baseUrl);

    const response = await fetch(`${EntriesAPI.baseUrl}/${entry.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });
    const data = await response.json();
    return data;
  }

  static async deleteEntry(id: number): Promise<number> {
    console.log("calling " + EntriesAPI.baseUrl);

    const response = await fetch(`${EntriesAPI.baseUrl}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  }
}
