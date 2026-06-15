import { Video } from "./CovidSection"
import styles from "./VideoComponent.module.css"
import Image from "next/image";
import Link from "next/link";

function VideoComponent({ video, clickTitle } : { video: Video, clickTitle: string}) {
  const { image, title, by, link } = video; 
  return (
    <div className={styles.videoBox}>
      <Image src={image} alt={title} width={230} height={130} />
      <h3>{title}</h3>
      <p>{by}</p>
      <Link target="_blank" href={link}>{clickTitle}</Link>
    </div>
  )
}

export default VideoComponent