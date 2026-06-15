import styles from "./Video.module.css"
import { JSONData } from '@/utils/L2A/traduction';
import { t } from '@/utils/L2A/traduction';


export default function Video({page}: {page: JSONData}) {
    // const waitingText = JSON.parse(JSON.stringify(t(page, "waitingText")));
    const mainText = JSON.parse(JSON.stringify(t(page, "mainText")));

    return (
        <section className={styles.videoContainer}>
            <iframe width="420" height="315"
                src="https://www.youtube.com/embed/yU3wTvcQrVg?autoplay=1" allowFullScreen>
            </iframe>
            <p>{mainText}</p>
            {/* <ContainerBarToShow>
                <h2 className={styles.waitingText}>{waitingText}</h2>
            </ContainerBarToShow> */}
        </section>
    );
    }