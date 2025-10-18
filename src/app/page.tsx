
import Image from 'next/image';

export default async function HomePage() {
    return (
        <main className='grid center' role="main" aria-label="Página inicial">
            <Image
                src="/undraw_athletes-training_koqa.svg"
                alt="Atletas treinando na academia"
                width={500}
                height={500}
                aria-hidden="false"
            />
        </main>
    );
}
