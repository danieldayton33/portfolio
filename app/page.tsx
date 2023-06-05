import Header from '@components/Header';
import About from '@components/About';
import Projects from '@components/Projects';

export default function Home() {
    return (
        <main>
            <section className="bg-tertiary shadow-b-2xl px-4 lg:px-0">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <Header />
                        <About />
                    </div>
                </div>
            </section>
            <section className="bg-secondary px-4 lg:px-0">
                <div className="container mx-auto" id="projects">
                    <Projects />
                </div>
            </section>
        </main>
    );
}
