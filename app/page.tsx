import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { PartnersSection } from "@/components/partners-section"
import { EventsSection } from "@/components/events-section"
import { ProjectsSection } from "@/components/projects-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Header />
      <main>
        <HeroSection />
        <PartnersSection />
        <EventsSection />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  )
}
