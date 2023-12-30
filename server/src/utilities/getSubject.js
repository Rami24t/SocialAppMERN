export default function getSubject(template) {
  switch (template) {
    case "welcome":
      return "Welcome to Social App 👍 Please verify your email address ✔";
    case "forgotpass":
      return "Social App password reset 🗝️";
    default:
      "";
  }
}
