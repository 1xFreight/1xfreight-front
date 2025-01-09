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
      .map((name) => name[0].toUpperCase())
      .slice(0, 3);
  };

  if (logo) {
    return (
      <div className={"avatar"}>
        <div className={"avatar-img-wrapper"}>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/file-system/image/${logo}`}
            alt={"logo"}
            width={150}
            height={150}
          />
        </div>
      </div>
    );
  }

  return <div className={"avatar"}>{formatUsername()}</div>;
}
