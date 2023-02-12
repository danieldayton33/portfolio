import Header from '@components/Header';
import About from '@components/About';
import Projects from '@components/Projects';
import Contact from '@components/Contact';
import { ubuntuNormal } from '@/utils/fonts';
import classNames from 'classnames';

export default function Home() {
    return (
        <main>
            <div className="bg-tertiary shadow-b-2xl">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <Header />
                        <About />
                    </div>
                </div>
            </div>
            <section className="bg-secondary">
                <div className="container mx-auto" id="projects">
                    <Projects />
                </div>
            </section>
            <section className="bg-quaternary">
                <div className="container mx-auto">
                    <Contact />
                </div>
            </section>
        </main>
    );
}
