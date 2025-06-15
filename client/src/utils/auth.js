import API from "./api";

export async function isLoggedIn() {
  try {
    const res = await API.get("/users/me");
    return res.data;
  } catch {
    return null;
  }
}
