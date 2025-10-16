import Image from 'next/image';

export default function Home() {
    return (
        <main className="container" aria-labelledby="home-heading">
            <h1 id="home-heading">GYM MANAGEMENT</h1>
            <p>Manage members, classes and schedules with simplicity. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
            <figure>
                <Image
                    src="/undraw_athletes-training_koqa.svg"
                    alt="Athletes training"
                    width={640}
                    height={360}
                    priority
                />
                <figcaption className="sr-only">
                    Illustration of athletes training
                </figcaption>
            </figure>
        </main>
    );
}
