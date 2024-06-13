import { atom } from "recoil";

export const userAtom = atom<{
  fullname: string;
  email: string;
  phonenumber: string;
}>({
  key: "user",
  default: undefined,
});
