'use client';

import Image from 'next/image';
import styles from './Home.module.css';

export default function Home() {
    return (
        <main className={`container ${styles.main}`}>
            <figure>
                <Image
                    src="/undraw_athletes-training_koqa.svg"
                    alt="Pessoas praticando exercícios"
                    width={640}
                    height={360}
                    priority
                />
            </figure>
        </main>
    );
}
