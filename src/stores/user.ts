import { defineStore } from "pinia";
import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type UserCredential,
  signOut,
} from "firebase/auth";
let timer: any;
export const useUserStore = defineStore("user", {
  state: () => ({
    loggedIn: false,
    user: {} as UserCredential | null,
    role: "user",
    expiresIn: 0,
  }),
  getters: {
    isLoggedIn({ loggedIn }) {
      return loggedIn;
    },
    isAdmin({ role }) {
      return role === "admin";
    },
  },
  actions: {
    async createUser(data: { email: string; password: string }) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        this.loggedIn = true;
        this.user = response;
        await this.setAutoLogOutTimer();
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : "Something went wrong";
        throw new Error(errorMsg);
      }
    },

    async signInUser(data: { email: string; password: string }) {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        this.loggedIn = true;
        this.user = response;
        await this.setAutoLogOutTimer();
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : "Something went wrong";
        throw new Error(errorMsg);
      }
    },

    async setAutoLogOutTimer() {
      const minutesForAuth = 15;
      this.expiresIn = new Date().getTime() + minutesForAuth * 60 * 1000;
      const expiresIn = this.expiresIn - new Date().getTime();

      if (expiresIn) {
        timer = setTimeout(() => {
          this.logOutUser();
        }, expiresIn);
      }
    },

    async logOutUser() {
      await signOut(auth);
      this.loggedIn = false;
      this.user = null;
      clearTimeout(timer);
    },
  },
});
