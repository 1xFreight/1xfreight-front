import "./styles.css";
import Image from "next/image";

export default function AvatarComponent({
  username,
  logo,
}: {
  username: string;
  logo?: string;
}) {
  const formatUsername = () => {
    return username
      ?.split(" ")
      .map((name) => name[0])
      .slice(0, 3);
  };

  if (logo) {
    return (
      <div className={"avatar"}>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/file-system/image/${logo}`}
          alt={"logo"}
          width={56}
          height={48}
          quality={95}
        />
      </div>
    );
  }

  return <div className={"avatar"}>{formatUsername()}</div>;
}
