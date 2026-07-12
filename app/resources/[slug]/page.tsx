import type { Metadata } from "next"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { resources } from "@/lib/data"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { AnimatedGrid } from "@/components/animated-grid"
import { FloatingElements } from "@/components/floating-elements"
import { CyberCard } from "@/components/cyber-card"
import { HologramCard } from "@/components/hologram-card"

import { ResourceRedirectClient } from "./redirect-client"

import {
  ArrowLeft,
  ArrowUp,
  FileText,
  ExternalLink,
  BookOpen,
} from "lucide-react"

export function generateStaticParams() {
  return resources.map((resource) => ({
    slug: resource.slug,
  }))
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const resource = resources.find((item) => item.slug === slug)

  if (!resource) {
    return {
      title: "Resource not found | WeDist",
    }
  }


  const title = resource.article?.heading ?? resource.title
  const description = resource.article?.byline ?? resource.description


  return {
    title: `${title} | WeDist Resources`,
    description,
    keywords: resource.tags,

    openGraph: {
      title,
      description,
      type: resource.article
        ? "article"
        : "website",
    },
  }
}



const markdownComponents = {
  p: (props: React.ComponentProps<"p">) => (
    <p
      className="
      text-base
      md:text-lg
      leading-relaxed
      text-[#cfd0da]
      text-pretty
      "
      {...props}
    />
  ),


  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="
      text-2xl
      md:text-3xl
      font-semibold
      text-[#f0f0f5]
      mt-8
      mb-3
      "
      {...props}
    />
  ),


  h3: (props: React.ComponentProps<"h3">) => (
    <h3
      className="
      text-xl
      md:text-2xl
      font-semibold
      text-[#f0f0f5]
      mt-6
      "
      {...props}
    />
  ),


  strong: (props: React.ComponentProps<"strong">) => (
    <strong
      className="
      font-semibold
      text-[#f0f0f5]
      "
      {...props}
    />
  ),


  em: (props: React.ComponentProps<"em">) => (
    <em
      className="
      italic
      text-[#e6e6ee]
      "
      {...props}
    />
  ),


  ul: (props: React.ComponentProps<"ul">) => (
    <ul
      className="
      list-disc
      pl-6
      space-y-3
      text-[#cfd0da]
      text-base
      md:text-lg
      "
      {...props}
    />
  ),


  ol: (props: React.ComponentProps<"ol">) => (
    <ol
      className="
      list-decimal
      pl-6
      space-y-3
      text-[#cfd0da]
      text-base
      md:text-lg
      "
      {...props}
    />
  ),


  li: (props: React.ComponentProps<"li">) => (
    <li
      className="
      leading-relaxed
      text-pretty
      "
      {...props}
    />
  ),


  a: (props: React.ComponentProps<"a">) => (
    <a
      className="
      text-[#f5b800]
      underline
      underline-offset-4
      hover:text-[#c49400]
      "
      {...props}
    />
  ),
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const resource = resources.find((item) => item.slug === slug)

  if (!resource) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] text-[#f0f0f5]">
        <div className="max-w-md rounded-xl border border-[#2a2a36] bg-[#121218] p-8 text-center">
          <h1 className="mb-3 text-2xl font-bold">Resource not found</h1>
          <p className="mb-5 text-[#888899]">The requested resource could not be located.</p>
          <a href="/resources" className="inline-flex rounded-lg bg-[#f5b800] px-5 py-3 font-semibold text-[#0a0a0f]">
            Back to Resources
          </a>
        </div>
      </div>
    )
  }



  if (resource.link && resource.externalUrl) {
    return <ResourceRedirectClient title={resource.title} externalUrl={resource.externalUrl} />
  }
    /*
   * ARTICLE RESOURCE
   */
  if (resource.article) {
    const { heading, byline, author, content } = resource.article

    return (
      <div id="top" className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5] page-transition">
        <Header />
        <main className="pt-20 md:pt-28 lg:pt-32">


          {/* HERO BACKGROUND */}

          <section className="relative overflow-hidden cyber-grid py-10 md:py-16">


            <AnimatedGrid />

            <CyberParticles count={20} />

            <FloatingElements count={4} />


            <div className="absolute inset-0">

              <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-[#f5b800]/10 blur-3xl animate-float" />

              <div className="absolute bottom-1/4 right-1/4 h-[250px] w-[250px] rounded-full bg-[#f5b800]/5 blur-3xl animate-float-slow" />

            </div>



            <div className="
            max-w-[1500px]
            mx-auto
            px-4
            md:px-8
            relative
            z-10
            ">


              <ScrollReveal animation="up">


                <a href="/resources" className="mb-8 inline-flex items-center gap-2 rounded-lg border border-[#f5b800]/30 bg-[#121218]/60 px-4 py-2 text-sm text-[#f0f0f5] transition-all hover:border-[#f5b800]">

                  <ArrowLeft className="h-4 w-4 text-[#f5b800]" />

                  Back to Resources

                </a>



                <div className="max-w-5xl">


                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f5b800]/30 bg-[#f5b800]/10 px-3 py-1.5">

                    <BookOpen className="h-4 w-4 text-[#f5b800]" />

                    <span className="text-xs uppercase tracking-[0.2em] text-[#f5b800] md:text-sm">

                      {resource.category}

                    </span>


                  </div>




                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 text-[#f0f0f5]">
                    {heading}
                  </h1>



                  <p className="max-w-4xl text-lg leading-relaxed text-[#888899] md:text-xl">

                    {byline}

                  </p>



                  <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#888899]">
                    <span>By {author}</span>
                  </div>



                </div>


              </ScrollReveal>


            </div>


          </section>




          {/* ARTICLE CONTENT */}


          <section className="relative overflow-hidden bg-[#050508] py-10 md:py-16">


            <div className="absolute inset-0 hex-pattern opacity-20" />


            <div className="
            max-w-[1500px]
            mx-auto
            px-4
            md:px-8
            relative
            z-10
            ">


              <ScrollReveal animation="up">


                <article className="rounded-xl border border-[#2a2a36] bg-[#121218]/90 p-5 md:p-10 lg:p-14">
                  <div className="mx-auto flex max-w-5xl flex-col gap-6">
                    <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                      {content}
                    </Markdown>

                    <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#2a2a36] pt-8">
                      <span className="text-sm uppercase tracking-[0.2em] text-[#888899]">
                        Tags
                      </span>
                      {resource.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#2a2a36] bg-[#1a1a24] px-3 py-1 text-sm text-[#f5b800]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>


              </ScrollReveal>


            </div>


          </section>


          <a
            href="#top"
            aria-label="Back to top"
            className="fixed bottom-8 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-[#f5b800]/40 bg-[#f5b800] text-[#0a0a0f] shadow-[0_0_30px_rgba(245,184,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#ffcc33]"
          >
            <ArrowUp className="h-7 w-7" />
          </a>
        </main>

        <Footer />


      </div>

    )

  }



  /*
   * NORMAL RESOURCE PAGE
   */


  const size = resource.size



  return (

    <div className="
    min-h-screen
    bg-[#0a0a0f]
    text-[#f0f0f5]
    page-transition
    ">


      <Header />


      <main className="
      pt-24
      md:pt-32
      relative
      cyber-grid
      min-h-screen
      flex
      items-center
      ">


        <CyberParticles count={20} />

        <AnimatedGrid />


        <div className="
        max-w-6xl
        w-full
        mx-auto
        px-4
        relative
        z-10
        ">


          <ScrollReveal animation="scale">


            <CyberCard tiltEffect>


              <HologramCard>


                <div className="
                bg-[#121218]/90
                border
                border-[#2a2a36]
                rounded-xl
                p-6
                md:p-12
                ">


                  <a
                    href="/resources"
                    className="
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    text-[#888899]
                    hover:text-[#f5b800]
                    mb-8
                    "
                  >

                    <ArrowLeft
                      className="w-4 h-4"
                    />

                    Back to Resources

                  </a>



                  <FileText
                    className="
                    w-12
                    h-12
                    text-[#f5b800]
                    mb-6
                    "
                  />



                  <h1 className="
                  text-3xl
                  md:text-5xl
                  font-bold
                  mb-4
                  ">

                    {resource.title}

                  </h1>



                  <p className="
                  text-[#888899]
                  mb-6
                  ">

                    {resource.category}

                  </p>



                  <p className="
                  text-lg
                  text-[#cfd0da]
                  leading-relaxed
                  mb-8
                  ">

                    {resource.description}

                  </p>



                  {resource.type && (

                    <div className="
                    text-sm
                    uppercase
                    tracking-[0.18em]
                    text-[#f5b800]
                    mb-4
                    ">

                      {resource.type}

                    </div>

                  )}



                  {size && (

                    <div className="
                    text-sm
                    text-[#888899]
                    mb-6
                    ">

                      Size: {size}

                    </div>

                  )}




                  <div className="
                  flex
                  flex-wrap
                  gap-3
                  ">


                    <a
                      href={
                        resource.externalUrl ??
                        "/resources"
                      }
                      target={
                        resource.externalUrl
                        ? "_blank"
                        : undefined
                      }
                      rel={
                        resource.externalUrl
                        ? "noopener noreferrer"
                        : undefined
                      }
                      className="
                      inline-flex
                      items-center
                      gap-2
                      px-6
                      py-3
                      rounded-lg
                      bg-[#f5b800]
                      text-[#0a0a0f]
                      font-semibold
                      hover:bg-[#c49400]
                      "
                    >

                      {
                        resource.externalUrl
                        ? "Open Resource"
                        : "Back to Resources"
                      }


                      {
                        resource.externalUrl &&
                        <ExternalLink
                          className="w-4 h-4"
                        />
                      }


                    </a>


                  </div>


                </div>


              </HologramCard>


            </CyberCard>


          </ScrollReveal>


        </div>


      </main>


      <Footer />


    </div>

  )

}