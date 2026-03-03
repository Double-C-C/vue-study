import { defineStore } from "pinia";

interface userInfoType {
  username: string;
  email: string;
  id: number;
  first_name: string;
  last_name: string;
  access: Array<string>;
}

interface userInfoStoreState {
  userInfo: userInfoType;
}

export const useUserInfoStore = defineStore("userInfo", {
  state: (): userInfoStoreState => {
    return {
      userInfo: {
        username: "",
        email: "",
        id: 0,
        first_name: "",
        last_name: "",
        access: ["read"],
      },
    };
  },
  actions: {
    SET_USERINFO(val: userInfoType) {
      Object.assign(this.userInfo, val);
    },
  },
  persist: true,
});
