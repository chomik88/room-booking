import { defineStore } from "pinia";
import { getDatabase, ref, push, remove, get } from "firebase/database";
import type Dictionary from "../../types/Dictionary";
import type DictionaryItem from "../../types/DictionaryItem";

export const useDictionariesStore = defineStore("dictionaries", {
  state: () => ({
    dictionaries: ([] as Dictionary[]) || null,
  }),
  getters: {
    getDictionaries({ dictionaries }) {
      return dictionaries;
    },
    getDictionaryByName({ dictionaries }) {
      return (name: string) =>
        dictionaries.find((dictionary) => dictionary.name === name);
    },
  },
  actions: {
    async fetchDictionaries() {
      const db = getDatabase();
      const dbRef = ref(db, "/dictionaries/");
      const response = await get(dbRef);
      const responseData = response.val();
      const dictionariesArray = Object.keys(responseData).map((key) => ({
        name: key,
        dictionaryItems: Object.keys(responseData[key]).map(
          (dictionaryItemKey) => ({
            id: dictionaryItemKey,
            ...responseData[key][dictionaryItemKey],
          })
        ),
      }));
      this.dictionaries = dictionariesArray;
    },
    async addDictionaryItems(data: DictionaryItem[], name: string) {
      const db = getDatabase();
      await Promise.all(
        data.map(async (item) => {
          try {
            const response = await push(ref(db, `/dictionaries/${name}`), {
              ...item,
            });
            if (response) {
              item.id = response.key;
            }
          } catch (error) {
            if (error instanceof Error) {
              const err = new Error(error.message || "Failed to send request.");
              throw err;
            }
          }
        })
      );

      const dictionary = this.getDictionaryByName(name);
      if (dictionary) {
        dictionary.dictionaryItems = [...dictionary.dictionaryItems, ...data];
      } else {
        this.dictionaries.push({
          name,
          dictionaryItems: {
            ...data,
          },
        });
      }
    },
    async removeDictionaryItem(item: string, name: string) {
      const db = getDatabase();
      await remove(ref(db, `/dictionaries/${name}/${item}`));
      await this.fetchDictionaries();
    },
  },
});
