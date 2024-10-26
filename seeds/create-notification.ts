import { createNotification } from "@/actions/notifications.actions";

// In a server action:
const main = async () => {
  await createNotification({
    userId: "671c0042b55b9fdc5b0503cb",
    message: "Hello from server!",
  });
};

main().catch((e) => {
  console.log(e);
});
