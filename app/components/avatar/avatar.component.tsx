import "./styles.css";

export default function AvatarComponent({ username }: { username: string }) {
  const formatUsername = () => {
    return username.split(" ").map((name) => name[0]);
  };

  return <div className={"avatar"}>{formatUsername()}</div>;
}
